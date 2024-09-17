import React from "react";
import Header from "./Header";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { ReactComponent as Oid } from "../oid.svg";
import { Link } from "react-router-dom";
import UserCollection from "./UserCollection";
import MobileHeader from "./HeaderMobile";
import SearchDropdownWithImages from "./Dropdown";

function Profile({}) {
  const [user, setUser] = useState();
  const [userURL, setUserURL] = useState();
  const [hasAllowedFetching, setHasAllowedFetching] = useState(false);
  const [description, setDescription] = useState("");
  const [oldDescription, setOldDescription] = useState("");
  const [hasDescription, setHasDescription] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [bgColor, setBgColor] = useState("");
  const navigate = useNavigate();
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

  const handleChange = () => {
    const url_allow = `${process.env.REACT_APP_API_URL}/allow_fetching`;
    console.log(localStorage.getItem("user_id"));
    console.log(localStorage.getItem("user_spotify_token"));
    const params_allow = {
      user_id: localStorage.getItem("user_id"),
    };
    axios
      .post(url_allow, {}, { params: params_allow })
      .then((response) => {
        setHasAllowedFetching(response.data);
      })
      .catch((error) => console.log(error));
    console.log(hasAllowedFetching)
    if (!hasAllowedFetching) {
      console.log("here")
      const url = `${process.env.REACT_APP_API_URL}/saved_albums`;
      const params = {
        user_id: localStorage.getItem("user_id"),
      };
      axios.get(url, { params });
    }
  };
  const editDescription = () => {
    var x = document.getElementById("edit");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    setDescription(oldDescription);
  };
  const saveDescription = () => {
    const url_description = `${process.env.REACT_APP_API_URL}/description`;
    const params = {
      user_id: localStorage.getItem("user_id"),
      description: description,
    };
    axios
      .post(url_description, {}, { params: params })
      .then((response) => {
        setHasDescription(true);
      })
      .catch((error) => console.log(error));
    var x = document.getElementById("edit");
    x.style.display = "none";
  };

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      const loggedInUser = localStorage.getItem("user");
      const loggedInUserURL = localStorage.getItem("user_image_url");

      const userURL = `${process.env.REACT_APP_API_URL}/user_info`;
      const userId = localStorage.getItem("user_id");
      const params = {
        user_id: userId,
      };
      axios.get(userURL, { params }).then((response) => {
        setUser(response);
        setHasAllowedFetching(response.data.has_allowed_fetching);
        setDescription(response.data.description);
        setOldDescription(response.data.description);

        setUserURL(loggedInUserURL);
      });
      console.log(user);

      if (loggedInUser) {
      }
    }
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
      console.log(isMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="profile">
      <div className="overlay"></div>
      {isMobile ? (
        <div>
          <MobileHeader randomColor={bgColor} />
          <div className="search-box">
            <SearchDropdownWithImages />
          </div>
        </div>
      ) : (
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
              FCK ALGOS
            </h1>
          </div>
          <header className="App-header">
            <Header className="header-user" />
          </header>
        </div>
      )}
      {user ? (
        <div className="profile-wrapper">
          <div className="profile-settings">
            <div className="user-info">
              <img
                src={
                  user.data.image_url ||
                  "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                }
              />
              <div className="user-info-texts">
                <p className="user-name">{user.data.display_name}</p>
                <div className="user-info-stats">
                  <p>{user.data.following_count} following </p>
                  <p>{user.data.follower_count} followers </p>
                  <p>{user.data.albums_count} albums saved</p>
                </div>
              </div>
              <div className="sharing-wrapper">
                <div
                  style={{ backgroundColor: bgColor }}
                  onClick={handleChange}
                  onMouseOver={handleMouseOver}
                  className={`follow-button ${
                    hasAllowedFetching ? "stop-sharing" : "start-sharing"
                  }`}
                >
                  {hasAllowedFetching ? "stop sharing" : "start sharing"}
                </div>
                <div className="sharing-info">
                  When you enable sharing, fck algos will access your saved
                  Spotify albums and share them with other fck algos users. Your
                  collection will be available shortly after enabling this
                  feature, depending on its size.{" "}
                </div>
              </div>
            </div>
          </div>

          <UserCollection
            userId={localStorage.getItem("user_id")}
            randomColor={bgColor}
            name="followers"
          />
          <UserCollection
            userId={localStorage.getItem("user_id")}
            randomColor={bgColor}
            name="following"
          />
        </div>
      ) : (
        <p className="login"> Log in to access your profile settings </p>
      )}
    </div>
  );
}

export default Profile;
