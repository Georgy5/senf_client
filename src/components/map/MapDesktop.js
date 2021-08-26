/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isMobileOnly } from "react-device-detect";

//Redux
import { useDispatch } from "react-redux";
import { openScream } from "../../redux/actions/screamActions";

//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

//Icons
import CircularArrow from "../../images/icons/circular-arrow.png";

//Map Stuff
import MapGL, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from "@urbica/react-map-gl";

//COOKIES
import Cookies from "universal-cookie";
const cookies = new Cookies();

const styles = {
  root: {
    backgroundColor: "lightgrey",
  },
  title: {
    position: "absolute",
    width: "200px",
    display: "block",
    fontSize: "14px",
    lineHeight: "16px",
    fontFamily: "Futura PT W01-Bold",
    textShadow: "2px 2px 18px #FFFFFF",
    opacity: 1,
    transition: "0.2s",
    PointerEvents: "none",
  },
};

const MapDesktop = ({
  loadingProjects,
  classes,
  viewport,
  _onViewportChangeDesktop,
  dataNoLocationHandle,
  selectedId,
  openInfoPageDesktop,
  noLocation,
  dataFinal,
  mapDesktopShowResults,
  mapDesktopReset,
  geoData,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [hoverScreamId, setHoverScreamId] = useState("");
  const [hoverLat, setHoverLat] = useState("");
  const [hoverLong, setHoverLong] = useState("");
  const [hoverTitle, setHoverTitle] = useState("");
  const [hoverLikeCount, setHoverLikeCount] = useState("");

  const pushScreamId = (screamId) => {
    dispatch(openScream(screamId));
  };

  const data =
    !loadingProjects && geoData !== undefined && geoData !== ""
      ? {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [JSON.parse(geoData)],
          },
        }
      : null;

  let dataNoLocation = [];
  const dataArrayNoLocation = dataFinal;

  if (dataArrayNoLocation !== undefined && dataArrayNoLocation.length > 0) {
    dataArrayNoLocation.forEach((element) => {
      if (element.lat === 50.93864020643174) {
        dataNoLocation.push(element);
      }
    });
  }

  let dataFinalMap = [];
  const dataFinalMapArray = dataFinal;

  if (dataFinalMapArray !== undefined && dataNoLocation.length > 1) {
    dataFinalMapArray.forEach((element) => {
      if (element.lat !== 50.93864020643174) {
        dataFinalMap.push(element);
      }
    });
  }
  if (dataFinalMapArray !== undefined && dataNoLocation.length < 2) {
    dataFinalMapArray.forEach((element) => {
      dataFinalMap.push(element);
    });
  }

  const doubleNoLocation =
    dataNoLocation.length > 1 ? (
      <Marker
        key={"123456"}
        longitude={6.958725744885521}
        latitude={50.93864020643174}
      >
        <div
          style={{
            zIndex: 999,
            position: "absolute",
            width: "20px",
            marginLeft: "-10px",
            height: "20px",
            marginTop: "-10px",
            borderRadius: "100%",
            border: "1px white solid",
            backgroundColor: "#414345",
            opacity: "1",
          }}
          onClick={dataNoLocationHandle}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              color: "white",
              marginTop: "0px",
            }}
          >
            {dataNoLocation.length}
          </div>
        </div>
      </Marker>
    ) : null;

  const doubleNoLocationPopUp =
    selectedId !== "" ? (
      <Marker
        key={selectedId}
        longitude={6.958725744885521}
        latitude={50.93864020643174}
      >
        <div
          style={{
            position: "absolute",
            marginLeft: "-10px",
            marginTop: "10px",
          }}
        >
          <div className="noLocationPopUp">
            <p
              style={{
                fontFamily: "Futura PT W01-Bold",
                fontSize: "12pt",
                paddingRight: "2px",
                paddingLeft: "2px",
              }}
            >
              {t("withoutLocation")}
            </p>

            <button
              className="buttonWide buttonNoLocation"
              onClick={noLocation}
            >
              {dataNoLocation.length} {t("showIdeas")}
            </button>
          </div>
        </div>
      </Marker>
    ) : null;

  return !isMobileOnly ? (
    <div className="mapWrapper">
      <MapGL
        style={
          openInfoPageDesktop
            ? {
                position: "fixed",
                width: "100%",
                height: "100%",
                transform: "scale(1)",
                left: 0,
              }
            : {
                position: "fixed",
                width: "calc(100% - 600px)",
                left: "600px",
                height: "100%",
                transform: "scale(1)",
              }
        }
        mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
        accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        hash={true}
        minZoom={8}
        latitude={viewport.latitude}
        longitude={viewport.longitude}
        pitch={viewport.pitch}
        bearing={viewport.bearing}
        zoom={viewport.zoom}
        onViewportChange={_onViewportChangeDesktop}
        viewportChangeMethod={"easeTo"}
        viewportChangeOptions={{
          duration: 2700,
        }}
      >
        <NavigationControl showCompass showZoom position="top-right" />

        <Source id="maine" type="geojson" data={data} />
        <Layer
          id="maine"
          type="fill"
          source="maine"
          paint={{
            "fill-color": "#fed957",
            "fill-opacity": 0.3,
          }}
        />

        <button
          className="buttonWide buttonMapdesktop"
          style={
            !openInfoPageDesktop &&
            (cookies.get("Cookie_settings") === "all" ||
              cookies.get("Cookie_settings") === "minimum")
              ? { display: "block" }
              : { display: "none" }
          }
          onClick={() => mapDesktopShowResults(viewport)}
        >
          {t("map_filterIdeas")}
        </button>

        <button
          onClick={mapDesktopReset}
          className="buttonRound buttonResetMapDesktop"
          style={
            !openInfoPageDesktop &&
            (cookies.get("Cookie_settings") === "all" ||
              cookies.get("Cookie_settings") === "minimum")
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <img src={CircularArrow} width="25" alt="reset_icon"></img>
        </button>
        <div style={{ zIndex: 90 }}>
          {dataFinalMap.map((element) => (
            <Marker
              key={element.screamId}
              longitude={element.long}
              latitude={element.lat}
            >
              <div
                onMouseEnter={() => {
                  setHoverScreamId(element.screamId);
                  setHoverLat(element.lat);
                  setHoverLong(element.long);
                  setHoverTitle(element.title);
                  setHoverLikeCount(element.likeCount);
                }}
                onMouseLeave={() =>
                  setTimeout(() => {
                    setHoverScreamId("");
                    setHoverLat("");
                    setHoverLong("");
                    setHoverTitle("");
                    setHoverLikeCount("");
                  }, 10000)
                }
                // onMouseOver={this.handleMouse}
                style={{
                  position: "absolute",
                  width: 7 + element.likeCount / 2 + "px",
                  marginLeft: -((7 + element.likeCount) / 4) + "px",
                  height: 7 + element.likeCount / 2 + "px",
                  marginTop: -(7 + element.likeCount) / 4 + "px",
                  borderRadius: "100%",
                  border: "1px white solid",
                  backgroundColor:
                    element.Thema === "Rad"
                      ? "#929df6"
                      : element.Thema === "Verkehr"
                      ? "#91dff4"
                      : element.Thema === "Umwelt und Grün"
                      ? "#8dd9b8"
                      : element.Thema === "Sport / Freizeit"
                      ? "#f6c095"
                      : element.Thema === "Inklusion / Soziales"
                      ? "#e8907e"
                      : element.Thema === "Versorgung"
                      ? "#bd98f6"
                      : "#f9db95",
                  opacity: "1",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: 0,
                    borderRadius: "100%",
                    overflow: "hidden",
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 9px 38px, rgba(0, 0, 0, 0.15) 0px 5px 5px",
                  }}
                >
                  <button
                    onClick={() => pushScreamId(element.screamId)}
                    className="buttonExpand ripple"
                  ></button>
                </div>
              </div>
            </Marker>
          ))}

          <Marker key={hoverScreamId} longitude={hoverLong} latitude={hoverLat}>
            <div
              style={{
                position: "absolute",
                width: 7 + hoverLikeCount / 2 + "px",
                marginLeft: -((7 + hoverLikeCount) / 4) + "px",
                height: 7 + hoverLikeCount / 2 + "px",
                marginTop: -(7 + hoverLikeCount) / 4 + "px",
                borderRadius: "100%",
                border: "1px white solid",
                backgroundColor: "rgb(0,0,0,0.2)",
                zIndex: 0,

                opacity: "1",
                pointerEvents: "none",
              }}
            >
              <div
                className={classes.title}
                style={{
                  marginLeft: +(20 + hoverLikeCount) / 2 + "px",
                  marginTop: +(5 + hoverLikeCount) / 4 + "px",
                  transform: "translateY(-50%)",
                }}
              >
                {hoverTitle}
              </div>
            </div>
          </Marker>
        </div>

        <div style={{ zIndex: 99 }}>
          {doubleNoLocation}
          {doubleNoLocationPopUp}
        </div>
      </MapGL>
    </div>
  ) : null;
};

export default withStyles(styles)(MapDesktop);
