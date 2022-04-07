import React from "react";

function GenreFilters({ filters, filtersSelection }) {


    return (
        <div className="filters">
            {filters.map((value) => {
                return (
                    <div className="styles-card">

                        <button key={value} onClick={() => filtersSelection(value)}>{value}</button>
                    </div>
                );
            })}

        </div>

    );
}

export default GenreFilters;