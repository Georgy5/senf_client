/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

//REDUX STUFF
import { connect } from "react-redux";
import { deleteScream } from "../../../redux/actions/screamActions";
import EditScream from "./EditScream";

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
    width: "90%",

    margin: "2.5%",
    maxWidth: "370px",
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
    height: "50px",
  },
};

class MenuScream extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteScream = () => {
    var answer = window.confirm(
      "Bist du sicher, dass du die Idee löschen möchtest?"
    );
    if (answer) {
      this.props.deleteScream(this.props.screamId, this.props.history);

      //some code
    } else {
      //some code
    }

    // this.setState({ open: false });
    // window.location.reload(false);
  };

  render() {
    const { classes, scream } = this.props;

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
          <EditScream editScream={this.editScream} scream={scream}></EditScream>

          <Button className={classes.confirmButton} onClick={this.deleteScream}>
            Idee löschen
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

MenuScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default connect(null, { deleteScream })(withStyles(styles)(MenuScream));
