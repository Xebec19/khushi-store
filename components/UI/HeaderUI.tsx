import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import classes from "../../styles/ui.module.css";

const HeaderUI = () => {
  return (
    <AppBar className={classes.headerWrapper}>
      <Toolbar className={classes.header}>
        <Typography variant="h6" component="div">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>

        <span className={classes.iconWrapper}>
          <Link href="/search">
            <IconButton className={classes.mobileIcon}>
              <SearchIcon className={classes.whiteIcon} />
            </IconButton>
          </Link>

          <Link href="/cart">
            <IconButton className={classes.desktopIcon}>
              <ShoppingCartOutlinedIcon className={classes.whiteIcon} />
            </IconButton>
          </Link>

          <Link href="/profile">
            <IconButton className={classes.desktopIcon}>
              <PersonOutlineOutlinedIcon className={classes.whiteIcon} />
            </IconButton>
          </Link>
        </span>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderUI;
