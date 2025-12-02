import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "@/styles/index.css";
import Providers from "@/Providers";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Providers>
       <AppRoutes />
    </Providers>
  );
};

export default App;