import React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AppContextProvider } from "./context/AppContext";

const Providers = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default Providers;