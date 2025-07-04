import React from "react";
import { useLocation, matchPath } from "react-router-dom";
import { Provider } from "react-redux";
import MyRouter from "./MyRouter/MyRouter";
import store from "./utils/store";
import { AppConfigStatic } from "./AppConfigStatic";
import AppTopbar from "./components/Layouts/AppTopbar";
import AppFooter from "./components/Layouts/AppFooter";
import MainLayout from "./components/Layouts/MainLayout";
import LoadingWrapper from "./MyRouter/wrappers/LoadingWrapper";
import ToastWrapper from "./MyRouter/wrappers/ToastWrapper";
import StartupWrapper from "./MyRouter/wrappers/StartupWrapper";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/layout/layout.scss";
import "./assets/mainTheme/mainTheme.css";
import "./css/customStyles.css";
import { PrimeReactProvider } from "primereact/api";

const App = () => {
  const location = useLocation();

  // List of routes that should NOT use AppTopbar or MainLayout
  const noLayoutRoutes = ["/"];

  const useLayout = !noLayoutRoutes.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  return (
    <Provider store={store}>
      <PrimeReactProvider>
        {useLayout && <AppTopbar showSideMenuButton={false} />}

        {useLayout ? (
          <MainLayout>
            <MyRouter />
          </MainLayout>
        ) : (
          <MyRouter />
        )}

        <LoadingWrapper />
        <ToastWrapper />
        <StartupWrapper />

        <AppConfigStatic
          rippleEffect={true}
          inputStyle={"outlined"}
          layoutMode={"static"}
          layoutColorMode={"light"}
        />
      </PrimeReactProvider>
    </Provider>
  );
};

export default App;
