import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import requests from '../../api/request';

interface AdminUser {
  id: string;
  name: string;
  userName: string;
  email: string;
}

interface AdminOrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}

interface AdminOrder {
  id: number;
  orderDate: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  addresLine?: string;
  customerId?: string;
  orderStatus: number;
  subTotal: number;
  deliveryFree: number;
  orderItems: AdminOrderItem[];
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedUserForOrders, setSelectedUserForOrders] = useState<AdminUser | null>(null);
  const [orders, setOrders] = useState<AdminOrder[] | null>(null);
  const [ordersOpen, setOrdersOpen] = useState(false);

  const refreshUsers = async () => {
    const u = await requests.Admin.users();
    setUsers(u);
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const handleViewOrders = async (user: AdminUser) => {
    try {
      const data = await requests.Admin.userOrders(user.userName);
      console.log('Sipariş verisi:', data);
      setSelectedUserForOrders(user);
      setOrders(data);
      setOrdersOpen(true);
    } catch (e) {
      console.error('Siparişler alınırken hata:', e);
    }
  };

  const handleCloseOrders = () => {
    setOrdersOpen(false);
    setSelectedUserForOrders(null);
    setOrders(null);
  };

  const handleLockToggle = async (user: AdminUser, lock: boolean) => {
    try {
      await requests.Admin.updateUserStatus(user.userName, lock);
      await refreshUsers();
    } catch (e) {
      console.error('Kullanıcı durumu güncellenirken hata:', e);
    }
  };

  const handleDeleteUser = async (user: AdminUser) => {
    if (!window.confirm(`${user.userName} kullanıcısını silmek istediğinize emin misiniz?`)) return;
    try {
      await requests.Admin.deleteUser(user.userName);
      await refreshUsers();
    } catch (e) {
      console.error('Kullanıcı silinirken hata:', e);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>Admin Panel - Kullanıcı Yönetimi</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ad Soyad</TableCell>
              <TableCell>Kullanıcı Adı</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u => (
              <TableRow key={u.id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.userName}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Button size="small" variant="outlined" onClick={() => handleViewOrders(u)}>Siparişler</Button>
                  <Button size="small" variant="outlined" sx={{ ml: 1 }} onClick={() => handleLockToggle(u, true)}>Kilitle</Button>
                  <Button size="small" variant="outlined" sx={{ ml: 1 }} onClick={() => handleLockToggle(u, false)}>Aç</Button>
                  <Button size="small" color="error" variant="outlined" sx={{ ml: 1 }} onClick={() => handleDeleteUser(u)}>Sil</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={ordersOpen} onClose={handleCloseOrders} maxWidth="md" fullWidth>
        <DialogTitle>{selectedUserForOrders ? `${selectedUserForOrders.userName} - Siparişleri` : 'Siparişler'}</DialogTitle>
        <DialogContent>
          {orders && orders.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {orders.map(o => (
                <Paper key={o.id} sx={{ p: 2, 
                  borderLeft: '6px solid',
                  borderLeftColor: (() => {
                    switch (o.orderStatus) {
                      case 0: return 'warning.main'; // Pending
                      case 1: return 'info.main'; // Approved
                      case 2: return 'error.main'; // PaymentFailed
                      case 3: return 'success.main'; // Completed
                      default: return 'grey.400';
                    }
                  })(),
                  backgroundColor: (() => {
                    switch (o.orderStatus) {
                      case 0: return 'warning.light';
                      case 1: return 'info.light';
                      case 2: return 'error.light';
                      case 3: return 'success.light';
                      default: return 'grey.100';
                    }
                  })(),
                }}>
                  <Typography variant="subtitle1">Sipariş #{o.id} - {new Date(o.orderDate).toLocaleString()}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2">Durum: {o.orderStatus}</Typography>
                    <select value={o.orderStatus} onChange={async (e) => {
                      const newStatus = parseInt(e.target.value);
                      try {
                        await requests.Admin.updateOrderStatus(o.id, newStatus);
                        // local state güncelle
                        setOrders(prev => prev ? prev.map(x => x.id === o.id ? { ...x, orderStatus: newStatus } : x) : prev);
                      } catch (err) {
                        console.error('Durum güncellenirken hata', err);
                      }
                    }}>
                      <option value={0}>Pending</option>
                      <option value={1}>Approved</option>
                      <option value={2}>PaymentFailed</option>
                      <option value={3}>Completed</option>
                    </select>
                  </Box>
                  <Table size="small" sx={{ mt: 1 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Ürün</TableCell>
                        <TableCell>Adet</TableCell>
                        <TableCell>Fiyat</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {o.orderItems && o.orderItems.length > 0 ? (
                        o.orderItems.map(oi => (
                          <TableRow key={oi.id}>
                            <TableCell>{oi.productName}</TableCell>
                            <TableCell>{oi.quantity}</TableCell>
                            <TableCell>₺{oi.price}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            <Typography variant="body2" color="text.secondary">
                              Ürün bulunamadı
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              ))}
            </Box>
          ) : (
            <Typography>Bu kullanıcıya ait sipariş bulunamadı.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOrders}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUsersPage;


