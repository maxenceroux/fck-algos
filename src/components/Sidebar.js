import React from "react";
import Filters from "./Filters";

function Sidebar({ filters, filtersSelection, curatorFilters, curatorFiltersSelection, clickBehavior, albumColor }) {



    return (
        <div >
            <Filters filters={filters} filtersSelection={filtersSelection} curatorFilters={curatorFilters} curatorFiltersSelection={curatorFiltersSelection} />
            <div className="button">
                <button style={{ background: albumColor }} className="button" onClick={clickBehavior}>Next</button>
            </div>
            <div>
                <a style={{ color: albumColor }}>About us</a>
            </div>
        </div >

    );
}

export default Sidebar;