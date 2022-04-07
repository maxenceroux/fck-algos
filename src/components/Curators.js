import React from "react";

function Curators({ curators, curatorFilters }) {


    return (
        <div className="curators">
            <h3>Curators</h3>
            {Object.keys(curators).map((value) => {
                return (
                    <div className="curators-card">
                        <button key={curators[value]["display_name"]} onClick={() => curatorFilters(curators[value]["display_name"])}>{curators[value]["display_name"]}</button>
                    </div>
                );
            })}

        </div>

    );
}

export default Curators;