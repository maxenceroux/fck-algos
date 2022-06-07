import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Following({}) {
  const [following, setFollowing] = useState();
  useEffect(() => {
    const url = "http://localhost:8000/following";
    const userId = localStorage.getItem("user_id");
    const params = { follower_id: userId };
    if (!following) {
      axios.get(url, { params }).then((response) => {
        console.log(response);
        setFollowing(response.data);
      });
    }
  });
  return (
    <div className="follow">
      <div className="follow-menu">
        <Link to="/followers">Followers</Link>
        <Link to="/following">Following</Link>
      </div>
      {following ? (
        <div className="following">
          {" "}
          {following.map((user) => (
            <div className="user">
              <p>{user.display_name}</p>
              <img src={user.image_url} width="100" height="100" />
            </div>
          ))}
        </div>
      ) : (
        <p />
      )}
    </div>
  );
}

export default Following;
