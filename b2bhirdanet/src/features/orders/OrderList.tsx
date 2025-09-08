import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../model/IOrder";
import requests from "../../api/request";
import { currenyTRY } from "../../utils/formatCurrency";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const orderStatus = [ "Pending", "Approved", "PaymentFailed","Completed"];

function getStatusColors(status: number) {
    switch (status) {
        case 0: return { bg: 'warning.light', bar: 'warning.main' }; // Pending
        case 1: return { bg: 'info.light', bar: 'info.main' }; // Approved
        case 2: return { bg: 'error.light', bar: 'error.main' }; // PaymentFailed
        case 3: return { bg: 'success.light', bar: 'success.main' }; // Completed
        default: return { bg: 'grey.100', bar: 'grey.400' };
    }
}

export default function OrderList()
{
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loading,setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const [open, setOpen] = useState(false);

    const subTotal = selectedOrder?.orderItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    const total = subTotal + tax;

    function handleDialogOpen(order: Order) {
        setOpen(true);
        setSelectedOrder(order);
    }

    function handleDialogClose() {
        setOpen(false);
        setSelectedOrder(null);
    }


    useEffect(() => {
        setLoading(true);

        requests.Order.getOrders()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, []);

    if(loading) return <CircularProgress />

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Order Id</TableCell>
                        <TableCell>Order Status</TableCell>
                        <TableCell>Order Date</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders?.map((order) => {
                        const colors = getStatusColors(order.orderStatus);
                        return (
                        <TableRow key={order.id} sx={{ backgroundColor: colors.bg }}>
                            <TableCell component="th" scope="row">{order.id}</TableCell>
                            <TableCell component="th" scope="row">{orderStatus[order.orderStatus]}</TableCell>
                            <TableCell component="th" scope="row">{new Date(order.orderDate).toLocaleString()}</TableCell>
                            <TableCell component="th" scope="row">{currenyTRY.format(order.subTotal)}</TableCell>
                            <TableCell component="th" scope="row" sx={{width: 100}}>
                                <Button onClick={() => handleDialogOpen(order)} size="small" variant="contained" endIcon={<ArrowRightIcon />}>Details</Button>
                            </TableCell>
                        </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
        

        <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth="lg"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle>
                Sipariş No: #{selectedOrder?.id}
            </DialogTitle>
            <IconButton onClick={handleDialogClose} sx={{ position: "absolute", right: 8,top: 8 }}>
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                    <Paper sx={{p:3,mb:3, borderLeft: '6px solid', borderLeftColor: getStatusColors(selectedOrder?.orderStatus ?? -1).bar, backgroundColor: getStatusColors(selectedOrder?.orderStatus ?? -1).bg }}>
                        <Typography variant="subtitle2" gutterBottom>Teslimat Bilgileri</Typography>
                        <Typography gutterBottom>{selectedOrder?.firstName} {selectedOrder?.lastName}</Typography>
                        <Typography gutterBottom>{selectedOrder?.phone}</Typography>
                        <Typography gutterBottom>{selectedOrder?.addresLine} / {selectedOrder?.city}</Typography>
                    </Paper>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead id="alert-dialog-title">
                                <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right">Fiyat</TableCell>
                                <TableCell align="right">Adet</TableCell>
                                <TableCell align="right">Toplam</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedOrder?.orderItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <img src={`http://localhost:5105/images/${item.productImage}`} style={{height: 60}}/>
                                        </TableCell>
                                        <TableCell align="right">{item.productName}</TableCell>
                                        <TableCell align="right">{ currenyTRY.format(item.price)}</TableCell>
                                        <TableCell align="right">{ item.quantity}</TableCell>
                                        <TableCell align="right">{currenyTRY.format(item.price * item.quantity)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Ara Toplam</TableCell>
                                    <TableCell align="right" colSpan={4}>{currenyTRY.format(subTotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Vergi</TableCell>
                                    <TableCell align="right" colSpan={4}>{currenyTRY.format(tax)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Toplam</TableCell>
                                    <TableCell align="right" colSpan={4}>{currenyTRY.format(total)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Kapat</Button>
            </DialogActions>
        </Dialog>

        </>
                    

    );
}