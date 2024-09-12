import React, { useState, useEffect, useRef } from "react";

const SearchDropdownWithImages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const handleItemClick = (userId) => {
    window.location.href = `/user/${userId}`; // Navigate and reload
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
  useEffect(() => {
    const overlay = document.querySelector(".overlay");
    if (searchTerm) {
      overlay.style.display = "block";

      const results = users.filter((item) =>
        item.display_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(results);
    } else {
      overlay.style.display = "none";
      setFilteredData([]);
    }
  }, [searchTerm, users]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setFilteredData([]); // Close the dropdown
        setSearchTerm("");
        const searchBox = document.querySelector(".search-box");
        const overlay = document.querySelector(".overlay");
        searchBox.classList.remove("mobile");
        if (isMobile) {
          if (overlay.style.display === "block") {
            overlay.style.display = "none";
          } else {
            overlay.style.display = "block";
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const searchBox = document.querySelector(".search-box");
      if (searchBox.classList.contains("mobile")) {
        if (
          inputRef.current &&
          !inputRef.current.contains(event.target) &&
          isMobile
        ) {
          setFilteredData([]); // Close the dropdown
          setSearchTerm("");
          const searchBox = document.querySelector(".search-box");
          const overlay = document.querySelector(".overlay");
          searchBox.classList.remove("mobile");
          if (isMobile) {
            if (overlay.style.display === "block") {
              overlay.style.display = "none";
            } else {
              overlay.style.display = "block";
            }
          }
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div
      style={{
        width: "490px",

        display: "flex",
      }}
    >
      <input
        ref={inputRef}
        type="text"
        className="input-users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
            // borderRadius: "10px",

            border: "1px",
            maxHeight: "200px",
            width: "490px",
            overflowY: "auto", // Adds scrolling if needed
            zIndex: 1000000, // Ensure the dropdown appears above other elements
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
                height: "30px",
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
                  borderRadius: "100px",
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
