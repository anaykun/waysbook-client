import React, { useContext } from "react";
import { Link } from "react-router-dom";
import users from "../../images/users.svg";
import Complaint from "../../images/Complaint.svg";
import logouts from "../../images/logouts.svg";
import AddBooks from "../../images/AddBooks.svg";
import { UserContext } from "../../context/useContext";

export default function ProfDown({ logout }) {
  const [state, dispatch] = useContext(UserContext);

  return (
    <ul
      className="dropdown-menu navbar-profile"
      aria-labelledby="navbarScrollingDropdown"
    >
      <li className="nav-item mb-3">
        <Link
          className={
            state.user.role === "customer" ? "dropdown-item fw-bold" : "d-none"
          }
          to="/profile"
        >
          <img
            src={users}
            alt=""
            style={{ width: "2rem", height: "2rem" }}
            className="me-3"
          />
          Profile
        </Link>
      </li>
      <li className="nav-item mb-3">
        <Link
          className={
            state.user.role === "admin" ? "dropdown-item fw-bold" : "d-none"
          }
          to="/add-book"
        >
          <img
            src={AddBooks}
            alt=""
            style={{ width: "2rem", height: "2rem" }}
            className="me-3"
          />
          Add Book
        </Link>
      </li>

      <li className="nav-item mb-3">
        <Link
          className="dropdown-item fw-bold"
          to={state.user.role === "admin" ? "/chat-admin" : "/chat-user"}
        >
          <img
            src={Complaint}
            alt=""
            style={{ width: "2rem", height: "2rem" }}
            className="me-3"
          />
          Complain
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider my-2" />
      </li>

      <li className="nav-item">
        <Link className="dropdown-item fw-bold" to="#" onClick={logout}>
          <img
            src={logouts}
            alt=""
            style={{ width: "2rem", height: "2rem" }}
            className="me-3"
          />
          Logout
        </Link>
      </li>
    </ul>
  );
}
