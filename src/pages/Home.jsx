import React, { useContext, useEffect, useState } from "react";
import CardBook from "../components/cards/CardBook";
import CardPromo from "../components/cards/CardPromo";
import Navbar from "../components/navbar/Navbar";
import { UserContext } from "../context/useContext";
import { API } from "../config/api";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AContext } from "../context/modal";

export default function Home() {
  const [state, dispatch] = useContext(UserContext);
  const [states, dispatchs] = useContext(AContext);
  const [data, setData] = useState([]);
  const [promo, setPromo] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setModal = states.modalSignIn;
  const switching = () => {
    if (!setModal && !state.isLogin) {
      dispatchs({
        type: "SIGN_IN",
      });
    }
  };

  useEffect(() => {
    API.get("/books")
      .then((res) => {
        setData(res.data.data.books);
      })
      .catch((err) => console.log("error", err));

    API.get("/promo-books")
      .then((res) => {
        // console.log(res.data.data);
        setPromo(res.data.data.promoBooks);
      })
      .catch((err) => console.log("error", err));
  }, []);
  const handleBuy = async (id) => {
    try {
      if (state.isLogin) {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await API.post(
          "/cart",
          {
            idProduct: id,
          },
          config
        ).then((res) => {
          console.log(res);
          handleShow();
        });
      }
    } catch (error) {}
  };

  return (
    <div className="bg-home">
      <div className="fixed-top">
        <Navbar shows={show} />
      </div>
      <div onClick={() => switching(true)}>
        <div className="" style={{ height: "200px" }}></div>
        <div className="home-header container">
          <h1 className=" text-center fw-normal fs-1">
            With us, you can shop online & help save your high street at the
            same time
          </h1>
        </div>
        <div className="" style={{ height: "150px" }}></div>
        <div className="d-flex overflow-auto">
          {promo.map((item, index) => (
            <CardPromo
              item={item}
              key={index}
              handleBuy={handleBuy}
              stat={state}
            />
          ))}
        </div>
        <div className="" style={{ height: "50px" }}></div>
        <div className="container">
          <h3>List Book</h3>
        </div>
        <div className="" style={{ height: "30px" }}></div>
        <div className="container">
          <div className="row ">
            {data.map((item, index) => (
              <CardBook item={item} key={index} stat={state} />
            ))}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <div className="text-center">
          <p className="fs-5 fw-bold text-success p-5">
            The Product is successfully added to the cart
          </p>
        </div>
      </Modal>
    </div>
  );
}
