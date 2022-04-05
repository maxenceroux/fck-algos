import React from "react";


const Album = ({ album }) => {
    return (
        <div className="album">
            <img src={album.image_url} />
            <div>{album.name}</div>
            <div>{album.artist_name}</div>
            <div>{album.id}</div>
        </div>
    );
};

export default Album;