import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Regsiter() {
  const [inputname, setName] = useState("");
  const [inputemail, setEmail] = useState("");
  const [inputcontact, setContact] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = () => {
    if (inputname && inputemail && inputcontact) {
      axios
        .post("http://localhost:5000/add", {
          name: inputname,
          email: inputemail,
          contact: inputcontact,
        })
        .then((response) => console.log(response));
      navigate("/");
    } else {
      setError("Please Fill the valid details");
    }
  };

  return (
    <div className="container-fluid vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
      <div className="row justify-content-center align-items-center">
        <div className="col-6 text-start">
          <h4 className="fw-bold pb-4">Register Page</h4>
          <h5 className="pb-2">Your name</h5>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="mb-3"
          />
          <h5 className="pb-2">Your Email</h5>
          <input
            type="text"
            className="mb-3"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h5 className="pb-2">Your Contact</h5>
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
            onClick={onSubmit}
            style={{ width: "220px" }}
          >
            Register
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
              <Link className="" to="/login">
                Already have an account..
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Regsiter;
