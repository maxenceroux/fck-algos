import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
function Followers({}) {
  const [followers, setFollowers] = useState();
  const handleChange = (event, user) => {
    const url = "http://localhost:8000/follow";
    const params = {
      follower_id: localStorage.getItem("user_id"),
      following_id: user.id,
    };
    console.log(params);
    axios
      .post(url, {}, { params: params })
      .catch((error) => console.log(error));
    window.location.reload();
  };
  useEffect(() => {
    const url = "http://localhost:8000/followers";
    const userId = localStorage.getItem("user_id");
    const params = { following_id: userId };
    if (!followers) {
      axios.get(url, { params }).then((response) => {
        setFollowers(response.data);
      });
    }
  });
  return (
    <div className="follow">
      <div className="follow-menu">
        <Link to="/followers">Followers</Link>
        <Link to="/following">Following</Link>
      </div>
      {followers ? (
        <div className="followers">
          {" "}
          {followers.map((user) => (
            <div className="user">
              <p>{user.display_name}</p>
              <img src={user.image_url} width="100" height="100" />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name="friends"
                      onChange={(event) => handleChange(event, user)}
                      checked={user.following}
                    />
                  }
                  label="Follow?"
                />
              </FormGroup>
            </div>
          ))}
        </div>
      ) : (
        <p />
      )}
    </div>
  );
}

export default Followers;
