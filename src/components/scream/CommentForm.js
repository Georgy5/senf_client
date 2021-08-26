/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// Redux stuff
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/commentActions";
import LikeButton from "./LikeButton";

const styles = {
  textField: {
    position: "absolute",
    bottom: "5px",
    marginLeft: "20%",
    width: "56%",

    float: "left",
    color: "white",
    marginTop: "10px",
    backgroundColor: "rgb(250,250,250,0.9)",
  },

  button: {
    position: "absolute",
    color: "white",
    height: "40px",
    width: "70px",
    bottom: "10px",

    right: "10px",
    boxShadow: "none",
    borderRadius: "20px",
    textTransform: "none",
  },
  progress: {
    zIndex: 99999,
  },
};

class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.clicked) {
      document.getElementById("outlined-name").focus();
    }
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    console.log(this.props);
    event.preventDefault();
    this.props.submitComment(
      this.props.screamId,
      { body: this.state.body },
      this.props.user
    );
    this.setState({
      loading: true,
    });
  };

  render() {
    const { classes, authenticated, screamId } = this.props;

    const errors = this.state.errors;

    // if (clicked) {
    //   this.handleChange;
    // }

    const commentFormMarkup = authenticated ? (
      <div className="commentFormWrapper">
        <div className="buttonLikeFixed">
          <LikeButton screamId={screamId} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Was ist deine Meinung?"
            id="outlined-name"
            margin="dense"
            variant="outlined"
            error={errors.comment ? true : false}
            // helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            multiline
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Senden
          </Button>

          {/* {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )} */}
        </form>
      </div>
    ) : null;

    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  user: state.user,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
