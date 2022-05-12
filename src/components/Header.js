import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useEffect } from "react";

const CLIENT_ID = "b45b68c4c7a0421589605adf1e1a7626"; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/profile";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};
function Header() {
  const [accessToken, setAccessToken] = useState();
  const [tokenType, setTokenType] = useState([]);
  const [expiresIn, setExpiresIn] = useState([]);
  const [profile, setProfile] = useState();
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      setAccessToken(access_token);
      setTokenType(token_type);
      setExpiresIn(expires_in);
    }
    if (!localStorage.getItem("user")) {
      const fetchProfileData = async () => {
        const profile_url = "https://api.spotify.com/v1/me";
        const bearerToken = "Bearer " + accessToken;
        const headers = {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        };
        const profile_data = await axios.get(profile_url, {
          headers: headers,
        });
        setProfile(profile_data);
        console.log(profile_data);
        localStorage.setItem("user", profile_data.data.display_name);
        localStorage.setItem("user_image_url", profile_data.data.images[0].url);
      };
      fetchProfileData();
    }
  });

  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  };
  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="navigation">
          <nav>
            <Link to="/">Home</Link> | <Link to="/profile">Profile</Link>
          </nav>
        </div>
        <div className="login">
          {" "}
          {localStorage.getItem("user") ? (
            <button onClick={handleLogout}> Logout</button>
          ) : (
            <button onClickCapture={handleLogin}> Login</button>
          )}
        </div>
        <div>{profile ? <p>{profile.data.display_name}</p> : <p />}</div>
        <div className="about-us">
          <a>About us</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
