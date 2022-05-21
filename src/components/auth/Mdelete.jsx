import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Eraser from "../../images/Eraser.svg";
import { API } from "../../config/api";
import { useParams } from "react-router-dom";

export default function Mdelete() {
  const { id } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <button className="btn" onClick={handleShow}>
        <img src={Eraser} alt="" />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
