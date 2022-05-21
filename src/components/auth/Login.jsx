import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/useContext";
import { API } from "../../config/api";
import { useMutation } from "react-query";
import { AContext } from "../../context/modal";

export default function Login() {
  let navigate = useNavigate();

  const [states, dispatchs] = useContext(AContext);
  const setModal = states.modalSignIn;
  const switching = () => {
    if (!setModal) {
      dispatchs({
        type: "SIGN_IN",
      });
    } else {
      dispatchs({
        type: "SIGN_UP",
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

  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
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

      // Configuration
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);

      // to know whos the user
      const user = response.data.data;

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user.user,
      });

      // Status check
      if (user.role === "admin") {
        navigate("/add-book");
      } else {
        navigate("/");
      }

      dispatchs({
        type: "CLOSE",
      });

      const alert = (
        <div className="alert alert-success" role="alert">
          Login Success
        </div>
      );
      setMessage(alert);
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
        className="btn btn-outline-dark me-3 mb-2 mb-lg-0 fw-bold px-4"
      >
        Login
      </Button>

      <Modal show={setModal} onHide={switOff}>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="container p-3">
            <label className="fs-1 fw-bold">Login</label>
            {message && message}
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
            <button className="btn btn-dark w-100 my-3">Login</button>
            <div className="text-center ">
              <label className="d-flex flex-row align-items-center justify-content-center">
                Don't have an account ? Klik
                <Link
                  className="nav-link text-dark fw-bold p-1 "
                  to="/#"
                  onClick={() => switching()}
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
