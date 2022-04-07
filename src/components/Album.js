import React from "react";

const Album = ({ album, albumEmbedUrl }) => {
    return (
        <div className="album">
            <div className="album-image">
                <img className="album-image" src={album.image_url} />
            </div>
            <div className="album-info">
                <div className="album-name">{album.name}</div>
                <div className="artist-name">{album.artist_name}</div>
            </div>

            <iframe src={albumEmbedUrl} width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
    );
};

export default Album;