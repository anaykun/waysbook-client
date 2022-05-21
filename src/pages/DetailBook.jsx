import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import buys from "../images/buys.svg";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { Button, Modal } from "react-bootstrap";

export default function DetailBook() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState({});
  const [purse, setPurse] = useState({});
  let { id } = useParams();

  useEffect(() => {
    API.get(`/book/` + id)
      .then((res) => {
        setData(res.data.data.book);
      })
      .catch((err) => console.log("error", err));

    API.get(`/purchased/` + id)
      .then((res) => {
        setPurse(res.data.purBook);
      })
      .catch((err) => console.log("error", err));
  }, []);

  const handleBuy = async () => {
    try {
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
        console.log("beli ", res);
        handleShow();
      });
    } catch (error) {}
  };
  return (
    <div className="bg-home">
      <Navbar show2={show} />
      <div className="container">
        <div className="row align-items-center">
          <div className=" col-lg-6 d-flex justify-content-end">
            <div style={{ width: "400px", height: "577px" }}>
              <img src={data.bookImg} alt="" className="h-100 w-100" />
            </div>
          </div>
          <div className="col-lg-4">
            <h1 className="fw-bolder">{data.title}</h1>
            <h3 className="fw-lighter fs-4 mb-5">By. {data.author}</h3>
            <div className="mb-4">
              <p className="fs-4 fw-bold mb-1">Publication Date</p>
              <p className="fw-lighter">{data.date}</p>
            </div>
            <div className="mb-4">
              <p className="fs-4 fw-bold mb-1">Pages</p>
              <p className="fw-lighter">{data.pages}</p>
            </div>
            <div className="mb-4">
              <p className="fs-4 fw-bold mb-1 text-danger">ISBN</p>
              <p className="fw-lighter">{data.ISBN}</p>
            </div>
            <div className="mb-4">
              <p className="fs-4 fw-bold mb-1">Price</p>
              <p className="fw-bold text-success">Rp. {data.price}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 w-75 m-auto py-3">
          <h1>About This Book</h1>
          <div className="aboutbook">
            <p className="fw-lighter">{data.desc}</p>
          </div>
          <div className="d-flex justify-content-end">
            {purse ? (
              <button className="btn btn-dark ">Download</button>
            ) : (
              <button className="btn btn-dark " onClick={handleBuy}>
                Add Cart{" "}
                <span className="ms-3">
                  <img src={buys} alt="" />
                </span>
              </button>
            )}
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
