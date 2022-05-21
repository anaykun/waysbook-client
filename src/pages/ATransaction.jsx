import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { API } from "../config/api";

export default function ATransaction() {
  const [data, setData] = useState([]);
  useEffect(() => {
    API.get("/transactions")
      .then((res) => {
        console.log(res);
        setData(res.data.trx);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bg-homes">
      <Navbar />
      <div className=" container table-w mb-5 ">
        <h3>Incoming Transaction</h3>
      </div>
      <div className="container overflow-auto table-responsive ">
        <table className="w-75 m-auto table table-hover">
          <thead>
            <tr className="text-danger">
              <th>No</th>
              <th>Users</th>
              <th>Product Purchased</th>
              <th>Total Payment</th>
              <th>Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nameBuyer}</td>
                  <td>{item.products}</td>
                  <td>Rp. {item.total}</td>
                  <td>{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
