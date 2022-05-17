import React from "react";
import "./Modal.css";

function Modal({ setOpenModal, linearGradient }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="body">
          <p>No albums left to display, consider removing some filters! </p>
        </div>
        <div className="footer">
          <button
            style={{ backgroundImage: linearGradient }}
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
