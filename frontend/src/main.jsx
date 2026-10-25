import
'bootstrap/dist/css/bootstrap.min.css'
import { StrictMode } from 'react'

import { createRoot } from 'react-
dom/client'

import './index.css'
import App from './App.jsx'
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import App from "./App.jsx";
import theme from "./theme";
import "./loginStyles.css";
createRoot(document.getElementById("root")).render(
<ThemeProvider theme={theme}>
<App />
</ThemeProvider>
);