import { useEffect, useState } from "react";
import Header from "./Header";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import requests from "../api/request";
import { useCartContext } from "../context/CartContext";
import { Cart } from "../model/Icart";

function App() {  

  const { setCart } = useCartContext();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    requests.Cart.get()
      .then((cart: Cart | null) => setCart(cart))
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if(loading) return <CircularProgress />;

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App
