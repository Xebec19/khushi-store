import notificationSlice from "@/store/notification";
import { Alert, Snackbar } from "@mui/material";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

const NotificationUI: FC = () => {
  let notify = useSelector((state: any) => state.notification);
  let dispatch = useDispatch();

  const handleClose = () => {
    dispatch(notificationSlice.actions.hideNotification());
  };

  return (
    <Snackbar
      open={notify.visible}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={60000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={notify.type}
        sx={{ width: "100%" }}
      >
        {notify.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationUI;
