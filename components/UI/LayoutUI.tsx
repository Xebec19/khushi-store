import classes from "../../styles/ui.module.css";

const LayoutUI = ({ children }) => {
  return <main className={classes.layout}>{children}</main>;
};

export default LayoutUI;
