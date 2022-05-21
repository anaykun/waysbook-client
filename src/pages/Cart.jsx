import React, { useEffect, useState } from "react";
import CardCart from "../components/cards/CardCart";
import Navbar from "../components/navbar/Navbar";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

export default function Cart() {
  let navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showe, setShowe] = useState(false);
  const handleCloses = () => setShowe(false);
  const handleShows = () => setShowe(true);

  const [alerts, setAlerts] = useState(false);

  useEffect(() => {
    API.get("/carts")
      .then((res) => {
        setCart(res.data.getCart);
        console.log(res);
      })
      .catch((err) => console.log("error", err));
  }, [show, showe]);

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-ts_1Jrk1IUCqKMqQ";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = async () => {
    await API.post("/transaction")
      .then((res) => {
        console.log(res);
        // handleShows();

        const token = res.data.payment.token;

        window.snap.pay(token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */

            console.log(result);
            setAlerts(true);
            setTimeout(setAlerts, 3000);
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            setAlerts(true);
            setTimeout(setAlerts, 3000);
          },
          onError: function (result) {
            /* You may add your own implementation here */
            console.log(result);
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert("you closed the popup without finishing the payment");
          },
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (del) => {
    await API.delete(`/cart/` + del);
    handleShow();
  };

  return (
    <div className="bg-homes">
      <Navbar show1={show} showe={showe} />
      <div className="container cart-bg ">
        <div className="col">
          <div>
            <h3 className="mb-lg-5 mb-2">My Cart</h3>
            <p>Review Your Order</p>
          </div>
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="border border-dark mb-2"></div>
              {cart.map((item, index) => (
                <CardCart item={item} key={index} deletes={handleDelete} />
              ))}

              <div className="border border-dark mb-2"></div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="border border-dark"></div>
              <div className="d-flex justify-content-between">
                <p className=" my-2 fw-bold">SubTotal</p>
                <p className=" my-2 fw-normal">
                  {cart
                    .map((item) => {
                      return item.total;
                    })
                    .reduce((a, b) => a + b, 0)}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p className=" my-2 fw-bold">Qty</p>
                <p className=" my-2 fw-normal">
                  {cart
                    .map((item) => {
                      return item.qty;
                    })
                    .reduce((a, b) => a + b, 0)}
                </p>
              </div>

              <div className="border border-dark"></div>

              <div className="d-flex justify-content-between">
                <p className="text-success my-2 fw-bold">Total</p>
                <p className="text-success my-2 fw-bold">
                  {cart
                    .map((item) => {
                      return item.total;
                    })
                    .reduce((a, b) => a + b, 0)}
                </p>
              </div>
              <div className="text-end">
                <button className="btn btn-dark w-100 " onClick={handleBuy}>
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <div className="text-center">
          <p className="fs-2 fw-bold text-success p-5">Delete Success</p>
        </div>
      </Modal>
      <Modal show={showe} onHide={handleCloses}>
        <div className="text-center">
          <p className="fs-5 fw-bold text-success p-5">
            The Product is successfully added to the cart
          </p>
        </div>
      </Modal>
    </div>
  );
}
