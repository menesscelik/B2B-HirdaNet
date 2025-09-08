import { CircularProgress, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../model/IProduct";
import requests from "../../api/request";
import NotFound from "../../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { currenyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

export default function ProductDetailsPage() {

    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    const { id } = useParams<{id: string}>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState<number>(1);

    const item = cart?.cartItems.find(i => i.productId == product?.id);

    useEffect(() => {
        id && requests.Catalog.details(parseInt(id))
            .then(data => setProduct(data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    if(loading) return <CircularProgress />

    if(!product) return <NotFound />

    return (
       <Grid container spacing={6}>
            <Grid size={{xl: 3, lg: 4, md: 5, sm: 6, xs: 12}}>
                <img src={resolveImageUrl(product.imageUrl)} style={{width: "100%"}}/>
            </Grid>
            <Grid size={{xl: 9,lg: 8, md: 7, sm: 6, xs: 12}}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb:2}} />
                <Typography variant="h4" color="secondary">{ currenyTRY.format(product.price)  } ₺</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Stock</TableCell>
                                <TableCell>{product.stock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Stack direction="row" spacing={2} sx={{mt: 3}} alignItems="center">
                    <TextField
                        label="Adet"
                        type="number"
                        size="small"
                        value={quantity}
                        inputProps={{ min: 1, max: product.stock }}
                        onChange={(e) => {
                            const val = parseInt(e.target.value || '1');
                            if (Number.isNaN(val)) { setQuantity(1); return; }
                            const clamped = Math.max(1, Math.min(val, product.stock));
                            setQuantity(clamped);
                        }}
                        sx={{ width: 120 }}
                    />
                    <LoadingButton 
                        variant="outlined" 
                        loadingPosition="start"
                        startIcon={<AddShoppingCart />}
                        loading={ status === "pendingAddItem" + product.id } 
                        onClick={() => dispatch(addItemToCart({productId: product.id, quantity}))}>
                        Sepete Ekle
                    </LoadingButton>

                    {
                        item?.quantity! > 0 && (
                            <Typography variant="body2">Sepetinize {item?.quantity} adet eklendi</Typography>
                        )
                    }
                </Stack>
            </Grid>
       </Grid>
    );
}