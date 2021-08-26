/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

// REDUX Stuff
import { connect } from "react-redux";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "0%",
    top: "0%",
    width: "100%",
    height: "100%",
  },

  paper: {
    borderRadius: "20px",
    height: "150px",
    width: "90vw",
    maxWidth: "400px",
  },
  confirmButton: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "70%",
    clear: "both",
    color: "red",
  },
  line: {
    height: 1,
    width: "100%",

    backgroundColor: "grey",
  },
  cancelButton: {
    fontSize: 20,
    clear: "both",
    textAlign: "center",
    textTransform: "none",
    width: "100%",
    height: "30%",
  },
};

class ReportScream extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  reportScream = () => {
    const userHandle = this.props.userHandle;
    const screamId = this.props.screamId;
    const thisPath = `/users/${userHandle}/scream/${screamId}`;
    const siteLink = "senf.koeln" + thisPath;

    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Meldung: Beitrag beinhaltet unangebrachten Inhalt ") +
      "&body=" +
      escape(
        "Dieser Beitrag beinhaltet unangebrachten Inhalt:" +
          "\n" +
          "\n" +
          siteLink
      );
    window.location.href = link;
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Scream"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        ></MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          width="md"
          BackdropProps={{ classes: { root: classes.root } }}
          PaperProps={{ classes: { root: classes.paper } }}
        >
          <Button className={classes.confirmButton} onClick={this.reportScream}>
            Melden
          </Button>
          <div className={classes.line} />
          <Button className={classes.cancelButton} onClick={this.handleClose}>
            Abbrechen
          </Button>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ReportScream);
