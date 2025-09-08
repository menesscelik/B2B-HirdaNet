import { AddShoppingCart } from "@mui/icons-material";
import { IProduct } from "../../model/IProduct";
import { Button, Card, CardActions, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router";
import { LoadingButton } from "@mui/lab";
import { currenyTRY } from "../../utils/formatCurrency";
import { addItemToCart } from "../Cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import React from "react";

interface Props {
    product: IProduct
}

export default function Product({product}: Props) {

  const { status } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = React.useState<number>(1);

    return (
     <Card>
      <CardMedia sx={{ height: 160, backgroundSize: "contain" }} image={resolveImageUrl(product.imageUrl)} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2" color="text.secondary">
          {product.name}
        </Typography>
        <Typography variant="body2" color="secondary">
          { currenyTRY.format(product.price) }
        </Typography>
      </CardContent>
      <CardActions>
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
          sx={{ width: 90 }}
        />
        <LoadingButton  
          size="small"
          variant="outlined"
          loadingPosition="start"
          startIcon={<AddShoppingCart/>} 
          loading={ status === "pendingAddItem" + product.id } 
          onClick={() => dispatch(addItemToCart({productId: product.id, quantity}))}>Sepete Ekle</LoadingButton>

        <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="small" startIcon={<SearchIcon />} color="primary">View</Button>
      </CardActions>
     </Card>
    );
  }
  