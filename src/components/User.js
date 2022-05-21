import React from "react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Header from "./Header";
function User({}) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();
  const handleChange = () => {
    if (!localStorage.getItem("user_id")) {
      navigate("/login");
    }
    const url = "http://localhost:8000/follow";
    const params = {
      follower_id: localStorage.getItem("user_id"),
      following_id: user.id,
    };
    axios
      .post(url, {}, { params: params })
      .then((response) => {
        setIsFollowing(response.data.is_following);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    const fetchUser = async () => {
      const params = { user_id: id };
      try {
        const { data } = await axios.get(`http://localhost:8000/user_info`, {
          params,
        });
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    const fetchFollow = async () => {
      const url = "http://localhost:8000/follow";
      const params = {
        follower_id: localStorage.getItem("user_id"),
        following_id: user.id,
      };
      console.log(params);
      axios.get(url, { params }).then((response) => {
        setIsFollowing(response.data);
      });
    };
    if (user.id && localStorage.getItem("user_spotify_token")) {
      fetchFollow();
    }
  });
  return (
    <div className="user">
      <header className="App-header">
        <Header />
      </header>
      <p>hello {user.display_name}</p>
      <img src={user.image_url} />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              name="friends"
              onChange={handleChange}
              checked={isFollowing}
            />
          }
          label="Follow?"
        />
      </FormGroup>
    </div>
  );
}

export default User;
