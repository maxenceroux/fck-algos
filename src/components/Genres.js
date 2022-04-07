import React from "react";
import Chip from '@mui/material/Chip';

function Genres({ styles, filters, albumColor }) {

    return (
        <div className="genres">
            {Object.keys(styles).map((value) => {
                return (
                    <div className="styles-card">
                        <Chip
                            key={styles[value]["style"]}
                            size="small"
                            label={styles[value]["style"]}
                            sx={{ bgcolor: albumColor, color: 'black', fontSize: "14px", fontFamily: "Sanchez-Regular" }}
                            onClick={() => filters(styles[value]["style"])}
                            onDelete={() => filters(styles[value]["style"])}
                        />
                    </div>
                );
            })}

        </div>

    );
}

export default Genres;