import React from "react";
import GenreFilters from "./GenreFilters";
import CuratorFilters from "./CuratorFilters";
import LabelFilter from "./LabelFilter";
function Filters({
  filters,
  addGenreFiltersSelection,
  removeGenreFiltersSelection,
  curatorFilters,
  addCuratorFiltersSelection,
  removeCuratorFiltersSelection,
  labelFilter,
  addLabelFilterSelection,
  removeLabelFilterSelection,
  albumPrimaryColor,
  albumSecondaryColor,
}) {
  return (
    <div className="filters-box">
      {filters && filters.length ? (
        <p className="filter-wrapper">styles</p>
      ) : (
        ""
      )}
      <GenreFilters
        filters={filters}
        addGenreFiltersSelection={addGenreFiltersSelection}
        removeGenreFiltersSelection={removeGenreFiltersSelection}
        albumColor={albumPrimaryColor}
      />
      {labelFilter !== "" ? <p className="filter-wrapper">label</p> : ""}
      {labelFilter !== "" ? (
        <LabelFilter
          labelFilter={labelFilter}
          addLabelFilterSelection={addLabelFilterSelection}
          removeLabelFilterSelection={removeLabelFilterSelection}
          albumColor={albumPrimaryColor}
        />
      ) : (
        ""
      )}
      {curatorFilters && curatorFilters.length ? (
        <p className="filter-wrapper recommended">recommended by</p>
      ) : (
        ""
      )}
      <CuratorFilters
        curatorFilters={curatorFilters}
        addCuratorFiltersSelection={addCuratorFiltersSelection}
        removeCuratorFiltersSelection={removeCuratorFiltersSelection}
        albumColor={albumPrimaryColor}
      />
    </div>
  );
}

export default Filters;
