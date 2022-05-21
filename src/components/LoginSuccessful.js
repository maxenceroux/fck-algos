import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
