import React, { useState, useEffect, useRef } from "react";

const SearchDropdownWithImages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const [hasFetchedUsers, setHasFetchedUsers] = useState(false); // Track if users are fetched
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const handleItemClick = (userId) => {
    window.location.href = `/user/${userId}`; // Navigate and reload
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUsers = () => {
    if (!hasFetchedUsers) {
      fetch(`${process.env.REACT_APP_API_URL}/users`)
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setUsers(result);
            setHasFetchedUsers(true); // Ensure it only fetches once
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  };

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm) {
      const results = users.filter((item) =>
        item.display_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData(users); // Show all users if searchTerm is empty
    }
  }, [searchTerm, users]);

  // Handle overlay visibility
  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    if (filteredData.length > 0) {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }
  }, [filteredData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredData([]); // Close the dropdown
        setSearchTerm("");
        const searchBox = document.querySelector(".search-box");
        searchBox.classList.remove("mobile");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      style={{
        width: "490px",
        display: "flex",
        position: "relative", // Needed for the absolute positioning of the dropdown
      }}
    >
      <input
        ref={inputRef}
        type="text"
        className="input-users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => {
          fetchUsers(); // Fetch users when clicking the input
          if (!searchTerm) {
            setFilteredData(users); // Show all users when clicking on the search input
          }
        }}
        placeholder="search users"
        style={{
          width: "100%",
          padding: "15px",
          border: "0px",
        }}
      />
      {filteredData.length > 0 && (
        <ul
          className="users-list"
          ref={dropdownRef} // Attach the ref to this element
          style={{
            listStyleType: "none",
            padding: 0,
            position: "absolute",
            marginTop: "60px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            maxHeight: "200px",
            width: "490px",
            overflowY: "auto", // Adds scrolling if needed
            zIndex: 1000, // Ensure the dropdown appears above other elements
          }}
        >
          {filteredData.map((item) => (
            <li
              className="users-item"
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleItemClick(item.id)} // Navigate on click
            >
              <img
                src={
                  item.image_url
                    ? item.image_url
                    : "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                }
                alt={item.display_name}
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "10px",
                  borderRadius: "50%",
                }}
              />
              <span>{item.display_name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdownWithImages;
