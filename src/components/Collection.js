import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Collection({ userId, randomColor }) {
  const [albums, setAlbums] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false); // New state to toggle dropdown
  const dropdownRef = useRef(null);
  const observer = useRef();

  const location = useLocation();
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
  const getSortOrderFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("sortOrder") || "random"; // Default sort order is "random"
  };

  const [sortOrder, setSortOrder] = useState(getSortOrderFromUrl());
  // Function to fetch albums
  const fetchAlbums = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/albums`, {
        params: {
          user_id: userId,
          offset,
          limit: 50,
          sort: sortOrder,
        },
      });
      if (data.length < 50) {
        setHasMore(false); // No more albums to load
      }
      setAlbums((prevAlbums) => [...prevAlbums, ...data]);
      setOffset((prevOffset) => prevOffset + 50); // Increment the offset for next fetch
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId, offset, hasMore, loading]);

  // Load albums when the component mounts
  useEffect(() => {
    if (userId) {
      fetchAlbums();
    }
  }, [userId, fetchAlbums]);

  const lastAlbumElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log("intersecting");
            fetchAlbums();
          }
        },
        { threshold: 1, rootMargin: "300px" } // Adjust this to your needs
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, fetchAlbums]
  );

  const handleAlbumClick = (url) => {
    const concatenatedUrl = `https://open.spotify.com/album/${url}`; // Concatenate album name as a query parameter

    window.open(concatenatedUrl, "_blank"); // Opens the URL in a new tab
  };
  const handleSortChange = (sortValue) => {
    setSortOrder(sortValue);
    setShowDropdown(false);
    window.location.href = `/user/${userId}?sortOrder=${sortValue}`;
  };
  return (
    <div className="collection">
      <div className="albums-filter">
        <div className="sorting">
          <p
            style={{ color: randomColor }}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {sortOrder} ↓
          </p>
          {showDropdown && (
            <ul ref={dropdownRef} className="dropdown-sort">
              <li onClick={() => handleSortChange("alphabetical")}>
                alphabetical
              </li>
              <li onClick={() => handleSortChange("added_to_collection")}>
                added to collection
              </li>
              <li onClick={() => handleSortChange("color")}>color-ish</li>
              <li onClick={() => handleSortChange("random")}>random</li>
              <li onClick={() => handleSortChange("release_date")}>
                release date
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="albums">
        {albums.map((album, index) => {
          if (index === albums.length - 1) {
            // Attach ref to the last album element to trigger infinite scroll
            return (
              <div
                ref={lastAlbumElementRef}
                key={index}
                className="album-item"
                onClick={() => handleAlbumClick(album.spotify_id)}
              >
                <img src={album.image_url} alt={album.name} />
                <p>{album.name}</p>
                <p>{album.artist_name}</p>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="album-item"
                onClick={() => handleAlbumClick(album.spotify_id)}
              >
                <img src={album.image_url} alt={album.name} />
                <div className="album-item-text">
                  <p className="collection-album-name">{album.name}</p>
                  <p className="collection-artist-name">{album.artist_name}</p>
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

export default Collection;
