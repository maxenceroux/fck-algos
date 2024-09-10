import React, { useState, useRef, useEffect } from "react";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";

function Curators({ curators, addCuratorFiltersSelection, albumColor }) {
  // State to control whether to show the additional curators
  const [showMore, setShowMore] = useState(false);

  // Split curators into two lists: first 4 and the rest
  const firstCurators = Object.keys(curators).slice(0, 4);
  const remainingCurators = Object.keys(curators).slice(4);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Function to toggle the visibility of the additional curators
  const toggleShowMore = () => {
    setShowMore((prev) => !prev);

    const overlay = document.querySelector(".overlay");

    if (overlay.style.display === "block") {
      overlay.style.display = "none";
    } else {
      overlay.style.display = "block";
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleShowMore(); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="curators">
      <p className="recommended-by">Recommended by:</p>
      <div className="curators-cards">
        {/* Display the first 4 curators */}
        {firstCurators.map((value) => (
          <div className="curators-card" key={curators[value]["display_name"]}>
            <Chip
              size="small"
              label={curators[value]["display_name"]}
              sx={{
                bgcolor: albumColor,
                color: "black",
                fontSize: "14px",
                marginRight: "10px",

                marginBottom: "10px",
                marginTop: "10px",
                fontFamily: "Cotham",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() =>
                addCuratorFiltersSelection(curators[value]["display_name"])
              }
            />
          </div>
        ))}

        {/* Conditional rendering for the "See more" button and additional curators */}
        {remainingCurators.length > 0 && (
          <>
            {/* Toggle button */}
            <div onClick={toggleShowMore} className="toggle-curators">
              {showMore ? "" : `and ${remainingCurators.length} others`}
            </div>

            {/* Display the remaining curators if "See more" is clicked */}
            {showMore && (
              <div className="all-curators">
                <div className="wrapper-close">
                  <span onClick={toggleShowMore} className="close-button">
                    x
                  </span>
                </div>
                <ul ref={dropdownRef} className="all-curators-list">
                  {Object.keys(curators).map((value) => (
                    <li key={value} className="curator-list-item">
                      <div className="curator-item">
                        <div
                          onClick={() =>
                            navigate(`/user/${curators[value]["id"]}`)
                          }
                          className="curator-infos"
                        >
                          <img
                            src={
                              curators[value].image_url
                                ? curators[value].image_url
                                : "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                            }
                          />
                          {curators[value].display_name}
                        </div>
                        <div
                          onClick={() =>
                            addCuratorFiltersSelection(
                              curators[value]["display_name"]
                            )
                          }
                          className="curator-filter"
                        >
                          add as filter
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Curators;
