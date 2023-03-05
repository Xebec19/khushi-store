import styled from "styled-components";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Badge from "@mui/material/Badge";
import classes from "../../styles/UI.module.css";

export default function Navigation() {
  return (
    <div className={classes.navBar}>
      <StorefrontOutlinedIcon />
      <Badge badgeContent={4} color="primary">
        <ShoppingCartOutlinedIcon />
      </Badge>
      <PersonOutlineOutlinedIcon />
    </div>
  );
}
