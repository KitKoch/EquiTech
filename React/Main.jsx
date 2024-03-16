import React from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

import App from "./App";

import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./contexts/SidebarContext";
import { LayoutProvider } from "./contexts/LayoutContext";
import ChartJsDefaults from "./utils/ChartJsDefaults";

const Main = () => {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s Sabio - AppStack" defaultTitle="Fairly" />
      <ThemeProvider>
        <SidebarProvider>
          <LayoutProvider>
            <ChartJsDefaults />
            <App />
          </LayoutProvider>
        </SidebarProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default Main;
