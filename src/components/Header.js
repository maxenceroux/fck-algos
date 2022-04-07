import React from "react";

function Header({ albumColor }) {
  return (
    <div className="header">
      <h1 style={{ color: albumColor }}>
        Algo <br /> &nbsp; Rhythms
      </h1>
      <div className="about-us">
        <a style={{ color: albumColor }}>About us</a>
      </div>
    </div>
  );
}

export default Header;
