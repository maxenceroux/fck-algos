import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const getReturnedParamsFromSpotifyAuth = (href) => {
  const code = href.split("code=")[1];

  return code;
};
function LoginSuccessful({}) {
  const [hasToken, setHasToken] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href) {
      const code = getReturnedParamsFromSpotifyAuth(window.location.href);

      var qs = require("qs");
      const getToken = () => {
        const url = "https://accounts.spotify.com/api/token";
        const data = qs.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: "http://localhost:3000/login/success",
        });
        const axiosConfig = {
          method: "post",
          url: url,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic YjQ1YjY4YzRjN2EwNDIxNTg5NjA1YWRmMWUxYTc2MjY6OWY2MjkzNzQ5NjBhNDVhYTgyNjhlYWIzYTlkYmUxOGI",
          },
          data: data,
        };

        axios(axiosConfig)
          .then((response) => {
            localStorage.setItem(
              "user_spotify_token",
              response.data.access_token
            );
            localStorage.setItem(
              "user_refresh_token",
              response.data.refresh_token
            );

            setHasToken(true);
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      };
      if (!hasToken) {
        getToken();
      }
      const fetchProfileData = () => {
        const profile_url = "http://localhost:8000/spotify_user_info";
        const params = {
          token: localStorage.getItem("user_spotify_token"),
        };
        axios
          .get(profile_url, {
            params,
          })
          .then((response) => {
            localStorage.setItem("user", response.data.display_name);
            localStorage.setItem("user_id", response.data.id);
            localStorage.setItem("user_image_url", response.data.image_url);
            setHasProfile(true);
          })
          .catch(function (error) {
            console.log(error.response.data);
          });
      };
      if (hasToken && !hasProfile) {
        fetchProfileData();
      }
      const updateToken = () => {
        const url = "http://localhost:8000/user_spotify_token";
        const data = {
          user_id: localStorage.getItem("user_id"),
          token: localStorage.getItem("user_spotify_token"),
          refresh_token: localStorage.getItem("user_refresh_token"),
        };
        console.log(data);
        axios.post(url, {}, { params: data }).catch(function (error) {
          console.log(error.response.data);
        });
        setHasUpdate(true);
      };
      if (hasProfile && !hasUpdate) {
        updateToken();
      }
    }
  });

  return (
    <div className="login-success">
      success
      <button onClick={() => navigate(localStorage.getItem("location"))}>
        {" "}
        back
      </button>
    </div>
  );
}

export default LoginSuccessful;
