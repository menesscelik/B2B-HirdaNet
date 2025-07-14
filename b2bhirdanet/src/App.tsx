import { useState } from "react";

const products = [
  ,
];

function App() {
  return (
    <>
     <Header />
     <ProductList />
    </>
  )
}

function Header() {
  return (
    <h1>Header</h1>
  );
}




function ProductList() {

  const [products, setProducts] = useState([
    { id:1 ,name: "product 1", price: 1000, is_active: true },
    { id:2 ,name: "product 2", price: 2000, is_active: false },
    { id:3 ,name: "product 3", price: 3000, is_active: true },
  ]);
  
  fetch("http://localhost:5105/api/products")
    .then(response => response.json())
    .then(data => setProducts(data))

  function addproduct(){
    setProducts([...products, {id:4 ,name: "product 4", price: 4000, is_active: true}])
}
console.log("render...")
  return (
    <div>
      <h2>ProductList</h2>

      { products.map(p => (
        <Product key={p.id} product={p}/>
      )) }

      <button onClick={addproduct}> Add Product</button>

    </div>
  );
}

function Product(props: any) {
  return (
    <>
      { props.product.is_active ? (
        <div>
          <h3>{ props.product.name }</h3>
          <p> { props.product.price }</p>
        </div>
      ) : <p>ürün satışta değil</p>
      }
    </>
  );
}

export default App
