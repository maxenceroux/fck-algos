import React from "react";

function Filters({ filters }) {


    return (
        <div className="filters">
            {filters.map((index) => (
                <p> {index} </p>
            ))}
        </div>

    );
}

export default Filters;