import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Biriyani from "../images/biriyani.jpg";
import donut from "../images/donut.jpg";
import pizza from "../images/pizza.jpg";
import { useNavigate, Link } from "react-router-dom";

function Productscreen() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(1);
  const images = [pizza, Biriyani, donut];
  const [datas, setDatas] = useState([]);
  const sizes = [1, 2, 3, 4, 5, 6];


  const getData = async () => {
    const response = await axios.get("http://localhost:5000/get");
    setDatas(response.data);
  };
  const onSubmit = async (pid, name, price) => {
    await axios.post("http://localhost:5000/insert", {
      pid: pid,
      name: name,
      price: price,
      quantity: selected,
    });
  };
  useEffect(() => {
    if (!sessionStorage.getItem("email")) {
      navigate("/");
    }
    getData();
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
          <div
            className="spinner-border text-dark"
            style={{ marginTop: "300px" }}
          ></div>
        </div>
      ) : (
        <div className="container-fluid vh-100 vw-100">
          <div className="row justify-content-between pt-5">
            <div className="col text-start">
              <h3 className="fw-bold ps-3">Wakriz</h3>
            </div>
            <div className="col pe-3">
              <div className="row justify-content-between">
                <div className="col">
                  <Link to="/login">Login</Link>
                </div>
                <div className="col">
                  <Link to="/orders">Orders</Link>{" "}
                </div>
                <div className="col">
                  <Link to="/register">Register</Link>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="row text-start ps-3 pt-5 pb-4">
            <div className="col">
              <h4>Products</h4>
            </div>
          </div>
          <div className="row justify-content-between ">
            {datas.map((data, index) => {
              return (
                <div className="col mb-4" key={index}>
                  <div
                    className="card shadow-sm text-start p-3"
                    style={{ width: "350px" }}
                  >
                    <img
                      className="card-img-top img-fluid"
                      src={images[index]}
                      style={{ height: "200px" }}
                    ></img>
                    <div className="card-body">
                      <h4 className="card-title fw-bolder">{data.name}</h4>
                      <h6 className="card-subtitle text-muted lead pb-3">
                        {data.description}
                      </h6>
                      <h5 className="fw-bold">${data.price}</h5>
                    </div>
                    <div className="row ">
                      <div className="col">
                        <select
                          name="quantities"
                          id="quantity"
                          style={{ marginTop: "15px" }}
                          onChange={(e) => {
                            setSelected(e.target.value);
                          }}
                        >
                          {sizes.map((size, index) => {
                            return <option value={size}>{size}</option>;
                          })}
                        </select>
                      </div>
                      <div className="col">
                        <button
                          id="minnu"
                          onClick={() =>
                            onSubmit(data.pid, data.name, data.price)
                          }
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Productscreen;
