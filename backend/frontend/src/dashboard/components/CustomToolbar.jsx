import React from "react";
import Button from "@mui/material/Button";

const CustomToolbar = ({ handleClick }) => {
  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ marginRight: "16px" }}
      >
        Create New
      </Button>
    </React.Fragment>
  );
};

export default CustomToolbar;
