import React from "react";
import Chip from "@mui/material/Chip";

function LabelFilter({
  labelFilter,
  addLabelFilterSelection,
  removeLabelFilterSelection,
  albumColor,
}) {
  return (
    <div className="filters">
      <div className="label-filter-card">
        <Chip
          key={labelFilter}
          size="small"
          label={labelFilter}
          sx={{
            bgcolor: albumColor,
            color: "black",
            fontSize: "14px",
            marginRight: "10px",
            marginBottom: "10px",
            fontFamily: "Cotham",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          onClick={() => addLabelFilterSelection(labelFilter)}
          onDelete={() => removeLabelFilterSelection(labelFilter)}
        />
      </div>
    </div>
  );
}

export default LabelFilter;
