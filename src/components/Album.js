import React from "react";
import { ReactComponent as Vinyl } from "../vinyl.svg";
const Album = ({ album, addLabelFilterSelection, addYearFilterSelection }) => {
  return (
    <div className="album">
      <div className="album-image-wrapper">
        <img alt={album.name} className="album-image" src={album.image_url} />
      </div>
      <div className="album-info">
        <div className="album-name">{album.name}</div>
        <div className="artist-name">{album.artist_name}</div>
        <div className="label-year">
          <div
            onClick={() => addLabelFilterSelection(album.label)}
            className="label"
          >
            <svg className="vinyl" fill={album.primary_color}>
              <Vinyl fill={album.primary_color} />
            </svg>
            <a>{album.label}</a>
          </div>
          -
          <div
            onClick={() => addYearFilterSelection(album.release_date_year)}
            className="year"
          >
            {album.release_date_year}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
