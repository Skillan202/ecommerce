import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { login } from "../redux/login";
function Login() {
  const dispatch=useDispatch();
  const [inputname, setName] = useState("");
  const [inputemail, setEmail] = useState("");
  const [inputcontact, setContact] = useState(0);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const getUsers = async () => {
    if (inputname && inputemail && inputcontact) {
      const response = await axios.get("http://localhost:5000/getUsers", {
        params: {
          name: inputname,
          email: inputemail,
          contact: inputcontact,
        },
      });
      console.log(response.data);
      const datas = response.data;
      if (datas[0].id) {
        navigate("/");
        sessionStorage.setItem("email", datas[0].email);
        const email = sessionStorage.getItem("email");
        console.log(email);

        sessionStorage.setItem("name", datas[0].name);
        const name = sessionStorage.getItem("name");
        console.log(name);

        sessionStorage.setItem("contact", datas[0].contact);
        const contact = sessionStorage.getItem("contact");
        console.log(contact);
        const conc=inputcontact.toString();
        dispatch(login({name:inputname,email:inputemail,contact:conc}))
      }
    } else {
      setError("Please Fill the valid details");
    }
  };
  
  return (
    <div className="container-fluid vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
      <div className="row justify-content-center align-items-center">
        <div className="col-6 text-start">
          <h4 className="fw-bold pb-4">Login Page</h4>
          <h5 className="pb-2">Your name</h5>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="mb-3"
          />
          <h5 className="pb-2">Your email</h5>
          <input
            type="text"
            className="mb-3"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h5 className="pb-2">Your contact</h5>
          <input
            type="text"
            className="mb-3"
            onChange={(e) => {
              setContact(e.target.value);
            }}
          />
          <div
            className="btn btn-primary mt-2"
            type="submit"
            name="submit"
            onClick={getUsers}
            style={{ width: "220px" }}
          >
            Login
          </div>
          {error && (
            <div
              className="alert alert-danger mt-2 "
              style={{ width: "230px" }}
              role={alert}
            >
              {error}
            </div>
          )}
          <div className="row justify-content-center pt-3">
            <div className="col">
              <Link className="" to="/register">
                Create an account...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
