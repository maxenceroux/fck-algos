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
  albumColor,
}) {
  return (
    <div className="filters-box">
      {filters && filters.length ? (
        <p className="filter-wrapper">Styles</p>
      ) : (
        ""
      )}
      <GenreFilters
        filters={filters}
        addGenreFiltersSelection={addGenreFiltersSelection}
        removeGenreFiltersSelection={removeGenreFiltersSelection}
        albumColor={albumColor}
      />
      {curatorFilters && curatorFilters.length ? (
        <p className="filter-wrapper">Curators</p>
      ) : (
        ""
      )}
      <CuratorFilters
        curatorFilters={curatorFilters}
        addCuratorFiltersSelection={addCuratorFiltersSelection}
        removeCuratorFiltersSelection={removeCuratorFiltersSelection}
        albumColor={albumColor}
      />
      {labelFilter !== "" ? <p className="filter-wrapper">Label</p> : ""}
      {labelFilter !== "" ? (
        <LabelFilter
          labelFilter={labelFilter}
          addLabelFilterSelection={addLabelFilterSelection}
          removeLabelFilterSelection={removeLabelFilterSelection}
          albumColor={albumColor}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Filters;
