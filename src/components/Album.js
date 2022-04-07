import React from "react";

const Album = ({ album }) => {
  return (
    <div className="album">
      <div className="album-image-wrapper">
        <img alt={album.name} className="album-image" src={album.image_url} />
      </div>
      <div className="album-info">
        <div className="album-name">{album.name}</div>
        <div className="artist-name">{album.artist_name}</div>
      </div>
    </div>
  );
};

export default Album;
