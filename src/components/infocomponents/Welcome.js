/** @format */

import React, { useEffect } from "react";
import { useHistory } from "react-router";

//Translation
import { Trans, useTranslation } from "react-i18next";

//Images
import FirstImage from "../../images/cityperson.png";
import FirstImageBad from "../../images/citypersonBad.png";
import { LazyImage } from "react-lazy-images";

//MUI STuff
import withStyles from "@material-ui/core/styles/withStyles";

//REDUX
import { setCookies } from "../../redux/actions/cookiesActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//CHECK DEVICE
import { isMobileOnly } from "react-device-detect";

//Cookies
import Cookies from "universal-cookie";
const cookies = new Cookies();

const styles = {
  wrapper: {
    backgroundColor: "white",
    width: "100vw",
    height: "100vh",
    position: "fixed",
  },

  PlattformButton2: {
    position: "fixed",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    bottom: "4em",
    borderRadius: "100px",
    color: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
    backgroundColor: "#414345",
    textTransform: "none",
    fontSize: "14pt",
  },

  FirstImage: {
    position: "absolute",
    top: "9vh",
    width: "100vw",
    marginLeft: "0vw",
  },
};

const Welcome = ({ classes }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { cookie_settings } = useSelector((state) => state.data);

  useEffect(() => {
    if (!isMobileOnly) {
      history.push("/");
    }
  }, []);

  const handleOpenCookiePreferences = () => {
    window.open("/cookieConfigurator", "_blank");
  };

  const handleCookies = (cookie_settings) => {
    dispatch(setCookies(cookie_settings));
  };

  const name = "person";

  const cookiebanner =
    cookies.get("Cookie_settings") !== "all" &&
    cookies.get("Cookie_settings") !== "minimum" ? (
      <div>
        <div className="cookiesText">
          {" "}
          <span className="cookiesHeader">{t("cookiebanner_title")}</span>
          <br />
          <Trans i18nKey="cookiebanner_text">
            Für die Bereitstellung einiger Funktionen und die Verbesserung
            dieses Services brauchen wir Cookies. Falls du wirklich nur die
            technisch notwendigsten Cookies akzeptieren willst, klicke{" "}
            <span className="Terms" onClick={() => handleCookies("minimum")}>
              hier
            </span>
            &nbsp;oder konfiguriere deine{" "}
            <span className="Terms" onClick={handleOpenCookiePreferences}>
              Cookie-Einstellungen
            </span>
            .
          </Trans>
        </div>
        <button
          className="buttonWide AcceptIntro"
          onClick={() => handleCookies("all")}
        >
          {t("accept")}
        </button>
        <span className="footerIntro">
          <Link to="/impressum" className="footerIntroText">
            <span className="impressumIntro"> {t("imprint")} </span>
          </Link>
          <Link to="/datenschutz" className="footerIntroText">
            <span className="datenschutzInto"> | {t("dataPrivacy")} |</span>
          </Link>
          <Link to="/agb" className="footerIntroText">
            <span> {t("termsAndConditions")} </span>
          </Link>
        </span>{" "}
      </div>
    ) : null;

  return (
    <div className={classes.wrapper}>
      <div className="wrapperMenu">
        {navigator.language !== "de-DE" && (
          <p className="explanation">German expression saying – Contribute!</p>
        )}

        <LazyImage
          src={FirstImage}
          className={classes.FirstImage}
          alt="Person_Senftube"
          placeholder={({ imageProps, ref }) => (
            <img
              ref={ref}
              src={FirstImageBad}
              className={classes.FirstImage}
              alt="Person_Senftube"
            />
          )}
          actual={({ imageProps }) => (
            <img {...imageProps} alt="Person_Senftube" />
          )}
        />
        <Link to="/start">
          <button className="buttonWide buttonIntroToStart">
            {" "}
            {t("next")}
          </button>
        </Link>

        <span className="footerIntro">
          <Link to="/impressum" className="footerIntroText">
            <span className="impressumIntro"> {t("imprint")} </span>
          </Link>
          <Link to="/datenschutz" className="footerIntroText">
            <span className="datenschutzInto"> | {t("dataPrivacy")} |</span>
          </Link>
          <Link to="/agb" className="footerIntroText">
            <span> {t("termsAndConditions")} </span>
          </Link>
        </span>
      </div>
      {cookiebanner}
    </div>
  );
};

export default withStyles(styles)(Welcome);
