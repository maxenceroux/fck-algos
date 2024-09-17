import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserCollection({ userId, randomColor, name }) {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false); // New state to toggle dropdown
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Function to fetch albums
  const fetchUsers = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/${name}`,
        {
          params: {
            user_id: userId,
          },
        }
      );

      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Load albums when the component mounts
  useEffect(() => {
    if (userId) {
      fetchUsers();
    }
  }, [userId, fetchUsers]);

  const handleAlbumClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="collection">
      <div className="albums-filter">
        <div className="sorting">
          <p style={{ color: randomColor }}>{name}</p>
        </div>
      </div>
      <div className="albums">
        {users.map((album, index) => {
          if (index === users.length - 1) {
            // Attach ref to the last album element to trigger infinite scroll
            return (
              <div
                key={index}
                className="album-item"
                onClick={() => handleAlbumClick(album.id)}
              >
                <img
                  src={
                    album.image_url
                      ? album.image_url
                      : "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                  }
                  alt={album.name}
                />

                <div className="album-item-text">
                  <p className="collection-album-name">{album.display_name}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="album-item"
                onClick={() => handleAlbumClick(album.id)}
              >
                <img
                  src={
                    album.image_url
                      ? album.image_url
                      : "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                  }
                  alt={album.name}
                />

                <div className="album-item-text">
                  <p className="collection-album-name">{album.display_name}</p>
                </div>
              </div>
            );
          }
        })}
        {loading && <p>Loading more albums...</p>}
      </div>
    </div>
  );
}

export default UserCollection;
