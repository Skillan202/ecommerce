import React from "react";
import { Link } from "react-router-dom";
import { History } from "history";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Orderscreen() {
  const [orders, setOrders] = useState([]);
  const sizes = [1, 2, 3, 4, 5, 6];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [change, setChange] = useState(true);
  let sum = 0;
  const onSubmit = (sum) => {
    console.log(sum)
    sessionStorage.setItem("price",sum)
    const price=sessionStorage.getItem("price")
    console.log(price)
    navigate("/mail");
    
  };
  const getOrders = async () => {
    const response = await axios.get("http://localhost:5000/getOrders");
    setOrders(response.data);
  };
  const updateOrder = async (quantity, oid) => {
    await axios.post("http://localhost:5000/updateOrder", {
      quantity: quantity,
      oid: oid,
    });
    setChange(!change);
  };
  const deleteOrder = async (oid) => {
    const response = await axios.post("http://localhost:5000/deleteOrder", {
      oid: oid,
    });
    setChange(!change);
  };
  useEffect(() => {
    getOrders();
    setLoading(false);
  }, [change]);
  return (
    <div>
      {loading ? (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
          <div
            className="spinner-border text-dark"
            style={{ marginTop: "300px" }}
          ></div>
        </div>
      ) : (
        <div className="container-fluid p-3 d-flex flex-column align-items-start">
          <h2 className="fw-bold pb-4">Orders</h2>
          <div className="row">
            {orders.map((order, index) => {
              {
                sum = sum + order.quantity * order.price;
              }

              return (
                <div className="col-9-md rounded shadow-sm" key={index}>
                  <div className="row p-2 justify-content-between align-items-center ">
                    <div className="col">
                      <h4>{order.name}</h4>
                    </div>
                    <div className="col">
                      <select
                        name="quantities"
                        id="quantity"
                        style={{ marginTop: "15px" }}
                        onChange={(e) => {
                          console.log(e.target.value);
                          updateOrder(e.target.value, order.oid);
                        }}
                      >
                        {sizes.map((size, index) => {
                          return order.quantity == size ? (
                            <option value={size} selected>
                              {size}
                            </option>
                          ) : (
                            <option value={size}>{size}</option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col">
                      <h4 className="fw-bold">{order.price}</h4>
                    </div>
                    <div className="col">
                      <div
                        className="btn btn-danger"
                        onClick={() => deleteOrder(order.oid)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h3 fw-bolder pt-4">Total Price : ${sum}</div>
          <div className="btn btn-primary mt-4 btn-lg" onClick={()=>onSubmit(sum)}>
            Submit Order
          </div>
        </div>
      )}
    </div>
  );
}

export default Orderscreen;
