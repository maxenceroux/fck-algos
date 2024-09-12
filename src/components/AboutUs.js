import React from "react";
import { useEffect, useState, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MobileHeader from "./HeaderMobile";
import SearchDropdownWithImages from "./Dropdown";
import Header from "./Header";
import { ReactComponent as Oid } from "../oid.svg";
import Collection from "./Collection";

function AboutUs({}) {
  const burgerMenuRef = useRef(null);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleMouseOver = () => {
    setBgColor(getRandomColor());
    console.log(bgColor);
  };

  return (
    <div className="about-us-wrapper">
      hi, we believe that music recs shoud not be driven by algorigthms. they
      encore you in bubble filters
    </div>
  );
}

export default AboutUs;
