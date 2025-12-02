import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/navigation/header/Header";
import Footer from "@/components/navigation/footer/Footer";

const Layout = () => {
  return (
    <div className="max-w-5xl w-full mx-auto min-h-screen px-2 py-2 flex flex-col">
      <Header />
      <main className="px-2 py-4 fade-in grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;