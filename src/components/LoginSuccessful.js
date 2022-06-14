import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const getReturnedParamsFromSpotifyAuth = (href) => {
  const code = href.split("code=")[1];
  console.log(code);

  return code;
};
function LoginSuccessful({}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href) {
      console.log("hsd");
      const code = getReturnedParamsFromSpotifyAuth(window.location.href);
      console.log(code);
      var qs = require("qs");
      const getToken = async () => {
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
        console.log(axiosConfig);
        const response = await axios(axiosConfig).catch(function (error) {
          console.log(error.response.data);
        });
        localStorage.setItem("user_spotify_token", response.data.access_token);
        localStorage.setItem("user_refresh_token", response.data.refresh_token);
      };
      getToken();
      const fetchProfileData = async () => {
        const profile_url = "http://localhost:8000/spotify_user_info";
        const params = {
          token: localStorage.getItem("user_spotify_token"),
        };
        const profile_data = await axios.get(profile_url, {
          params,
        });

        localStorage.setItem("user", profile_data.data.display_name);
        localStorage.setItem("user_id", profile_data.data.id);
        localStorage.setItem("user_image_url", profile_data.data.image_url);
      };
      if (localStorage.getItem("user_spotify_token")) {
        fetchProfileData();
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
