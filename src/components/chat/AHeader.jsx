import React from "react";
import default_profile from "../../images/blank-profile.png";

export default function AHeader({ item, online, onClickContact }) {
  console.log("profile", item);
  return (
    <div className="container-fluid w-100  " style={{ background: "#DFDFDF" }}>
      <div>
        <div>
          <div className="mx-4 d-flex py-3">
            <div
              className="d-flex align-items-center "
              onClick={() => onClickContact(item)}
            >
              <div
                className="rounded-circle bg-secondary overflow-hidden "
                style={{ height: "50px", width: "50px" }}
              >
                <img
                  src={item.profile?.avatar || default_profile}
                  alt=""
                  className="w-100 h-100"
                />
              </div>
              <div className="ms-3 lh-sm ">
                <p className="m-0 fw-bold">{item.name}</p>
              </div>
            </div>
          </div>
          <div className="border border-dark d-none d-lg-block "></div>
        </div>
      </div>
    </div>
  );
}
