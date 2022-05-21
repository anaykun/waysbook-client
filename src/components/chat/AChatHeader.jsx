import React from "react";
import default_profile from "../../images/blank-profile.png";

export default function AChatHeader({ online, contact }) {
  return (
    <>
      <>
        <div className="mx-4 d-flex">
          <div className="d-flex align-items-center ">
            <div
              className="rounded-circle bg-secondary overflow-hidden "
              style={{ height: "50px", width: "50px" }}
            >
              <img
                src={contact.profile?.avatar || default_profile}
                alt=""
                className="w-100 h-100"
              />
            </div>
            <div className="ms-3 lh-sm">
              <p className="m-0 fw-bold"></p>
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
