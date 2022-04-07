import React from "react";
import GenreFilters from "./GenreFilters";
import CuratorFilters from "./CuratorFilters";

function Filters({ filters, filtersSelection, curatorFilters, curatorFiltersSelection }) {


    return (
        <div className="filters">
            <GenreFilters filters={filters} filtersSelection={filtersSelection} />
            <CuratorFilters curatorFilters={curatorFilters} curatorFiltersSelection={curatorFiltersSelection} />

        </div>

    );
}

export default Filters;