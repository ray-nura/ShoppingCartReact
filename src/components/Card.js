import "../App.css";
import React, { useState } from "react";

export default function Card({
  products,
  handleAdd,
  handleRemove,
  handleDelete,
}) {
  const [Pr, setPr] = useState(0);

  const btn = {
    borderRadius: "10px",
    padding: "0 10px",
    fontSize: "34px",
    color: "teal",
    border: "none",
    backgroundColor: "lightgrey",
    cursor: "pointer",
    margin: "10px",
  };
  const card = {
    border: "solid 2px lightgrey",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    backgroundColor: "white",
    padding: "10px",
    margin: "10px",
    width: "23%",
  };
  return (
    <div className="flex">
      {products.map((item) => {
        return (
          <div style={card} key={item.id}>
            <div className="seller">
              <h2>Seller: {item.seller}</h2>
              <hr />
              <h4>{item.name}</h4>
              <img src={item.url} alt={item.name} />
              <br />
              <h4>Qty : {item.count}</h4>
              <span style={btn} onClick={() => handleAdd(item.id)}>
                +
              </span>
              <span style={btn} onClick={() => handleRemove(item.id)}>
                -
              </span>
            </div>
            <div className="price">
              <p>Price $ {item.price}</p>
              {item.disount && <p> Discount: {item.disount}</p>}
              <p>
                Total:
                {item.disount
                  ? (
                      (item.price -
                        (+item.disount.slice(0, item.disount.length - 1) /
                          100) *
                          item.price) *
                      item.count
                    ).toFixed(2)
                  : (item.price * item.count).toFixed(2)}
              </p>
              <button style={btn} onClick={() => handleDelete(item.id)}>
                remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
