import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Eraser from "../../images/Eraser.svg";
import { API } from "../../config/api";

export default function CardCart({ item, deletes }) {
  return (
    <div className=" container-fluid row p-0 mb-2">
      <div className="col">
        <div className="d-flex justify-content-center ">
          <div className="p-0 me-2" style={{ width: "130px", height: "170px" }}>
            <Link to="#">
              <img
                src={item.book.bookImg}
                alt=""
                className="img-fluid h-100 w-100"
              />
            </Link>
          </div>
          <div
            className="col nav-item "
            // style={{ background: "white" }}
          >
            <Link to="#" className=" nav-link p-0 text-dark d-none d-sm-block ">
              <p className=" fw-bold fs-5 m-0 lh-sm ">{item.book.title}</p>
            </Link>
            <p className="fw-lighter mt-2  my-1">By {item.book.author}</p>

            <div className="m-0 p-0">
              <p className="text-success fs-4 fw-bold ">
                Rp. {item.book.price}
              </p>
            </div>
          </div>
          <div className="col-2 text-end">
            <button className="btn" onClick={() => deletes(item.id)}>
              <img src={Eraser} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
