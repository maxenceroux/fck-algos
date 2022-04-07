
import React from "react";

function CuratorFilters({ curatorFilters, curatorFiltersSelection }) {


    return (
        <div className="curators-filters">

            {curatorFilters.map((value) => {
                return (
                    <div className="curators-filter-card">

                        <button key={value} onClick={() => curatorFiltersSelection(value)}>{value}</button>
                    </div>
                );
            })}

        </div>

    );
}

export default CuratorFilters;