import classes from "../../../styles/UI.module.css";

export default function ProductList({ children }) {
  return <div className={classes.productList}>{children}</div>;
}
