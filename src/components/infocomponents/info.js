/** @format */

// /** @format */

// import React, { Component } from "react";

// import withStyles from "@material-ui/core/styles/withStyles";

// import { Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";

// import QR from "../../images/frame.png";

// //LazyLoad
// import { LazyImage } from "react-lazy-images";

// //IMAGES BAD QUALITY
// import FirstImageBad from "../../images/bigbubblemanbad.png";

// //IMAGES
// import FirstImage from "../../images/bigbubbleman.png";
// import Mountain from "../../images/bigbubblenew.png";

// //LOADER
// import CircularProgress from "@material-ui/core/CircularProgress";
// import lamploader from "../../images/lamp.png";

// import Headline from "../../images/headline.png";
// import Logo from "../../images/logo.png";

// import { connect } from "react-redux";

// //CHECK IF MOBILE
// import { isMobileOnly } from "react-device-detect";

// //COOKIES
// import Cookies from "universal-cookie";
// const cookies = new Cookies();

// const styles = {
//   KontaktButton: {
//     position: "fixed",
//     zIndex: 999,
//     width: "7em",
//     right: "5vw",
//     top: "2vw",
//     borderRadius: "100px",
//     color: "#414345",
//     boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
//     backgroundColor: "white",
//     textTransform: "none",
//     fontSize: "15pt",
//     border: " solid 1px #414345",
//   },

//   black: {
//     color: "black",
//   },
// };

// export class info extends Component {
//   componentDidMount() {
//     if (isMobileOnly) {
//       this.props.history.push("/");
//     }
//     if (!isMobileOnly) {
//       this.props.history.push("/");
//     }
//   }

//   state = {
//     open: true,
//   };
//   handleOpen = () => {
//     this.setState({ open: true });
//   };

//   handleOpenCookiePreferences() {
//     window.open("/cookieConfigurator", "_blank");
//   }

//   handleMinimumCookies() {
//     cookies.set("Cookie_settings", "minimum", {
//       path: "/",
//       maxAge: 60 * 60 * 24 * 90,

//       sameSite: "none",
//       secure: true,
//     });
//     this.setState({ open: false });
//   }

//   handleCookies() {
//     cookies.set("Cookie_settings", "all", {
//       path: "/",
//       maxAge: 60 * 60 * 24 * 90,
//       sameSite: "none",
//       secure: true,
//     });
//     this.setState({ open: false });
//   }
//   handleClose = () => {
//     this.setState({ open: false });
//   };

//   render() {
//     const { loading } = this.props.data;
//     const { classes } = this.props;

//     window.onbeforeunload = function () {
//       window.scrollTo(0, 0);
//     };

//     window.onload = function () {
//       window.scrollTo(0, 0);
//     };

//     const cookiebanner =
//       !loading && cookies.get("Cookie_settings") !== "all" ? (
//         <div>
//           <div className="cookiesText">
//             {" "}
//             <span className="cookiesHeader">Ohne Cookies geht's nicht.</span>
//             <br />
//             Für die Bereitstellung einiger Funktionen und die Verbesserung
//             dieses Services brauchen wir Cookies. Wenn du fortfährst stimmst du
//             der Verwendung von technisch notwendigen Cookies zu.&nbsp;
//             <span
//               className="Terms"
//               onClick={() => this.handleOpenCookiePreferences()}
//             >
//               Hier
//             </span>
//             &nbsp;kannst du deine Cookie-Einstellungen konfigurieren.
//           </div>

//           <div className="AcceptBanner" onClick={() => this.handleCookies()}>
//             Akzeptieren
//           </div>
//         </div>
//       ) : null;

//     const start = !loading ? (
//       <div>
//         {cookiebanner}
//         <h1 className="logoWeb">
//           {" "}
//           <img src={Logo} width="100px"></img>
//         </h1>
//         <img className="Gib" src={Headline} width="100px"></img>
//         {/* <span className="Gib">Gib deinen Senf dazu!</span>{" "} */}
//         <div className="FadeAnimationSlow">
//           <span className="infotext">
//             Öffne <span className={classes.black}>Senf.koeln</span> <br /> auf
//             deinem Smartphone, <br />
//             um mitzumachen!
//           </span>

//           <a href="mailto:dein@senf.koeln">
//             <Button variant="contained" className={classes.KontaktButton}>
//               Kontakt
//             </Button>
//           </a>

//           <div className="ipadbackground" />
//           <div className="QRWrapper">
//             <img src={QR} className="QR" alt="TopPath" />

//             <span className="QRtext">
//               Scanne den QR-Code mit deiner Smartphone-Kamera-App
//             </span>
//           </div>

//           <span className="footerWeb">
//             <Link to="/impressum">
//               <span className="impressumWeb"> Impressum </span>
//             </Link>

//             <Link to="/datenschutz">
//               <span className="datenschutzWeb">| Datenschutz | </span>
//             </Link>
//             <Link to="/agb">
//               <span className="AGBWeb"> AGB </span>
//             </Link>
//           </span>
//           <span className="footercopyWeb">
//             Illustrationen: Gizem Güvenda&#287;
//           </span>
//         </div>
//         <LazyImage
//           src={FirstImage}
//           className="FirstImage"
//           alt="Person_Senftube"
//           placeholder={({ imageProps, ref }) => (
//             <img
//               ref={ref}
//               src={FirstImageBad}
//               className="FirstImage"
//               alt="Person_Senftube"
//             />
//           )}
//           actual={({ imageProps }) => (
//             <img {...imageProps} alt="Person_Senftube" />
//           )}
//         />
//         <div className="SVGweb" alt="TopPath">
//           <img src={Mountain} className="Mountain" alt="Mountain" />

//           <div>
//             <span className="title1Web">
//               Du hast Ideen für <br /> dein Kölner Veedel?
//             </span>

//             <span className="subTitle1Web">
//               Hier kannst du deine Ideen teilen und die der anderen sehen; in
//               den Dialog treten und für Ideen, die dir gefallen stimmen!
//             </span>
//           </div>
//           <span className="title2Web">Eure Stimmen können laut werden!</span>
//           <span className="subTitle2Web">
//             Sowohl den Stadtvertreter:innen als auch euch wollen wir hier
//             Bürger-Know-How vermitteln. Lasst die Stadt Köln eure Ideen hören!
//           </span>
//           <span className="title3Web">
//             Du willst das Projekt <br /> unterstützen?
//           </span>
//           <span className="subTitle3Web">
//             Lass uns quatschen! Wir können jegliche Unterstützung gebrauchen.
//             Und jegliches Feedback!
//           </span>
//         </div>
//       </div>
//     ) : (
//       <div className="white">
//         <div className="spinnerDiv">
//           <CircularProgress size={50} thickness={2} />
//           {/* <img src={lamploader} className="lamploader" alt="LikeIcon" /> */}
//         </div>
//       </div>
//     );

//     return <div>{start}</div>;
//   }
// }

// const mapStateToProps = (state) => ({
//   data: state.data,
// });

// export default connect(mapStateToProps)(withStyles(styles)(info));
