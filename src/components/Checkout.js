import React from "react";
import "../App.css";

export default function Checkout({
  showDiv,
  inCard,
  totalPrice,
  checkout,
  totalSelected,
}) {
  const list = {
    display: "grid",
    gridTemplateColumns: "3fr 1fr 1fr 2fr 2fr",
    padding: "5px",
  };

  return (
    <div className={showDiv ? "show" : "notShow"}>
      <h1>All products : </h1> <hr />
      {inCard &&
        inCard.map((item) => {
          return (
            <div style={list} key={item.id}>
              <span className="text">{item.name} </span>
              <span className="text">${item.price}</span>
              <span className="text">{item.disount}</span>
              <span className="text">Total for : {item.count}</span>
              <span className="text">
                $
                {item.disount
                  ? (
                      (item.price -
                        (+item.disount.slice(0, item.disount.length - 1) /
                          100) *
                          item.price) *
                      item.count
                    ).toFixed(2)
                  : (item.price * item.count).toFixed(2)}
              </span>
            </div>
          );
        })}
      <p>shipping free</p>
      <hr />
      <h2> SubTotal : $ {totalPrice.toFixed(2)}</h2>
      <h2>SubTotal items : {totalSelected} </h2>
      <br />
      <button onClick={checkout}>close</button>
    </div>
  );
}
