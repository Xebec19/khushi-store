import { FC } from "react";
import classes from "../../styles/ui.module.css";
import NotificationUI from "./NotificationUI";

const LayoutUI: FC = ({ children }) => {
  return (
    <main className={classes.layout}>
      <NotificationUI />
      {children}
    </main>
  );
};

export default LayoutUI;
