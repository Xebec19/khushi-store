import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import classes from "../../styles/ui.module.css";
import { usePathname } from "next/navigation";

const HeaderUI = () => {
  const pathName = usePathname();

  return (
    <AppBar className={classes.headerWrapper}>
      <Toolbar className={classes.header}>
        <Typography variant="h6" component="div">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>

        <span className={classes.iconWrapper}>
          {!pathName?.includes("search") && (
            <Link href="/search">
              <IconButton className={classes.mobileIcon}>
                <SearchIcon className={classes.whiteIcon} />
              </IconButton>
            </Link>
          )}

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
