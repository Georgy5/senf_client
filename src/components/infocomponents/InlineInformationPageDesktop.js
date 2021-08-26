/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";

// Redux stuff
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//LazyLoad
import { LazyImage } from "react-lazy-images";

import Headline from "../../images/headline.png";
import FirstImageBad from "../../images/bigbubblemanbad.png";

//IMAGES
import FirstImage from "../../images/bigbubbleman.png";
import Mountain from "../../images/bigbubblenew.png";

//LOADER
import CircularProgress from "@material-ui/core/CircularProgress";

import { useTranslation, Trans } from "react-i18next";

//ICON TO OPEN THE INFOMENU
import Info from "../../images/icons/info.png";
import CloseIcon from "@material-ui/icons/Close";

import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  root: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    padding: "0",
    borderRadius: "20px !important",
  },

  paper: {
    //backgroundColor: "rgb(0,0,0,0.5)",
    boxShadow: "none",

    height: "auto",
    padding: "0",
    top: "18em",
    borderRadius: "20px ",
  },

  closeButton: {
    position: "absolute",
    top: "2.5vw",
    left: "2.5vw",
    color: "black",
    zIndex: "990",
    padding: 10,
  },

  nav: {
    width: "100vw",
    height: "80px",
    position: "fixed",
    backgroundColor: "white",
    zIndex: 999,
  },

  PlattformButton2: {
    position: "fixed",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "200px",
    right: "50px",
    bottom: "50px",
    borderRadius: "100px",
    color: "white",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
    backgroundColor: "#414345",
    textTransform: "none",
    fontSize: "14pt",
    border: " solid 1px #414345",
  },

  KontaktButton: {
    position: "absolute",
    zIndex: 99,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    width: "50vw",
    left: "25vw",
    top: "1760px",
    borderRadius: "100px",
    color: "#414345",
    backgroundColor: "white",
    textTransform: "none",
    fontSize: "14pt",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.2)",
  },

  TopPath: {
    position: "absolute",
    top: "0",
    width: "100vw",
  },

  FirstImage: {
    position: "absolute",
    top: "24vw",
    width: "75vw",
    marginLeft: "15.3vw",
  },
};

const InlineInformationPageDesktop = ({
  classes,
  openInfoPageDesktop,
  cookiesSetDesktop,
  handleOpenInfoPageDesktop,
  handleCloseInfoPageDesktop,
  handleCookies,
  loading,
}) => {
  const { t } = useTranslation();

  const dialogComponent =
    !loading && !cookiesSetDesktop ? (
      <Dialog
        scroll={"paper"}
        open={openInfoPageDesktop}
        onClose={handleCloseInfoPageDesktop}
        className="dialogOverlayContent"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={"sm"}
        PaperProps={{
          style: { borderRadius: "20px" },
        }}
      >
        <DialogContent style={{ height: "200px" }}>
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
              <span
                className="Terms"
                onClick={() => {
                  window.open("/cookieConfigurator", "_blank");
                }}
              >
                Cookie-Einstellungen
              </span>
              .
            </Trans>
          </div>

          <button
            className="buttonWide buttonCookiesDesktop"
            onClick={() => handleCookies("all")}
          >
            {t("accept")}
          </button>
        </DialogContent>
      </Dialog>
    ) : !loading ? (
      <Dialog
        scroll={"paper"}
        open={openInfoPageDesktop}
        onClose={handleCloseInfoPageDesktop}
        className="dialogOverlayContent"
        TransitionComponent={Transition}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth={"lg"}
        PaperProps={{
          style: {
            borderRadius: "20px",
            width: "1000px",
            height: "900px",
            maxHeight: "calc(100vh - 80px)",
            overflowX: "hidden",
          },
        }}
      >
        <button
          onClick={handleCloseInfoPageDesktop}
          className="buttonRound buttonClose"
          style={{ position: "fixed" }}
        >
          <CloseIcon />
        </button>

        <DialogContent style={{}}>
          <img className="Gib" src={Headline} width="100px"></img>

          <LazyImage
            src={FirstImage}
            className="FirstImage"
            alt="Person_Senftube"
            placeholder={({ imageProps, ref }) => (
              <img
                ref={ref}
                src={FirstImageBad}
                className="FirstImage"
                alt="Person_Senftube"
              />
            )}
            actual={({ imageProps }) => (
              <img {...imageProps} alt="Person_Senftube" />
            )}
          />
          <div className="SVGweb" alt="TopPath">
            <img src={Mountain} className="Mountain" alt="Mountain" />

            <div>
              <span className="title1Web">{t("infopage_block1_title")}</span>
              <span className="subTitle1Web">
                {t("infopage_block1_subtitle")}
              </span>
            </div>
            <span className="title2Web">{t("infopage_block2_title")}</span>
            <span className="subTitle2Web">
              {t("infopage_block2_subtitle")}
            </span>
            <span className="title3Web">{t("infopage_block3_title")}</span>
            <span className="subTitle3Web">
              {t("infopage_block3_subtitle")}
            </span>

            <button
              className="buttonWide buttonInlineInfoIdeas"
              onClick={handleCloseInfoPageDesktop}
            >
              {t("showIdeas")}
            </button>

            <a href="mailto:dein@senf.koeln">
              <button className="buttonWide buttonInlineInfoContact">
                {t("contact")}
              </button>
            </a>

            <span className="footer">
              <Link to="/impressum">
                <span className="impressum"> {t("imprint")}</span>
              </Link>
              <Link to="/datenschutz">
                <span className="datenschutz"> | {t("dataPrivacy")} | </span>
              </Link>
              <Link to="/agb">
                <span className="agb"> {t("termsAndConditions")} </span>
              </Link>
            </span>
            <span className="footercopy">{t("infopage_illustrator")}</span>
          </div>
        </DialogContent>
      </Dialog>
    ) : (
      <div className="white">
        <div className="spinnerDiv">
          <CircularProgress size={50} thickness={2} />
          {/* <img src={lamploader} className="lamploader" alt="LikeIcon" /> */}
        </div>
      </div>
    );

  return (
    <Fragment>
      <div onClick={handleOpenInfoPageDesktop}>
        <div className="inlineInfoIcon">
          <img src={Info} width="35" alt="EndImage" />

          <span className="inlineInfoIconText">Infos</span>
        </div>
      </div>

      {dialogComponent}
    </Fragment>
  );
};

export default withStyles(styles)(InlineInformationPageDesktop);
