/** @format */

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

//REDUX STUFF
import { connect } from "react-redux";
import { deleteComment } from "../../redux/actions/commentActions";

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

class DeleteComment extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteComment = () => {
    this.props.deleteComment(
      this.props.commentId,
      this.props.user,
      this.props.scream.screamId
    );
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Delete Comment"
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
          <Button
            className={classes.confirmButton}
            onClick={this.deleteComment}
          >
            Kommentar löschen
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

DeleteComment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  commentId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  deleteComment,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(DeleteComment));
