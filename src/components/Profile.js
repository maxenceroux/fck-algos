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
  const [hasAllowedFetching, setHasAllowedFetching] = useState(false);
  const handleChange = () => {
    const url_allow = "http://localhost:8000/allow_fetching";
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
    if (!hasAllowedFetching) {
      const url = "http://localhost:8000/saved_albums";
      const params = {
        token: localStorage.getItem("user_spotify_token"),
      };
      axios.get(url, { params });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user_spotify_token")) {
      const loggedInUser = localStorage.getItem("user");
      const loggedInUserURL = localStorage.getItem("user_image_url");

      const userURL = "http://localhost:8000/user_info";
      const userId = localStorage.getItem("user_id");
      const params = {
        user_id: userId,
      };
      axios.get(userURL, { params }).then((response) => {
        setUser(response);
        setHasAllowedFetching(response.data.has_allowed_fetching);

        setUserURL(loggedInUserURL);
      });
      console.log(user);
      if (loggedInUser) {
      }
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
            <p>{user.data.display_name}</p>
            <p>{user.data.follower_count} followers</p>
            <p>{user.data.following_count} following</p>

            <FormGroup>
              {user ? (
                <FormControlLabel
                  control={
                    <Switch
                      name="album_data"
                      onChange={handleChange}
                      checked={hasAllowedFetching}
                    />
                  }
                  label="Allow AlgoRhythms to store and expose your Spotify Library?"
                />
              ) : (
                <p />
              )}
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
