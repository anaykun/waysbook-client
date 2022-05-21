import React from "react";
import default_profile from "../../images/blank-profile.png";

export default function ChatHeader({ online, contact }) {
  console.log("online", online);
  console.log("contact", contact);
  return (
    <>
      <>
        <div className="mx-4 d-flex">
          <div className="d-flex align-items-center ">
            <div
              className="rounded-circle bg-danger overflow-hidden border border-dark border-3"
              style={{ height: "50px", width: "50px" }}
            >
              <img src={default_profile} alt="" className="w-100 h-100" />
            </div>
            <div className="ms-3 lh-sm">
              <p className="m-0 fw-bold">Admin</p>
              <div className="d-flex align-items-center">
                <div
                  className={` ${
                    online ? "bg-success" : "bg-danger"
                  } rounded-circle me-2`}
                  style={{ width: "8px", height: "8px" }}
                ></div>
                <div>
                  <p className="m-0">{online ? "online" : "offline"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
