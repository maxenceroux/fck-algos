import React from "react";
import Header from "./Header";
import { useEffect, useState } from "react";
function Profile({}) {
  const [user, setUser] = useState();
  const [userURL, setUserURL] = useState();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const loggedInUserURL = localStorage.getItem("user_image_url");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
      setUserURL(loggedInUserURL);
    }
    console.log(loggedInUserURL);
  }, []);

  return (
    <div className="profile">
      <header className="App-header">
        <Header />
      </header>
      <div>Profile</div>
      <div>
        {user ? <p>{user} </p> : <p> no </p>}
        Profile2
      </div>
      <div>{userURL ? <img src={userURL} /> : <p> no </p>}</div>
    </div>
  );
}

export default Profile;
