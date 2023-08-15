import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "./slicers/verification";

const store = configureStore({
  reducer: tokenReducer,
});

export default store;
