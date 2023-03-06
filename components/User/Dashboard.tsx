import { Typography } from "@mui/material";
import React from "react";
import classes from "../../styles/user.module.css";

const Dashboard = () => {
  return (
    <div>
      <Typography
        variant="h6"
        color="text.secondary"
        component="div"
        className={classes.title}
      >
        Khushi Store
      </Typography>
    </div>
  );
};

export default Dashboard;
