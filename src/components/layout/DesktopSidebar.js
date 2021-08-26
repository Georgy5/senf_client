/** @format */

import React from "react";
import { useTranslation } from "react-i18next";

//Components
import SignNote from "../profile/SignNote";
import InlineInformationPageDesktop from "../infocomponents/InlineInformationPageDesktop";
import Themenfilter from "./Themenfilter";
import Account from "../profile/Account";
import PostScreamDesktop from "../postScream/PostScreamDesktop";
import { MenuItem } from "./MenuItem";
import { MenuData } from "./MenuData";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

//ICONS
import Logo from "../../images/logo.png";
import Insta from "../../images/icons/socialmedia/insta.png";
import Facebook from "../../images/icons/socialmedia/facebook.png";
import profile_yellow from "../../images/icons/profile_yellow.png";
import profile_grey from "../../images/icons/profile_grey.png";
import Noprofile from "../../images/noprofile.png";

const styles = {};

const DesktopSidebar = ({
  loading,
  authenticated,
  classes,
  order,
  handleClick,
  handleLegend,
  handleLegend1,
  handleLegend2,
  handleLegend3,
  handleLegend4,
  handleLegend5,
  handleLegend6,
  handleLegend7,
  checked,
  checked1,
  checked2,
  checked3,
  checked4,
  checked5,
  checked6,
  checked7,

  openInfoPageDesktop,
  handleOpenInfoPageDesktop,
  handleCloseInfoPageDesktop,
  cookiesSetDesktop,
  handleCookies,
  deleteAccount,
  handleLogout,
  loadingProjects,
  projectsData,
}) => {
  const { t } = useTranslation();

  const sign = !authenticated ? (
    <div className="profile">
      <SignNote />
      <img
        src={Noprofile}
        width="35"
        alt="EndImage"
        style={{ paddingRight: "10px" }}
      />
      {t("login")}
    </div>
  ) : (
    <div
      className="profile"
      // onClick={() => handleClick(4)}
    >
      <Account
        handleLegend={handleLegend}
        handleLegend1={handleLegend1}
        handleLegend2={handleLegend2}
        handleLegend3={handleLegend3}
        handleLegend4={handleLegend4}
        handleLegend5={handleLegend5}
        handleLegend6={handleLegend6}
        handleLegend7={handleLegend7}
        checked={checked}
        checked1={checked1}
        checked2={checked2}
        checked3={checked3}
        checked4={checked4}
        checked5={checked5}
        checked6={checked6}
        checked7={checked7}
        deleteAccount={deleteAccount}
        handleLogout={handleLogout}
        openInfoPageDesktop={openInfoPageDesktop}
      />
      <img
        src={order === 4 ? profile_grey : profile_yellow}
        width="35"
        alt="EndImage"
        style={{ paddingRight: "10px" }}
      />
      {t("profile")}
    </div>
  );

  return (
    <div
      className={
        openInfoPageDesktop ? "FilterComponent_hide" : "FilterComponent"
      }
    >
      <h1 className="logoWeb">
        <img src={Logo} width="100px"></img>
      </h1>
      <InlineInformationPageDesktop
        openInfoPageDesktop={openInfoPageDesktop}
        cookiesSetDesktop={cookiesSetDesktop}
        handleOpenInfoPageDesktop={handleOpenInfoPageDesktop}
        handleCloseInfoPageDesktop={handleCloseInfoPageDesktop}
        handleCookies={handleCookies}
        loading={loading}
        classes={classes}
      />

      {sign}
      <PostScreamDesktop
        openInfoPageDesktop={openInfoPageDesktop}
        loadingProjects={loadingProjects}
        projectsData={projectsData}
      />

      {MenuData.map((item, i) => (
        <MenuItem
          order={order}
          index={i + 1}
          isSelectedIcon={item.isSelectedIcon}
          isNotSelectedIcon={item.isNotSelectedIcon}
          text={item.text}
          handleClick={handleClick}
        ></MenuItem>
      ))}

      <div
        style={{
          position: "relative",
          left: "20px",
          width: "160px",
          height: "1px",
          backgroundColor: "lightgrey",
          top: "90px",
          marginBottom: "30px",
        }}
      ></div>

      <Themenfilter
        handleLegend={handleLegend}
        handleLegend1={handleLegend1}
        handleLegend2={handleLegend2}
        handleLegend3={handleLegend3}
        handleLegend4={handleLegend4}
        handleLegend5={handleLegend5}
        handleLegend6={handleLegend6}
        handleLegend7={handleLegend7}
        checked={checked}
        checked1={checked1}
        checked2={checked2}
        checked3={checked3}
        checked4={checked4}
        checked5={checked5}
        checked6={checked6}
        checked7={checked7}
      ></Themenfilter>

      <div
        style={{
          position: "relative",
          left: "20px",
          width: "160px",

          height: "100px",
        }}
      ></div>

      <a
        href="https://www.facebook.com/senf.koeln/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div
          className="facebook"
          style={openInfoPageDesktop ? { left: "-200px" } : null}
        >
          <img src={Facebook} width="25" alt="EndImage" />
        </div>
      </a>
      <a
        href="https://www.instagram.com/senf.koeln/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <div
          className="insta"
          style={openInfoPageDesktop ? { left: "-200px" } : null}
        >
          <img src={Insta} width="25" alt="EndImage" />
        </div>{" "}
      </a>
    </div>
  );
};

export default withStyles(styles)(DesktopSidebar);
