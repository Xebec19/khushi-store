import classes from "../../styles/ui.module.css";

export default function ProductList({ children }) {
  return <div className={classes.productList}>{children}</div>;
}
