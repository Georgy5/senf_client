/** @format */

import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

import { useTranslation } from "react-i18next";

// MUI Stuff
import Dialog from "@material-ui/core/Dialog";

// Redux stuff
import { Link } from "react-router-dom";

//LazyLoad
import { LazyImage } from "react-lazy-images";

//IMAGES

import Insta from "../../images/icons/socialmedia/insta.png";
import Facebook from "../../images/icons/socialmedia/facebook.png";

import TopPath from "../../images/topPathNew.png";
import First from "../../images/first.png";
import Second from "../../images/secondImage.png";
import Third from "../../images/letstalkbubble.png";

//IMAGES BAD
import TopPathBad from "../../images/toppathbad.png";
import FirstBad from "../../images/firstbad.png";

//ICON TO OPEN THE INFOMENU
import Info from "../../images/icons/info.png";
import CloseIcon from "@material-ui/icons/Close";

import Logo from "../../images/logo.png";

const styles = {
  root: {
    backgroundColor: "white",
    padding: "0",
  },

  paper: {
    backgroundColor: "white",
    boxShadow: "none",
    padding: "0",
  },

  closeButton: {
    zIndex: 9999,
    position: "fixed",
    left: "35px",
    width: "30px",
    marginTop: "18px",
    color: "#ffd388",
  },

  nav: {
    width: "100vw",
    height: "80px",
    position: "fixed",
    backgroundColor: "white",
    zIndex: 999,
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

const InlineInformationPage = ({ classes }) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <Fragment>
      <div onClick={() => setOpen(true)}>
        <div className="inlineInfoIcon">
          <img src={Info} width="35" alt="EndImage" />

          <span className="inlineInfoIconText">Infos</span>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
        fullScreen
      >
        <MyButton
          onClick={() => setOpen(false)}
          btnClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>

        <div className={classes.nav}>
          <h1 className="logo1">
            <img src={Logo} width="100px"></img>
          </h1>
        </div>

        <a
          href="https://www.facebook.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="facebook">
            <img src={Facebook} width="25" alt="EndImage" />
          </div>
        </a>
        <a
          href="https://www.instagram.com/senf.koeln/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="insta">
            <img src={Insta} width="25" alt="EndImage" />
          </div>{" "}
        </a>

        <div className="wrapperMenu">
          <div className="StartBackground" />

          <LazyImage
            src={TopPath}
            className={classes.TopPath}
            width="100%"
            alt="Top_image_person_with_mustard_tube_good_quality"
            placeholder={({ imageProps, ref }) => (
              <img
                ref={ref}
                src={TopPathBad}
                className={classes.TopPath}
                width="100%"
                alt="Top_image_person_with_mustard_tube_bad_quality"
              />
            )}
            actual={({ imageProps }) => (
              <img
                {...imageProps}
                alt="Top_image_person_with_mustard_tube_good_quality"
              />
            )}
          />

          <div className="FirstWrapper">
            <span className="title1">{t("infopage_block1_title")}</span>

            <span className="subTitle1">{t("infopage_block1_subtitle")}</span>
            <LazyImage
              src={First}
              className="First"
              width="100%"
              alt="First_image_persons_idea_good_quality"
              placeholder={({ imageProps, ref }) => (
                <img
                  ref={ref}
                  src={FirstBad}
                  className="First"
                  width="100%"
                  alt="First_image_persons_idea_bad_quality"
                />
              )}
              actual={({ imageProps }) => (
                <img
                  {...imageProps}
                  alt="First_image_persons_idea_good_quality"
                />
              )}
            />
          </div>

          <span className="title2">{t("infopage_block2_title")}</span>

          <span className="subTitle2">{t("infopage_block2_subtitle")}</span>
          <img src={Second} className="Second" alt="TopPath" />

          <span className="title3">{t("infopage_block3_title")}</span>

          <span className="subTitle3">{t("infopage_block3_subtitle")}</span>

          <img src={Third} className="Third" alt="TopPath" />

          <button
            className="buttonWide buttonInlineInfoIdeas"
            onClick={() => setOpen(false)}
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
      </Dialog>
    </Fragment>
  );
};

export default withStyles(styles)(InlineInformationPage);
