import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
  Avatar
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { IProduct } from '../../model/IProduct';
import { useAppDispatch } from '../../store/store';
import { createProduct, updateProduct, deleteProduct } from '../Catalog/catalogSlice';
import requests from '../../api/request';
import { resolveImageUrl } from '../../utils/resolveImageUrl';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  isActive: boolean;
}

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

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [adminProducts, setAdminProducts] = useState<IProduct[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedUserForOrders, setSelectedUserForOrders] = useState<AdminUser | null>(null);
  const [orders, setOrders] = useState<AdminOrder[] | null>(null);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: '',
    isActive: true
  });
  

  useEffect(() => {
    const load = async () => {
      const list = await requests.Catalog.listAllForAdmin();
      setAdminProducts(list);
      const u = await requests.Admin.users();
      setUsers(u);
    };
    load();
  }, []);

  const refreshAdminProducts = async () => {
    const list = await requests.Catalog.listAllForAdmin();
    setAdminProducts(list);
  };

  const refreshUsers = async () => {
    const u = await requests.Admin.users();
    setUsers(u);
  };

  const handleOpenDialog = (product?: IProduct) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        stock: product.stock || 0,
        imageUrl: product.imageUrl || '',
        isActive: product.isActive || true
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        imageUrl: '',
        isActive: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
  };

  // Dosya yükleme kaldırıldı; yalnızca URL ile çalışma

  const handleSubmit = async () => {
    try {
      if (editingProduct) {
        await dispatch(updateProduct({ 
          id: editingProduct.id, 
          product: {
            ...editingProduct,
            ...formData
          }
        })).unwrap();
        await refreshAdminProducts();
      } else {
        await dispatch(createProduct(formData)).unwrap();
        await refreshAdminProducts();
      }
      handleCloseDialog();
    } catch (error) {
      console.error('Ürün kaydedilirken hata:', error);
    }
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        await dispatch(deleteProduct(productId)).unwrap();
        await refreshAdminProducts();
      } catch (error) {
        console.error('Ürün silinirken hata:', error);
      }
    }
  };

  const handleStatusChange = async (productId: number, isActive: boolean) => {
    try {
      const product = adminProducts.find(p => p.id === productId);
      if (product) {
        await dispatch(updateProduct({ 
          id: productId, 
          product: {
            ...product,
            isActive: isActive
          }
        })).unwrap();
        await refreshAdminProducts();
      }
    } catch (error) {
      console.error('Ürün durumu güncellenirken hata:', error);
    }
  };

  const handleViewOrders = async (user: AdminUser) => {
    try {
      const data = await requests.Admin.userOrders(user.userName);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Admin Panel - Ürün Yönetimi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Yeni Ürün Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Resim</TableCell>
              <TableCell>Ürün Adı</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell>Fiyat</TableCell>
              <TableCell>Stok</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                  {product.imageUrl && (
                    <Avatar
                      src={resolveImageUrl(product.imageUrl)}
                      alt={product.name}
                      sx={{ width: 50, height: 50 }}
                    />
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>₺{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Switch
                      checked={product.isActive}
                      onChange={(e) => handleStatusChange(product.id, e.target.checked)}
                    />
                    <Typography variant="body2">{product.isActive ? 1 : 0}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Ürün Ekleme/Düzenleme Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Ürün Adı"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Açıklama"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Fiyat"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              fullWidth
              required
            />
            <TextField
              label="Stok"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
              fullWidth
              required
            />
            <TextField
              label="Resim URL (opsiyonel)"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              fullWidth
            />
            {formData.imageUrl && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar
                  src={resolveImageUrl(formData.imageUrl)}
                  alt="Önizleme"
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
            )}
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Aktif"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>İptal</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProduct ? 'Güncelle' : 'Ekle'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPage; 