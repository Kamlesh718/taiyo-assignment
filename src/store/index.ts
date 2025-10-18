import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("contacts", JSON.stringify(store.getState().contacts));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
