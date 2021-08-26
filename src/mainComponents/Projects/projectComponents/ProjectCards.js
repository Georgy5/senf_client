/** @format */

import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";
import { openProject } from "../../../redux/actions/projectActions";

import "./ProjectCards.css";

const styles = {};

class ProjectCards extends Component {
  pushScreamId = (project) => {
    this.props.openProject(project);
  };

  render() {
    const {
      project: { title, owner, imgUrl, project, startDate, endDate },
    } = this.props;

    const dateComponent = endDate ? (
      <div className="date">
        {" "}
        {startDate} – {endDate}{" "}
      </div>
    ) : (
      <div className="date">{startDate} </div>
    );
    return (
      <div className="projectCard">
        <button
          onClick={() => this.pushScreamId(project)}
          className="buttonExpand ripple"
        ></button>

        <div className="leftWrapper">
          <img
            src={imgUrl}
            width="100%"
            alt="profile"
            className="profile-image"
          />
        </div>
        <div className="rightWrapper">
          <div className="owner"> {owner} </div>
          <div className="title">{title}</div>

          {dateComponent}
        </div>
      </div>
    );
  }
}

ProjectCards.propTypes = {
  user: PropTypes.object.isRequired,

  project: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  openProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  openProject,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProjectCards));
