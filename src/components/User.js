import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Header from "./Header";
import { ReactComponent as Oid } from "../oid.svg";
import Collection from "./Collection";

function User({}) {
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
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/login";
  };

  const handleChange = () => {
    if (!localStorage.getItem("user_id")) {
      handleLogin();
    }
    const url = "http://localhost:8000/follow";
    const params = {
      follower_id: localStorage.getItem("user_id"),
      following_id: user.id,
    };
    axios
      .post(url, {}, { params: params })
      .then((response) => {
        setIsFollowing(response.data.is_following);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      console.log(isMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const params = { user_id: id };
      try {
        const { data } = await axios.get(`http://localhost:8000/user_info`, {
          params,
        });
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchFollow = async () => {
      const url = "http://localhost:8000/follow";
      const params = {
        follower_id: localStorage.getItem("user_id"),
        following_id: user.id,
      };
      console.log(params);
      axios.get(url, { params }).then((response) => {
        setIsFollowing(response.data);
      });
    };
    if (user.id && localStorage.getItem("user_id")) {
      fetchFollow();
    }
  });

  useEffect(() => {
    const logoMain = document.querySelector("#logo-main");
    const mobileHeader = document.querySelector(".header-logo");
    const searchIcon = document.querySelector("#search-icon");

    if (isMobile && mobileHeader && logoMain && searchIcon) {
      mobileHeader.appendChild(logoMain);
      mobileHeader.appendChild(searchIcon);

      searchIcon.addEventListener("click", handleSearchClick);

      // Cleanup to remove the event listener when component is unmounted
      return () => {
        searchIcon.removeEventListener("click", handleSearchClick);
      };
    }
  }, [isMobile]);
  const handleSearchClick = () => {
    const searchBox = document.querySelector(".search-box");
    const overlay = document.querySelector(".overlay");
    console.log("here");
    searchBox.classList.add("mobile");
    if (overlay.style.display === "block") {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
  };
  return (
    <div className="user">
      <div className="header-logo">
        <div
          onClick={() => navigate("/")}
          onMouseOver={handleMouseOver}
          style={{
            color: bgColor,
          }}
          className="logo-main"
        >
          <svg className="logo" fill="#d3d3d3">
            <Oid fill={bgColor} />
          </svg>
          <h1 className="title" style={{ fontFamily: "Sanchez-Regular" }}>
            fck algos
          </h1>
        </div>
        <header className="App-header">
          <Header className="header-user" />
        </header>
      </div>
      <div className="user-info">
        <img
          src={
            user.image_url ||
            "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
          }
        />
        <div className="user-info-texts">
          <p className="user-name">{user.display_name}</p>
          <div className="user-info-stats">
            <p>{user.following_count} following </p>
            <p>{user.follower_count} followers </p>
            <p>{user.albums_count} albums saved</p>
          </div>
        </div>
        <div
          style={{ backgroundColor: bgColor }}
          onClick={handleChange}
          onMouseOver={handleMouseOver}
          className={`follow-button ${
            isFollowing ? "following" : "not-following"
          }`}
        >
          {isFollowing ? "following" : "follow"}
        </div>
      </div>

      <Collection userId={user.id} randomColor={bgColor} />
    </div>
  );
}

export default User;
