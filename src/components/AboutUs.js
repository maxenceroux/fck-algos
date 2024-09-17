import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MobileHeader from "./HeaderMobile";
import SearchDropdownWithImages from "./Dropdown";
import Header from "./Header";
import { ReactComponent as Oid } from "../oid.svg";
import Collection from "./Collection";

function AboutUs({}) {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const burgerMenuRef = useRef(null);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState(getRandomColor());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [hovered, setHovered] = useState(false); // New state for tracking hover

  const handleMouseOver = () => {
    setBgColor(getRandomColor());
    setHovered(true); // Set hover state to true
  };

  const handleMouseOut = () => {
    setHovered(false); // Set hover state to false when mouse leaves
  };

  return (
    <div className="about-us-wrapper">
      <div
        id="logo-main"
        className="logo-main"
        onClick={() => navigate("/")}
        onMouseOver={handleMouseOver}
      >
        <svg className="logo" fill={bgColor}>
          <Oid />
        </svg>
        <h1
          className="title"
          style={{
            color: bgColor,
            fontFamily: "Sanchez-Regular",
          }}
        >
          FCK ALGOS
        </h1>
      </div>
      <div className="about-us-content">
        Hi, we believe that music recommendations should not be driven by
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none", // Apply uppercase on hover
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} // Trigger when mouse leaves
          className="colored"
        >
          {" "}
          algorithms
        </span>{" "}
        that trap you in{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none", // Apply uppercase on hover
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} // Trigger when mouse leaves
          className="colored"
        >
          echo chambers
        </span>
        . Instead, we think the best discoveries come from{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none", // Apply uppercase on hover
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} // Trigger when mouse leaves
          className="colored"
        >
          real people
        </span>{" "}
        with unique tastes. <br />
        Our platform is built around the idea that music is best explored
        through personal connections and{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none", // Apply uppercase on hover
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} // Trigger when mouse leaves
          className="colored"
        >
          serendipity{" "}
        </span>{" "}
        . Here, you can follow fellow music heads and dig randomly through their
        collections, stumbling upon an 80s synth-wave melody a click away from a
        doom metal banger.
        <br />
        <br />
        We believe in the album as an art form. In a world of endless playlists,
        we’re here to bring back the intentional listening. Albums tell stories,
        reveal layers, and reflect an artist’s full vision. Here, you’ll explore
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none", // Apply uppercase on hover
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} // Trigger when mouse leaves
          className="colored"
        >
          {" "}
          handpicked albums from others.
        </span>
        <br />
        <br />
        This website is proudly{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none", // Apply uppercase on hover
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} // Trigger when mouse leaves
          className="colored"
        >
          DIY
        </span>
        , embracing a{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none", // Apply uppercase on hover
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} // Trigger when mouse leaves
          className="colored"
        >
          geeky open-source philosophy
        </span>{" "}
        . We welcome all kinds of recommendations, no matter the genre or
        obscurity. Your taste and voice are what make this community vibrant and
        diverse. We're all about{" "}
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none", // Apply uppercase on hover
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} // Trigger when mouse leaves
          className="colored"
        >
          collaboration, experimentation.
        </span>
        <br />
        <br />
        <br />
        <br />
        <span
          style={{
            color: bgColor,
            textTransform: hovered ? "uppercase" : "none", // Apply uppercase on hover
          }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut} // Trigger when mouse leaves
          className="colored"
        >
          {" "}
          Join us in breaking free from the algorithmic noise{" "}
        </span>
        <span
          style={{
            color: getRandomColor(),
          }}
        >
          :)
        </span>
      </div>
    </div>
  );
}

export default AboutUs;
