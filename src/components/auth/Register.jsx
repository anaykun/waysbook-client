import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { AContext } from "../../context/modal";

export default function Register() {
  const [states, dispatchs] = useContext(AContext);
  // console.log(states);
  const setModal = states.modalSignUp;
  const switching = () => {
    if (!setModal) {
      dispatchs({
        type: "SIGN_UP",
      });
    } else {
      dispatchs({
        type: "SIGN_IN",
      });
    }
  };
  const switOff = () => {
    if (setModal) {
      dispatchs({
        type: "CLOSE",
      });
    }
  };

  const [message, setMessage] = useState();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);
      console.log(response);

      // Notification
      if (response.data.status === "Success") {
        const alert = (
          <div className="alert alert-success" role="alert">
            Success
          </div>
        );
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <div className="alert alert-danger" role="alert">
            Failed
          </div>
        );
        setMessage(alert);
      }

      // Handling response here
    } catch (error) {
      const alert = (
        <div className="alert alert-danger" role="alert">
          Failed
        </div>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div>
      <Button
        variant="none"
        onClick={() => switching()}
        className="btn btn-dark me-3 mb-2 mb-lg-0 fw-bold px-4"
      >
        Register
      </Button>

      <Modal show={setModal} onHide={switOff}>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="container p-3">
            <label className="fs-1 fw-bold">Register</label>
            <div>{message}</div>
            <input
              className="form-control my-3 "
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="form-control my-3"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              className="form-control my-3"
              name="name"
              type="text"
              placeholder="Fulll Name"
              onChange={handleChange}
            />
            <button className="btn btn-dark w-100 my-3">Register</button>
            <div className="text-center ">
              <label className="d-flex flex-row align-items-center justify-content-center">
                Already have an account ? Klik
                <Link
                  className="nav-link text-dark fw-bold p-1 "
                  to="/#"
                  onClick={() => switching(true)}
                >
                  Here
                </Link>
              </label>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
