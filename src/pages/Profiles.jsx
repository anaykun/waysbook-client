import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import email from "../images/email.svg";
import gender from "../images/gender.svg";
import telepon from "../images/telepon.svg";
import address from "../images/address.svg";
import CardBuy from "../components/cards/CardBuy";
import ProfileEdit from "../components/auth/ProfileEdit";
import { API } from "../config/api";
import { UserContext } from "../context/useContext";

export default function Profiles() {
  const [data, setData] = useState({});
  const [book, setBook] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  console.log("profile", state);

  useEffect(() => {
    API.get("/profile")
      .then((res) => {
        setData(res.data.data.profile);
      })
      .catch((err) => console.log("error", err));

    API.get("/purchased-books")
      .then((res) => {
        console.log(res);
        setBook(res.data.purBook);
      })
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <div className="bg-homes">
      <Navbar />
      <div className="container profile-bg p-2">
        <div className="mb-3 p-0">
          <h3>Profile</h3>
        </div>
        <div
          className="p-lg-5 px-3 profiles-item m-auto rounded "
          style={{ background: "#FFD9D9" }}
        >
          <div className="row ">
            <div className="row col ">
              <img
                className=" p-0"
                src={email}
                alt=""
                style={{ height: "50px", width: "50px" }}
              />
              <div className="col-lg-11 col-10 mb-4">
                <p className="m-0 fw-bold">{state.user.email}</p>
                <p className="m-0 fw-lighter">Email</p>
              </div>
              <img
                className=" p-0"
                src={gender}
                alt=""
                style={{ height: "50px", width: "50px" }}
              />
              <div className="col-lg-11 col-10 mb-4">
                <p className="m-0 fw-bold">{data.gender}</p>
                <p className="m-0 fw-lighter">Gender</p>
              </div>
              <img
                className=" p-0"
                src={telepon}
                alt=""
                style={{ height: "50px", width: "50px" }}
              />
              <div className="col-lg-11 col-10 mb-4">
                <p className="m-0 fw-bold">{data.phone}</p>
                <p className="m-0 fw-lighter">Mobile phone</p>
              </div>
              <img
                className=" p-0"
                src={address}
                alt=""
                style={{ height: "50px", width: "50px" }}
              />
              <div className="col-lg-11 col-10 mb-4">
                <p className="m-0 fw-bold">{data.address}</p>
                <p className="m-0 fw-lighter">Address</p>
              </div>
            </div>

            <div className="col-lg-4 p-0 py-3">
              <div style={{ height: "300px", width: "100%" }}>
                <img className="w-100 h-100 mb-3" src={data.avatar} alt="" />
              </div>
              <div className="nav-item bg-danger rounded">
                <ProfileEdit />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "50px" }}></div>
      <div className="container w-75">
        <h3 className="fw-bold">My Books</h3>
      </div>
      <div style={{ height: "10px" }}></div>
      <div className="container w-75">
        <div className="row justify-content-start">
          {book.map((item, index) => (
            <CardBuy item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
