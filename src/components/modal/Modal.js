import React from "react";
import "./Modal.css";

function Modal({ setOpenModal, linearGradient }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="body">
          <p>
            no albums left to display, consider removing some filters or
            following new users!{" "}
          </p>
        </div>
        <div className="footer">
          <button
            style={{ backgroundColor: linearGradient }}
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            got it!
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
