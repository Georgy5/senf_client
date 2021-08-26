/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";

import ToggleDisplay from "react-toggle-display";
import lamploader from "../../images/lamp.png";
import Geofilter from "../map/Geofilter";
import Arrow from "../../images/icons/sort.png";

import Scream from "../scream/Scream";

import NativeSelect from "@material-ui/core/NativeSelect";
import _ from "lodash";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Themenfilter from "../layout/Themenfilter";

const styles = {
  inlineText: {
    fontFamily: "Futura PT W01-Bold",
    position: "absolute",
    fontSize: "15pt",
    color: "#414345",
    width: "80vw",
    marginLeft: "10vw",
    textAlign: "center",
    zIndex: "10",
  },
};

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0)",
        },
        "&&&&:after": {
          borderBottom: "1px solid rgba(255, 255, 255, 0)",
        },
      },
    },
    MuiNativeSelect: {
      icon: {
        opacity: 0,
      },
    },
  },
});

export class MyIdeas extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      classes,
      loading,
      dropdown,
      screamIdParam,
      myScreams,

      viewport,
      latitude1,
      longitude1,
      latitude2,
      longitude2,
      latitude3,
      longitude3,
      latitude4,
      longitude4,
      handleRevert,
      _onViewportChange,
      onClick,

      handleDropdown,

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

      handleClick,
      showDemand,

      handleOpenGeofilter,
      handleCloseGeofilter,
      handleResetGeofilter,
      openGeofilter,
      showGeofilterResults,
      createGeofilterCircle,
      dataNoLocationHandle,
      selectedId,
      noLocation,

      openInfoPageDesktop,
      showTitles,
      _onViewportChangeDesktop,
    } = this.props;

    //

    let dataRarChannel = [];
    const dataArrayChannel = myScreams;

    dataArrayChannel.forEach((element) => {
      if (
        checked === 1 &&
        element.lat > latitude2 &&
        element.lat < latitude1 &&
        element.long > longitude2 &&
        element.long < longitude3
      ) {
        dataRarChannel.push(element);
      }
      if (
        element.Thema !== undefined &&
        element.Thema === checked1 &&
        element.lat > latitude2 &&
        element.lat < latitude1 &&
        element.long > longitude2 &&
        element.long < longitude3
      ) {
        dataRarChannel.push(element);
      }
      if (
        element.Thema !== undefined &&
        element.Thema === checked2 &&
        element.lat > latitude2 &&
        element.lat < latitude1 &&
        element.long > longitude2 &&
        element.long < longitude3
      ) {
        dataRarChannel.push(element);
      }
      if (
        element.Thema !== undefined &&
        element.Thema === checked3 &&
        element.lat > latitude2 &&
        element.lat < latitude1 &&
        element.long > longitude2 &&
        element.long < longitude3
      ) {
        dataRarChannel.push(element);
      }
      if (
        element.Thema !== undefined &&
        element.Thema === checked4 &&
        element.lat > latitude2 &&
        element.lat < latitude1 &&
        element.long > longitude2 &&
        element.long < longitude3
      ) {
        dataRarChannel.push(element);
      }
      if (
        element.Thema !== undefined &&
        element.Thema === checked5 &&
        element.lat > latitude2 &&
        element.lat < latitude1 &&
        element.long > longitude2 &&
        element.long < longitude3
      ) {
        dataRarChannel.push(element);
      }
      if (
        element.Thema !== undefined &&
        element.Thema === checked6 &&
        element.lat > latitude2 &&
        element.lat < latitude1 &&
        element.long > longitude2 &&
        element.long < longitude3
      ) {
        dataRarChannel.push(element);
      }
      if (
        element.Thema !== undefined &&
        element.Thema === checked7 &&
        element.lat > latitude2 &&
        element.lat < latitude1 &&
        element.long > longitude2 &&
        element.long < longitude3
      ) {
        dataRarChannel.push(element);
      }
    });

    let dataFinalChannel = [];
    const dataArrayFinalChannel = dataRarChannel;
    if (
      dataArrayFinalChannel !== undefined &&
      dataArrayFinalChannel.length > 0
    ) {
      dataArrayFinalChannel.forEach((element) => {
        if (element.status === "None") {
          dataFinalChannel.push(element);
        }
      });
    }

    let recentScreamsMarkup = _.orderBy(
      dataFinalChannel,
      "createdAt",
      "desc"
    ).map((scream) => <Scream key={scream.screamId} scream={scream} />);

    let HotScreamsMarkup = _.orderBy(dataFinalChannel, "likeCount", "desc").map(
      (scream) => <Scream key={scream.screamId} scream={scream} />
    );

    let screamLength = dataFinalChannel.length;

    let noMoreScreamsMarkup =
      !loading && screamLength > 0 ? (
        <div className="ende">
          ... <br /> Keine weiteren Ideen <br />
        </div>
      ) : myScreams === undefined ? (
        <div className="no-ideas-yet">
          Du hast bisher noch keine Idee geteilt. Es gibt noch so viele Ideen da
          draußen & du bist kreativ! Teile deine Ideen!
        </div>
      ) : (
        <div className="no-ideas-yet">
           Zu den ausgewählten Filtern hast du noch keine Ideen geteilt.
        </div>
      );
    return !loading ? (
      <div className="projectIdeascontent">
        <div className="projectHeader">
          <div className="FilterComponentMobile">
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
            ></Themenfilter>{" "}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <div className="idea-header">
              <ToggleDisplay show={dropdown === "10" || dropdown === "20"}>
                <img
                  src={lamploader}
                  width="50px"
                  style={{ transform: "translateY(10px) rotate(30deg)" }}
                  alt="lamploader"
                ></img>
                {screamLength} Ideen{" "}
              </ToggleDisplay>
            </div>

            <MuiThemeProvider theme={theme}>
              <NativeSelect
                value={dropdown}
                onChange={handleDropdown}
                name="dropdown"
                className="formControl"
                inputProps={{ "aria-label": "dropdown" }}
                id="dropdown"
                IconComponent={() => (
                  <img
                    src={Arrow}
                    width="20px"
                    style={{
                      marginTop: "0px",
                      marginLeft: "-24px",
                      pointerEvents: "none",
                    }}
                  ></img>
                )}
              >
                <option value={10} className={classes.formText}>
                  neuste
                </option>
                <option value={20}>schärfste</option>
                {/* <option value={30}>umgesetzte</option>
                  <option value={40}>verworfene</option> */}
              </NativeSelect>
            </MuiThemeProvider>
          </div>
        </div>

        <Geofilter
          dataFinal={dataFinalChannel}
          latitude1={latitude1}
          latitude2={latitude2}
          latitude3={latitude3}
          latitude4={latitude4}
          longitude1={longitude1}
          longitude2={longitude2}
          longitude3={longitude3}
          longitude4={longitude4}
          viewport={viewport}
          _onViewportChange={_onViewportChange}
          onClick={onClick}
          handleRevert={handleRevert}
          noLocation={noLocation}
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
          handleOpenGeofilter={handleOpenGeofilter}
          handleCloseGeofilter={handleCloseGeofilter}
          handleResetGeofilter={handleResetGeofilter}
          openGeofilter={openGeofilter}
          showGeofilterResults={showGeofilterResults}
          createGeofilterCircle={createGeofilterCircle}
          dataNoLocationHandle={dataNoLocationHandle}
          selectedId={selectedId}
          noLocation={noLocation}
        />

        <ToggleDisplay show={dropdown === "10"}>
          <div className={dropdown === "10" ? "MainAnimation" : ""}>
            {recentScreamsMarkup}
            {noMoreScreamsMarkup}
          </div>
        </ToggleDisplay>
        <ToggleDisplay show={dropdown === "20"}>
          <div className={dropdown === "20" ? "MainAnimation" : ""}>
            {HotScreamsMarkup}
            {noMoreScreamsMarkup}
          </div>
        </ToggleDisplay>
      </div>
    ) : null;
  }
}
MyIdeas.propTypes = {};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(MyIdeas));
