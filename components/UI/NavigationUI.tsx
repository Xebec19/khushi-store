import styled from "styled-components";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import Badge from "@mui/material/Badge";
import classes from "../../styles/ui.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();

  return (
    <div className={classes.navBar}>
      <Link href="/">
        {router.pathname == "/" ? (
          <StorefrontRoundedIcon />
        ) : (
          <StorefrontOutlinedIcon />
        )}
      </Link>
      <Badge badgeContent={4} color="primary">
        <ShoppingCartOutlinedIcon />
      </Badge>
      <PersonOutlineOutlinedIcon />
    </div>
  );
}
