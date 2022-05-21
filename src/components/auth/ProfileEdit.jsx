import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import checked from "../../images/checked.svg";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";

export default function ProfileEdit() {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState({
    gender: "",
    phone: "",
    address: "",
    avatar: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (profile.avatar) {
      formData.set("avatar", profile.avatar[0], profile.avatar[0]?.name);
    }
    formData.set("gender", profile.gender);
    formData.set("phone", profile.phone);
    formData.set("address", profile.address);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    await API.patch("/profile", formData, config);
    handleClose();
    navigate("/");
  };
  return (
    <div>
      <Button
        variant="none"
        onClick={handleShow}
        className="btn btn-danger me-3 mb-2 mb-lg-0 fw-bold px-4 w-100 text-light"
      >
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div className="container p-3">
            <label className="fs-1 fw-bold mb-3">Edit Profile</label>
            <select
              name="gender"
              onChange={handleChange}
              className="form-select mb-3"
              aria-label="Default select example"
            >
              <option value="" hidden>
                Gender
              </option>
              <option value="Man">Man</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
            <input
              onChange={handleChange}
              className="form-control mb-3"
              type="text"
              name="phone"
              placeholder="Mobile Phone"
            />
            <div className="">
              <textarea
                onChange={handleChange}
                name="address"
                className="form-control mb-3"
                placeholder="Address"
                id="floatingTextarea2"
                style={{ height: "100px" }}
              ></textarea>
            </div>

            <div className="d-flex align-items-center">
              <input
                onChange={handleChange}
                name="avatar"
                className="custom-file-input fs-6 text-light rounded w-25"
                type="file"
                style={{
                  border: "none",
                }}
              />
              {preview !== null ? (
                <div>
                  <img
                    src={checked}
                    alt=""
                    style={{ height: "30px", width: "30px" }}
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <button className="btn btn-dark w-100 my-3" onClick={handleClose}>
              Submit
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
