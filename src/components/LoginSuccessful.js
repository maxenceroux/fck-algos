import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
function LoginSuccessful({}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.hash) {
      const { access_token } = getReturnedParamsFromSpotifyAuth(
        window.location.hash
      );

      localStorage.setItem("user_spotify_token", access_token);
      const fetchProfileData = async () => {
        const profile_url = "http://localhost:8000/spotify_user_info";
        const params = {
          token: access_token,
        };
        const profile_data = await axios.get(profile_url, {
          params,
        });

        localStorage.setItem("user", profile_data.data.display_name);
        localStorage.setItem("user_id", profile_data.data.id);
        localStorage.setItem("user_image_url", profile_data.data.image_url);
      };
      fetchProfileData();
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
