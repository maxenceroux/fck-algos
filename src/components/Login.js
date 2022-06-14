import React from "react";

const CLIENT_ID = "b45b68c4c7a0421589605adf1e1a7626";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/login/success";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-library-read"];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

function Login({}) {
  const handleLogin = () => {
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=code&show_dialog=true`;
  };
  return (
    <div className="login">
      <button onClickCapture={handleLogin}> Login with Spotify</button>
    </div>
  );
}

export default Login;
