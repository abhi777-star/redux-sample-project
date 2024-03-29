import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./features/User.js";
import usersReducer from "./features/Users.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
