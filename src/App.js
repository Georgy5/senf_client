/** @format */

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./AppDesktop.css";
import "./AppIpad.css";

import firebaseConfig from "./firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//Pages
import home from "./pages/home";
import IntroductionInformation from "./components/infocomponents/IntroductionInformation";

import info from "./components/infocomponents/info";
import Welcome from "./components/infocomponents/Welcome";
import verify from "./components/profile/verify";

import impressum from "./components/infocomponents/legal/impressum";
import datenschutz from "./components/infocomponents/legal/datenschutz";
import agb from "./components/infocomponents/legal/agb";
import cookieConfigurator from "./components/infocomponents/legal/cookieConfigurator";

import filter from "./components/map/Geofilter";

import monitoring from "./pages/monitoring";

import ReactGA from "react-ga";

import axios from "axios";

import { isTablet } from "react-device-detect";
import Cookies from "universal-cookie";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import translationEN from "./util/translations/english.json";
import translationDE from "./util/translations/german.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: translationEN,
      },
      de: {
        translation: translationDE,
      },
    },
    lng: navigator.language === "de-DE" ? "de" : "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "de",

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

const cookies = new Cookies();
require("intersection-observer");

if (firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

axios.defaults.baseURL = process.env.REACT_APP_DB_BASE_URL;

const theme = createMuiTheme(themeFile);

function get_local_storage_status() {
  let test = "test";
  try {
    // try setting an item
    localStorage.setItem("test", test);
    localStorage.removeItem("test");
  } catch (e) {
    // browser specific checks if local storage was exceeded
    if (
      e.name === "QUATA_EXCEEDED_ERR" || // Chrome
      e.name === "NS_ERROR_DOM_QUATA_REACHED" //Firefox/Safari
    ) {
      // local storage is full
      return "full";
    } else {
      try {
        if (localStorage.remainingSpace === 0) {
          // IE
          // local storage is full
          return "full";
        }
      } catch (e) {
        // localStorage.remainingSpace doesn't exist
      }

      // local storage might not be available
      return "unavailable";
    }
  }
  return "available";
}
if (get_local_storage_status() === "unavailable") {
  alert(
    "Um Senf zu öffnen, musst du Cookies in deinen Smartphone-Settings erlauben."
  );
}

const token = localStorage.FBIdToken;

console.log(localStorage);

if (token) {
  const decodedToken = jwtDecode(token);
  const expirationDuration = decodedToken.exp * 1000;

  if (expirationDuration < Date.now()) {
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
} else {
  store.dispatch(logoutUser());
}

if (cookies.get("Cookie_settings") === "all") {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);
  ReactGA.pageview(window.location.pathname + window.location.search);
  ReactGA.ga("require", "displayfeatures");
  ReactGA.ga("set", "allowAdFeatures", true);
}
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
const App = () => {
  useEffect(() => {
    let name = "Senf.koeln";
    let version = "1.0.0";
    console.log(`${name} v${version}`);
    const last_version = localStorage.getItem(`${name}-Version`);
    if (last_version !== version) {
      console.log("New Version Available!");
      localStorage.setItem(`${name}-Version`, version);
      window.location.reload(true);
    }
  }, []);

  const { t } = useTranslation();

  const tabletNote = isTablet ? (
    <div className="tabletLandscapeNote">{t("rotate_tablet")} </div>
  ) : null;
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          {/* <Topbar/> */}
          {tabletNote}
          <div className="landscapeNote">{t("rotate_phone")}</div>

          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/start" component={IntroductionInformation} />

              <Route exact path="/filter" component={filter} />

              <Route exact path="/info" component={info} />

              <Route exact path="/intro" component={Welcome} />

              <Route exact path="/datenschutz" component={datenschutz} />

              <Route exact path="/agb" component={agb} />

              <Route exact path="/monitoring" component={monitoring} />

              <Route exact path="/verify" component={verify} />

              <Route
                exact
                path="/cookieConfigurator"
                component={cookieConfigurator}
              />

              <Route exact path="/impressum" component={impressum} />

              <Route exact path="/:screamId" component={home} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
