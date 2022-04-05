import React from "react";

function Genres({ genres, styles, filters }) {


    return (
        <div className="genres">
            {Object.keys(styles).map((value) => {
                return (
                    <div className="styles-card">
                        <button key={styles[value]["style"]} onClick={() => filters(styles[value]["style"])}>{styles[value]["style"]}</button>
                    </div>
                );
            })}

        </div>

    );
}

export default Genres;