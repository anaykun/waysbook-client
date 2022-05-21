import React from "react";
import { Link } from "react-router-dom";
import Rectangle from "../../images/Rectangle.png";

export default function CardBook({ item, stat }) {
  return (
    <div className="col nav-item">
      <Link to={stat.isLogin ? `/detail/` + item.id : "#"} className="nav-link">
        <div
          className="bg-light my-2"
          style={{ width: "200px", height: "395px" }}
        >
          <div className="" style={{ width: "200px", height: "270px" }}>
            <img src={item.bookImg} alt="" className="h-100 w-100" />
          </div>
          <div className="d-flex" style={{ height: "125px" }}>
            <div className="m-0 ">
              <p className="fs-4 lh-1 my-2 fw-bold text-dark">{item.title}</p>
              <p className="fw-lighter my-1 text-dark">{item.author}</p>
              <p className="text-success fw-bold fs-5 m-0">Rp. {item.price}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
