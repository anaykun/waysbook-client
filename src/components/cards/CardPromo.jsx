import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";

export default function CardPromo({ item, handleBuy, stat }) {
  let { id } = useParams();
  const [purse, setPurse] = useState({});

  useEffect(() => {
    API.get(`/purchased/` + id)
      .then((res) => {
        setPurse(res.data.purBook);
      })
      .catch((err) => console.log("error", err));
  }, []);
  return (
    <div className=" container-fluid row ">
      <div className="col">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "500px" }}
        >
          <div className="p-0" style={{ width: "236px", height: "345px" }}>
            <Link to={stat.isLogin ? `/detail/` + item.id : "#"}>
              <img
                src={item.bookImg}
                alt=""
                className="img-fluid h-100 w-100"
              />
            </Link>
          </div>
          <div
            className="col d-none d-sm-block px-2 py-3 nav-item "
            style={{ background: "white" }}
          >
            <Link
              to={stat.isLogin ? `/detail/` + item.id : "#"}
              className=" nav-link p-0 text-dark"
            >
              <p className=" fw-bold fs-4 m-0 lh-sm">{item.title}</p>
            </Link>
            <p className="fw-lighter mt-2">By {item.author}</p>
            <div className="textPromo ">
              <p className="lh-sm">{item.desc}</p>
            </div>
            <div>
              <p className="text-success fs-4 fw-bold">Rp. {item.price}</p>
            </div>
            <div className="">
              {purse ? (
                <button className="btn btn-dark ">Download</button>
              ) : (
                <button
                  className="btn btn-dark w-100"
                  onClick={() => handleBuy(item.id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
