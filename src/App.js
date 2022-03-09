import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { data } from "./data";
import Card from "./components/Card";
import Checkout from "./components/Checkout";

function App() {
  const [products, setData] = useState(data);
  const [totalSelected, setTotalSelected] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [inCard, setInCard] = useState();
  const [showDiv, setShowDiv] = useState(false);

  const updateTotal = (d) => {
    let totalPrice = 0;
    for (let i of d) {
      if (i.disount) {
        let x = +i.disount.slice(0, i.disount.length - 1);
        console.log(typeof x);
        totalPrice =
          totalPrice + i.count * i.price - (i.count * i.price * x) / 100;
      } else {
        totalPrice = totalPrice + i.count * i.price;
      }
    }
    const totalItems = d.reduce((acc, i) => {
      return i.count + acc;
    }, 0);
    setTotalPrice(totalPrice);
    setTotalSelected(totalItems);
    const productsInCard = products.filter((item) => item.count > 0);
    setInCard(productsInCard);
  };
  const handleAdd = (id) => {
    const foundIndex = products.findIndex((i) => i.id === id);
    const newData = [...products];
    newData[foundIndex]["count"]++;
    setData(newData);
    updateTotal(newData);
  };
  const handleRemove = (idProduct) => {
    const foundIndex = products.findIndex((i) => i.id === idProduct);
    const newData = [...products];
    if (newData[foundIndex]["count"]) {
      newData[foundIndex]["count"]--;
    }
    setData(newData);
    updateTotal(newData);
  };
  const handleDelete = (idProduct) => {
    const foundIndex = products.findIndex((i) => i.id === idProduct);
    const newData = [...products];
    newData.splice(foundIndex, 1);
    setData(newData);
    updateTotal(newData);
  };
  const checkout = () => {
    showDiv ? setShowDiv(false) : setShowDiv(true);
  };
  return (
    <div className="wrapper">
      <br />
      <h1>Shopping</h1>
      <br />
      <div className="total">
        <button onClick={checkout}>go checkout</button>
        <Checkout
          showDiv={showDiv}
          totalPrice={totalPrice}
          inCard={inCard}
          checkout={checkout}
          totalSelected={totalSelected}
        />
      </div>
      <Card
        products={products}
        handleDelete={handleDelete}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
      />
      <br />
      <br />
      <h1>SubTotal : $ {totalPrice.toFixed(2)} </h1>
      <h1>SubTotal items : {totalSelected} </h1>
    </div>
  );
}

export default App;
