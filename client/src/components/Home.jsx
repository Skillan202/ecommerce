import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function Home() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await axios.get("http://localhost:5000/get");
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container-fluid vh-100 vw-100 justify-content-center align-items-center">
      <div className="row justify-content-center align-items-center">
        {data.map((item, index) => {
          return (
            <div className="col">
              <h3>{item.name}</h3>
              <h4>{item.email}</h4>
              <h6>{item.contact}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
