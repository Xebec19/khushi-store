import { createSlice } from "@reduxjs/toolkit";

interface INotification {
  type: "info" | "error" | "warning" | "success";
  message: string | null;
  visible: boolean;
}

let initialState: INotification = {
  type: "info",
  message: null,
  visible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      let { type, message, visible } = action.payload;
      state = {
        type,
        message,
        visible,
      };
    },
    hideNotification(state) {
      //   state = initialState;
    },
  },
});

export default notificationSlice;
