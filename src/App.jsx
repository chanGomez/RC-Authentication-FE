import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ForgotPassword from "./components/ForgotPassword";
import TemplateFrame from "../TemplateFrame";
import getSignUpTheme from "../theme/getSignUpTheme";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Movies from "./components/Movies"

function App() {
    const [mode, setMode] = React.useState("light");
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));

    React.useEffect(() => {
      // Check if there is a preferred mode in localStorage
      const savedMode = localStorage.getItem("themeMode");
      if (savedMode) {
        setMode(savedMode);
      } else {
        // If no preference is found, it uses system preference
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setMode(systemPrefersDark ? "dark" : "light");
      }
    }, []);

    const toggleColorMode = () => {
      const newMode = mode === "dark" ? "light" : "dark";
      setMode(newMode);
      localStorage.setItem("themeMode", newMode); // Save the selected mode to localStorage
    };

    const toggleCustomTheme = () => {
      setShowCustomTheme((prev) => !prev);
    };

  return (
    <TemplateFrame
      toggleCustomTheme={toggleCustomTheme}
      showCustomTheme={showCustomTheme}
      mode={mode}
      toggleColorMode={toggleColorMode}
    >
      <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
        <Router>
          <Routes>
            <Route path="/" element={<p>HOME</p>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </TemplateFrame>
  );
}

export default App;
