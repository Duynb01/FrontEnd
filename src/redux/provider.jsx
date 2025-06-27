"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import Reload from "@/components/Reload";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <Reload>{children}</Reload>
    </Provider>
  );
}
