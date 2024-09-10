import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import Album from "./components/Album";
import Genres from "./components/Genres";
import axios from "axios";
import Curators from "./components/Curators";
import Modal from "./components/modal/Modal";
import Sidebar from "./components/Sidebar";
import "./App.css";
import "./Mobile.css";

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
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [linearGradientButton, setLinearGradientButton] = useState([]);
  const [addedToCollection, setAddedToCollection] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const dropdownRef = useRef(null);
  const burgerMenuRef = useRef(null);

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
  const handleBurgerClick = () => {
    const overlay = document.querySelector(".overlay");
    const sidebarMenu = document.querySelector(".sidebar-mobile");
    setShowBurgerMenu(!showBurgerMenu);
    if (overlay.style.display === "block") {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
    sidebarMenu.classList.toggle("active");
  };
  const handleFilterClick = () => {
    const overlay = document.querySelector(".overlay");
    const filterMenu = document.querySelector(".sidebar");
    const filterIcon = document.querySelector("#filter-icon");

    console.log(curatorsFilter);
    console.log(filters);
    console.log(labelFilter);

    setShowFilterMenu((prevState) => !prevState);
    overlay.style.display = showFilterMenu ? "none" : "block"; // Toggle overlay visibility
    filterMenu.classList.toggle("active");
    // if (
    //   (curatorsFilter && curatorsFilter.length > 0) ||
    //   (filters && filters.length > 0) ||
    //   (labelFilter && labelFilter.length > 0)
    // ) {
    //   setShowFilterMenu((prevState) => !prevState);
    //   overlay.style.display = showFilterMenu ? "none" : "block"; // Toggle overlay visibility
    //   filterMenu.classList.toggle("active");
    // } else {
    //   filterIcon.classList.add("shake");
    //   setTimeout(() => {
    //     filterIcon.classList.remove("shake");
    //   }, 500);
    // }
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
      if (
        burgerMenuRef.current &&
        burgerMenuRef.current.classList.contains("active") &&
        !burgerMenuRef.current.contains(event.target)
      ) {
        handleBurgerClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [burgerMenuRef, handleBurgerClick]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      console.log(isMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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

  const toggleModal = () => {
    setModal((prev) => !prev);

    const overlay = document.querySelector(".overlay");
    const currentDisplay = window.getComputedStyle(overlay).display;

    if (currentDisplay === "block") {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
  };
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
      toggleModal(true);
    }
  };

  const handleSearchClick = () => {
    const searchBox = document.querySelector(".search-box");
    const overlay = document.querySelector(".overlay");
    console.log("here");
    searchBox.classList.add("mobile");
    if (overlay.style.display === "block") {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
  };

  useEffect(() => {
    const nextButton = document.querySelector("#next-button");
    const mainContent = document.querySelector("#buttons-mobile");
    const logoMain = document.querySelector("#logo-main");
    const mobileHeader = document.querySelector("#mobile-header");
    const plusSign = document.querySelector("#plus");
    const filterIcon = document.querySelector("#filter-icon");
    const searchIcon = document.querySelector("#search-icon");

    if (isMobile && nextButton && mainContent) {
      mainContent.appendChild(nextButton);
      mainContent.appendChild(plusSign);
      mobileHeader.appendChild(logoMain);
      mobileHeader.appendChild(searchIcon);
      mobileHeader.appendChild(filterIcon);
      filterIcon.addEventListener("click", handleFilterClick);
      searchIcon.addEventListener("click", handleSearchClick);

      // Cleanup to remove the event listener when component is unmounted
      return () => {
        filterIcon.removeEventListener("click", handleFilterClick);
        searchIcon.removeEventListener("click", handleSearchClick);
      };
    }
  }, [isMobile]);
  return (
    <div style={{ color: album.secondary_color }} className="App">
      <div class="overlay"></div>
      <div ref={burgerMenuRef} class="sidebar-mobile">
        <div className="links">
          <div className="link">about us</div>
          <div className="link">profile</div>
          <div className="link">log out</div>
        </div>
        <div className="close-button" onClick={handleBurgerClick}>
          x
        </div>
      </div>
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
          showFilterMenu={showFilterMenu}
          setShowFilterMenu={setShowFilterMenu}
          setIsMobile={setIsMobile}
          isMobile={isMobile}
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
            {isMobile ? (
              <div id="mobile-header" className="mobile-header">
                <div onClick={handleBurgerClick} className="burger-menu">
                  <div class="line"></div>
                  <div class="line"></div>
                  <div class="line"></div>
                </div>
                <img
                  onclick={handleFilterClick}
                  id="filter-icon"
                  src="/filter.png"
                ></img>
                <img id="search-icon" src="/search-icon.png"></img>
              </div>
            ) : (
              ""
            )}
            <div id="main-content" className="content">
              {modal && (
                <Modal
                  setOpenModal={toggleModal}
                  linearGradient={album.secondary_color}
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
              <div id="buttons-mobile">
                <div id="plus" className="plus">
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
