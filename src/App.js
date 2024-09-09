import { useEffect, useState, useRef } from "react";
import Album from "./components/Album";
import Genres from "./components/Genres";
import axios from "axios";
import Curators from "./components/Curators";
import Modal from "./components/modal/Modal";
import Sidebar from "./components/Sidebar";
import "./App.css";

import Header from "./components/Header";

function App() {
  const [album, setAlbum] = useState([]);

  const [styles, setStyles] = useState([]);
  const [friendEmail, setFriendEmail] = useState("");
  const [friendName, setFriendName] = useState("");
  const [modal, setModal] = useState(false);
  const [filters, setFilters] = useState([]);
  const [curators, setCurators] = useState([]);
  const [curatorsFilter, setCuratorsFilters] = useState([]);
  const [labelFilter, setLabelFilter] = useState("");
  const [albumEmbedUrl, setAlbumEmbedUrl] = useState([]);
  const [linearGradient, setLinearGradient] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showShareInput, setShowShareInput] = useState(false);
  const [linearGradientButton, setLinearGradientButton] = useState([]);
  const [addedToCollection, setAddedToCollection] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const addLabelFilter = (newLabelFilter) => {
    if (typeof labelFilter === "undefined") {
      setLabelFilter(newLabelFilter);
    }
    if (typeof labelFilter !== "undefined") {
      setLabelFilter(newLabelFilter);
    }
  };
  const removeLabelFilter = (newLabelFilter) => {
    setLabelFilter("");
  };
  const addGenreFilters = (newFilter) => {
    if (!filters.includes(newFilter)) {
      setFilters((filters) => [...filters, newFilter]);
    }
  };
  const removeGenreFilters = (newFilter) => {
    if (filters.includes(newFilter)) {
      var array = [...filters];
      var index = array.indexOf(newFilter);
      if (index !== -1) {
        array.splice(index, 1);
        setFilters(array);
      }
    }
  };
  const addCuratorFilters = (newCuratorFilter) => {
    if (!curatorsFilter.includes(newCuratorFilter)) {
      setCuratorsFilters((curatorsFilter) => [
        ...curatorsFilter,
        newCuratorFilter,
      ]);
    }
  };
  const removeCuratorFilters = (newCuratorFilter) => {
    if (curatorsFilter.includes(newCuratorFilter)) {
      var array = [...curatorsFilter];
      var index = array.indexOf(newCuratorFilter);
      if (index !== -1) {
        array.splice(index, 1);
        setCuratorsFilters(array);
      }
    }
  };
  const handleShare = async () => {
    try {
      const data = {
        recipient_email: friendEmail,
        recipient_name: friendName,
        user_id: localStorage.getItem("user_id"),
        album_image_url: album.image_url,
        album_name: album.name,
        artist_name: album.artist_name,
        album_url: `https://open.spotify.com/album/${album.spotify_id}`,
      };
      console.log(data);
      const response = await axios.post(
        "http://localhost:8000/album_rec",
        data
      );

      console.log("Album recommendation sent:", response.data);
      setShowShareInput(false);
      setFriendEmail("");
      setFriendName("");
    } catch (error) {
      console.error("Error sharing album:", error);
      setShowShareInput(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowShareInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);
  useEffect(() => {
    const fetchData = async () => {
      const album_url = "http://localhost:8000/random_album";
      var userID = -1;
      if (localStorage.getItem("user_id")) {
        userID = localStorage.getItem("user_id");
      }

      const params = {
        user_id: userID,
      };
      const album_data = await axios.get(album_url, {
        params,
      });
      setAlbum(album_data.data);
      const album_embed_url =
        "https://open.spotify.com/embed/album/" +
        album_data.data.spotify_id +
        "?utm_source=generator&theme=0";
      setAlbumEmbedUrl(album_embed_url);
      setAlbum(album_data.data);
      console.log(album_data.data);
      const style_url =
        "http://localhost:8000/album_style_genre?album_id=" +
        album_data.data.id;
      const style_data = await axios.get(style_url);
      setStyles(style_data.data["style"]);
      const curator_url =
        "http://localhost:8000/album_curators?album_id=" + album_data.data.id;
      const curator_data = await axios.get(curator_url);
      setCurators(curator_data.data);
      const linGrad =
        "linear-gradient(" +
        album_data.data.primary_color +
        "," +
        album_data.data.secondary_color +
        " 40%)";
      const linGradBut =
        "linear-gradient(" +
        album_data.data.secondary_color +
        "," +
        album_data.data.primary_color +
        " 40%)";

      setLinearGradient(linGrad);
      setLinearGradientButton(linGradBut);
      console.log(album.primary_color);
      console.log(album.secondary_color);
    };
    fetchData();
  }, []);

  const handleShareToFriends = () => {
    setShowShareInput(true);
    console.log(showShareInput);
  };
  const handleSaveToCollection = async () => {
    const url = "http://localhost:8000/album";
    const userId = localStorage.getItem("user_id");

    if (album.id && userId) {
      try {
        // Use query parameters directly in the URL
        await axios.put(url, null, {
          params: { album_id: album.spotify_id, user_id: userId },
        });
        console.log("Album saved to collection");
        setAddedToCollection(true);
      } catch (error) {
        console.error("Error saving album to collection:", error);
      }
    }
  };
  const handleClick = async () => {
    var userID = -1;
    if (localStorage.getItem("user_id")) {
      userID = localStorage.getItem("user_id");
    }

    const params = {
      styles: filters.join(","),
      curator: curatorsFilter.join(","),
      label: labelFilter,
      current_album_id: album.id,
      user_id: userID,
    };
    const album_data = await axios.get("http://localhost:8000/random_album", {
      params,
    });
    if (album_data.data) {
      setAlbum(album_data.data);
      setAddedToCollection(false);
      console.log(album_data);
      const album_embed_url =
        "https://open.spotify.com/embed/album/" +
        album_data.data.spotify_id +
        "?utm_source=generator&theme=0";
      setAlbumEmbedUrl(album_embed_url);
      const style_url =
        "http://localhost:8000/album_style_genre?album_id=" +
        album_data.data.id;
      const style_data = await axios.get(style_url);
      setStyles(style_data.data["style"]);
      const curator_url =
        "http://localhost:8000/album_curators?album_id=" + album_data.data.id;
      const curator_data = await axios.get(curator_url);
      setCurators(curator_data.data);

      const linGrad =
        "linear-gradient(" +
        album_data.data.primary_color +
        "," +
        album_data.data.secondary_color +
        " 40%)";
      const linGradBut =
        "linear-gradient(" +
        album_data.data.secondary_color +
        "," +
        album_data.data.primary_color +
        " 40%)";
      setLinearGradient(linGrad);
      setLinearGradientButton(linGradBut);
    } else {
      setModal(true);
    }
  };

  return (
    <div style={{ color: album.secondary_color }} className="App">
      <div className="page">
        <Sidebar
          filters={filters}
          addGenreFiltersSelection={addGenreFilters}
          removeGenreFiltersSelection={removeGenreFilters}
          curatorFilters={curatorsFilter}
          addCuratorFiltersSelection={addCuratorFilters}
          removeCuratorFiltersSelection={removeCuratorFilters}
          labelFilter={labelFilter}
          addLabelFilterSelection={addLabelFilter}
          removeLabelFilterSelection={removeLabelFilter}
          clickBehavior={handleClick}
          albumPrimaryColor={album.primary_color}
          albumSecondaryColor={album.secondary_color}
          albumEmbedUrl={albumEmbedUrl}
          linearGradient={linearGradientButton}
        />
        <div className="result-page-wrapper">
          <div
            className="result-page"
            style={{
              backgroundImage: linearGradient,
            }}
          >
            <header className="App-header">
              <Header />
            </header>

            <div className="content">
              {modal && (
                <Modal
                  setOpenModal={setModal}
                  linearGradient={linearGradientButton}
                />
              )}
              <div className="bgd" />
              <Album album={album} addLabelFilterSelection={addLabelFilter} />
              <Genres
                styles={styles}
                addGenreFiltersSelection={addGenreFilters}
                albumColor={album.primary_color}
              />
              <Curators
                curators={curators}
                addCuratorFiltersSelection={addCuratorFilters}
                albumColor={album.primary_color}
              />
              <div className="plus">
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="sign"
                >
                  {showDropdown && (
                    <ul ref={dropdownRef} className="dropdown-sort">
                      <li onClick={handleSaveToCollection}>
                        {!addedToCollection
                          ? "add to collection"
                          : "added to collection"}
                      </li>
                      <li onClick={handleShareToFriends}>share to friends</li>
                    </ul>
                  )}
                  +
                </div>
              </div>
              {showShareInput && (
                <div className="share-wrapper" ref={inputRef}>
                  <input
                    id="share-email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    placeholder="friend's email"
                    type="text"
                  />
                  <input
                    id="share-name"
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    placeholder="friend's cute name"
                    type="text"
                  />
                  <div onClick={handleShare} className="share-button">
                    <p>share</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
