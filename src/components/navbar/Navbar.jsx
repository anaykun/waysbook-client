import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoApp from "../../images/LogoApp.svg";
import cartk from "../../images/cart.png";

import ProfDown from "../dropdown/ProfDown";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { UserContext } from "../../context/useContext";
import { API } from "../../config/api";
import { Badge } from "react-bootstrap";

export default function Navbar({ shows, show1, show2, showe }) {
  const [state, dispatch] = useContext(UserContext);
  const [data, setData] = useState({});
  const [fore, setFore] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  let navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  useEffect(() => {
    API.get("/profile")
      .then((res) => {
        setData(res.data.data.profile);
      })
      .catch((err) => console.log("error", err));

    API.get("/carts")
      .then((res) => {
        console.log("cartss", res);
        setFore(res.data.getCart);
      })
      .catch((err) => console.log("error", err));
  }, [shows, show1, show2, showe]);

  let nave = "";

  if (state.isLogin) {
    nave = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center ">
        <li className="nav-item ">
          <Link
            to="/cart"
            className={state.user.role === "customer" ? "nav-link" : "d-none"}
          >
            {fore ? (
              <Badge pill bg="danger">
                {fore.length}
              </Badge>
            ) : (
              ""
            )}
            <img
              src={cartk}
              alt=""
              style={{ width: "3rem", height: "3rem" }}
              className="ms-1 me-lg-4"
            />
          </Link>
        </li>

        <li className="nav-item dropdown ">
          <div
            className="bg-dark rounded-circle overflow-hidden"
            style={{ width: "4rem", height: "4rem" }}
            id="navbarScrollingDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src={data.avatar} alt="" className="img-fluid" />
          </div>
          <ProfDown logout={logout} />
        </li>
      </ul>
    );
  } else {
    nave = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center ">
        <li className="nav-item ">
          <Login />
        </li>
        <li className="nav-item  ">
          <Register />
        </li>
      </ul>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container py-lg-4 ">
        <Link
          className="navbar-brand"
          to={state.user.role === "admin" ? "/admin-transaction" : "/"}
        >
          <img src={LogoApp} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse  " id="navbarTogglerDemo02">
          {nave}
        </div>
      </div>
    </nav>
  );
}
