import classes from "../../styles/ui.module.css";

const Layout = ({ children }) => {
  return <main className={classes.layout}>{children}</main>;
};

export default Layout;
