import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const LoaderUI = () => {
  return (
    <Box>
      <CircularProgress />
    </Box>
  );
};

export default React.memo(LoaderUI);
