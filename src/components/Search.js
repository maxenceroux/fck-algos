import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
function Search({}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  return (
    <div className="search">
      <div className="search-wrapper">
        <Autocomplete
          id="users"
          options={users}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for users"
              variant="outlined"
            />
          )}
          getOptionLabel={(option) => option.display_name}
          style={{ width: 750, color: "#fff" }}
          value={selectedUser}
          onChange={(_event, newUser) => {
            console.log(newUser);
            navigate(`/user/${newUser.id}`);
            window.location.reload();

            setSelectedUser(newUser);
          }}
        />
      </div>
    </div>
  );
}

export default Search;
