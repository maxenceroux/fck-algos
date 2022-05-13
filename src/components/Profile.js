import React from "react";
import Header from "./Header";
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
function Profile({}) {
  const [user, setUser] = useState();
  const [userURL, setUserURL] = useState();
  const handleChange = () => {
    const url = "http://localhost:8000/saved_albums";
    const params = {
      token: localStorage.getItem("user_spotify_token"),
    };
    axios.get(url, { params });
    console.log("kikou");
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const loggedInUserURL = localStorage.getItem("user_image_url");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
      setUserURL(loggedInUserURL);
    }
  }, []);

  return (
    <div className="profile">
      <header className="App-header">
        <Header />
      </header>
      <div className="profile-settings">
        {userURL ? (
          <div>
            <img src={userURL} />
            <FormGroup>
              <FormControlLabel
                control={<Switch name="album_data" onChange={handleChange} />}
                label="Allow AlgoRhythms to store and expose your Spotify Library?"
              />
            </FormGroup>
          </div>
        ) : (
          <p> Log in to access your profile settings </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
