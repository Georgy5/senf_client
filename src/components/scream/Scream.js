/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

//TIMESTAMP
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// COMPONENTS
import LikeButton from "./LikeButton";
import SignNote from "../profile/SignNote";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Icons
import ChatBorder from "../../images/icons/chat.png";

// Redux
import { connect } from "react-redux";

import { openScream } from "../../redux/actions/screamActions";

import { openProject } from "../../redux/actions/projectActions";

const styles = {
  gradient: {
    width: "100%",
    height: "100px",
    position: "absolute",
    bottom: 0,

    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)",
  },

  gradient2: {
    width: "80%",
    height: "50px",
    position: "absolute",
    bottom: "50px",

    background:
      "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 100%)",
  },
  yellow: {
    color: "rgb(100, 100, 100, 0.5)",
  },

  line: {
    position: "absolute",
    left: "85%",
    top: "0%",
    width: "1px",
    backgroundColor: "#d5dadd",
    height: "100%",
  },

  likeButton: {
    zIndex: 10,
    position: "relative",
    left: "0%",
    // width: "15vw",
    // height: "15vw",
    top: "10%",
  },
  likeButtonWrapper: {
    zIndex: 10,
    position: "absolute",
    left: "85%",
    // width: "15vw",
    top: "10%",
    textAlign: "center",
  },
  commentButtonWrapper: {
    top: "55%",
    position: "absolute",
    left: "85%",
    zIndex: 0,
  },

  commentButtonWrapperNotAuthenticated: {
    top: "55%",
    position: "absolute",
    left: "85%",
    zIndex: 10,
  },
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: "12em",
    maxWidth: "95%",
    borderRadius: 20,
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0)",
    maxHeight: "14.5em",
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 15,
    color: "rgb(87, 87, 87)",
    width: "95%",

    objectFit: "cover",
  },

  bodytext: {
    position: "relative",
    width: "85%",
    fontSize: "14pt",
    overflow: "hidden",
    maxHeight: "3.6em",
    textOverflow: "-o-ellipsis-lastline",
  },

  engagement: {
    paddingRight: 10,
    width: "100%",
    textAlign: "center",
    fontSize: 14,
    color: "black",
  },

  locationOuter: {
    float: "left",
    marginLeft: "10px",
    color: "rgb(255, 205, 6)",
    height: "3vh",
  },
  locationHeader: {
    color: "rgb(255, 205, 6)",
    float: "left",
    paddingRight: "2%",
    width: "100%",
  },
  locationIcon: {
    marginTop: "-2px",
    float: "left",
    color: "rgb(255, 205, 6)",
  },
};

class Scream extends Component {
  state = {
    cardHeight: {},
  };

  fetchDataScream = (screamId) => {
    this.props.openScream(screamId);
  };

  openProject = (project) => {
    this.props.openProject(project);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      projectsData,
      scream: {
        title,
        body,
        screamId,
        likeCount,
        commentCount,
        Stadtteil,
        project,
        Thema,
      },
      user: { authenticated },
    } = this.props;

    const neuladen =
      Stadtteil === undefined ? (
        <span
          style={{
            left: "0",
            position: "relative",
            margintop: "5px",
            float: "left",
            color: "rgb(255, 205, 6)",
          }}
        >
          Aktualisiere die Seite
        </span>
      ) : null;

    const commentButton = !authenticated ? (
      <div
        className={classes.commentButtonWrapperNotAuthenticated}
        style={project && projectsData ? { top: "100px" } : {}}
      >
        <div className={classes.commentButton}>
          <MyButton>
            <SignNote />
            <img src={ChatBorder} width="100%" alt="ChatIcon" />
          </MyButton>
        </div>
        <div className={classes.engagement}>{commentCount}</div>
      </div>
    ) : (
      <div
        className={classes.commentButtonWrapper}
        style={project && projectsData ? { top: "100px" } : {}}
      >
        <div className={classes.commentButton}>
          <MyButton>
            <img src={ChatBorder} width="100%" alt="ChatIcon" />
          </MyButton>
        </div>
        <div className={classes.engagement}>{commentCount}</div>
      </div>
    );

    const colorNew =
      Thema === "Rad"
        ? "#929df6"
        : Thema === "Verkehr"
        ? "#91dff4"
        : Thema === "Umwelt und Grün"
        ? "#8dd9b8"
        : Thema === "Sport / Freizeit"
        ? "#f6c095"
        : Thema === "Inklusion / Soziales"
        ? "#e8907e"
        : Thema === "Versorgung"
        ? "#bd98f6"
        : "#f9db95";

    const projectsDataFinal = [];
    if (projectsData) {
      const projectsDataArray = projectsData;

      projectsDataArray.forEach((element) => {
        if (project === element.project) {
          projectsDataFinal.push(element.title);
        }
      });
    }
    // else {
    //   const projectsDataArray = projectsData;

    //   projectsDataArray.forEach((element) => {
    //     projectsDataFinal.push(project);
    //   });
    // }
    const projectTitle =
      project && projectsData ? (
        <>
          <div className={classes.gradient2}></div>
          <button
            className="screamcardProjectContainer buttonWide "
            onClick={() => this.openProject(project)}
          >
            {projectsDataFinal}
          </button>
        </>
      ) : null;

    return (
      <Card
        className={classes.card}
        style={project && projectsData ? { height: "23em" } : {}}
      >
        <CardContent className={classes.content}>
          {neuladen}
          <div
            style={{
              width: "15px",
              position: "relative",
              height: "15px",
              margintop: "5px",
              borderRadius: "100%",
              border: "0.5px white solid",
              backgroundColor: colorNew,
              opacity: "1",
              float: "left",
            }}
          />{" "}
          <div className={classes.locationOuter}>
            <div className={classes.locationHeader}> {Stadtteil} </div>
          </div>
          <div className="screamcardTitle">{title} </div>
          <div className="bodytext">{body}</div>
          <div className={classes.gradient}></div>
          <div className={classes.line} />
          <div
            className={classes.likeButtonWrapper}
            style={project && projectsData ? { top: "10px" } : {}}
          >
            <div className={classes.likeButton}>
              <LikeButton screamId={screamId} />
            </div>
            <div className={classes.engagement}>{likeCount} </div>
          </div>
          {commentButton}
          <br />
          {projectTitle}
          <button
            onClick={() => this.fetchDataScream(screamId)}
            className="buttonExpand ripple"
          ></button>
          {/* <ScreamDialog
            screamId={screamId}
            userHandle={userHandle}
            lat={lat}
            long={long}
            openDialog={this.props.openDialog}
          /> */}
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
  openScream: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  openScream,
  openProject,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));
