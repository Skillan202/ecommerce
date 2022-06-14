import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function Mail() {
  const [message, setMessage] = useState("");

  const sendOrders = async () => {
    const name = sessionStorage.getItem("name");
    console.log(name);
    const email = sessionStorage.getItem("email");
    console.log(email);
    const contact = sessionStorage.getItem("contact");
    console.log(contact);
    const price = sessionStorage.getItem("price");
    console.log(price);
    const total = "";

    const response = await axios.get("http://localhost:5000/sendFinalOrders", {
      params: {
        total: total.concat(" ", name, " ", email, " ", contact, " ", price),
      },
    });

    setMessage(response);
    console.log(message);
  };
  useEffect(() => {
    sendOrders();
  }, []);
  return (
    <div>
      {message ? (
        <div
          className="alert alert-success"
          role="alert"
          style={{ height: "100px", width: "90%" }}
        >
          Message sent successfull
        </div>
      ) : (
        <div
          className="alert alert-success"
          role="alert"
          style={{ height: "100px", width: "90%" }}
        >
          Message Senting.....
        </div>
      )}
    </div>
  );
}
export default Mail;
