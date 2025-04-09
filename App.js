import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { Outlet } from "react-router";
import { ThemeContext, ThemeContextProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <>
      <ThemeContextProvider>
        <Header />
        <Outlet />
      </ThemeContextProvider>
    </>
  );
}

export default App;
