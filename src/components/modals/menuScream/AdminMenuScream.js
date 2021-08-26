/** @format */

import React, { Fragment, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../../util/MyButton";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

//REDUX STUFF
import { deleteScream } from "../../../redux/actions/screamActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

import AdminEditScream from "./AdminEditScream";

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

const AdminMenuScream = ({
  classes,
  screamId,
  scream,
  userHandle,
  isAdmin,
  isModerator,
}) => {
  const [open, setOpen] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const history = useHistory();

  const handleDeleteScream = () => {
    var answer = window.confirm(
      "Bist du sicher, dass du die Idee löschen möchtest?"
    );
    if (answer) {
      dispatch(deleteScream(screamId, user, history));
    }
  };

  const reportScream = () => {
    const thisPath = `/${screamId}`;
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

  const options = isAdmin ? (
    <>
      <AdminEditScream scream={scream} isAdmin={true}></AdminEditScream>

      <Button className={classes.confirmButton} onClick={reportScream}>
        Idee melden
      </Button>

      <Button className={classes.confirmButton} onClick={handleDeleteScream}>
        Idee löschen
      </Button>
    </>
  ) : isModerator ? (
    <>
      <AdminEditScream scream={scream} isAdmin={false}></AdminEditScream>

      <Button className={classes.confirmButton} onClick={reportScream}>
        Idee melden
      </Button>
    </>
  ) : null;
  return (
    <Fragment>
      <MyButton
        tip="Delete Scream"
        onClick={() => setOpen(true)}
        btnClassName={classes.deleteButton}
      ></MyButton>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        width="md"
        BackdropProps={{ classes: { root: classes.root } }}
        PaperProps={{ classes: { root: classes.paper } }}
      >
        {options}
        <div className={classes.line} />
        <Button className={classes.cancelButton} onClick={() => setOpen(false)}>
          Abbrechen
        </Button>
      </Dialog>
    </Fragment>
  );
};

AdminMenuScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
};

export default withStyles(styles)(AdminMenuScream);
