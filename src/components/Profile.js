import React from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
function Profile({}) {
  const location = useLocation();
  const from = location.state;

  return (
    <div className="profile">
      <header className="App-header">
        <Header />
      </header>
      <div>Profile</div>
      <div>
        {/* {from.data.display_name ? <p>{from.data.display_name} </p> : <p />} */}
        Profile2
      </div>
    </div>
  );
}

export default Profile;
