/** @format */

import firebase from "firebase/app";
import "firebase/firestore";
import { clearErrors } from "./errorsActions";
import { openProject } from "./projectActions";
import {
  SET_SCREAMS,
  LOADING_DATA,
  DELETE_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  EDIT_SCREAM,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  OPEN_SCREAM,
  CLOSE_SCREAM,
  SET_SCREAM_USER,
} from "../types";

// Get all ideas
export const getScreams = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });

  const db = firebase.firestore();
  const ref = await db.collection("screams").orderBy("createdAt", "desc").get();

  const screams = [];
  ref.docs.forEach((doc) => {
    const docData = {
      screamId: doc.id,
      lat: doc.data().lat,
      long: doc.data().long,
      title: doc.data().title,
      body: doc.data().body.substr(0, 170),
      createdAt: doc.data().createdAt,
      commentCount: doc.data().commentCount,
      likeCount: doc.data().likeCount,
      status: doc.data().status,
      Thema: doc.data().Thema,
      Stadtteil: doc.data().Stadtteil,
      project: doc.data().project,
      projectId: doc.data().project,
    };

    screams.push(docData);
  });

  dispatch({
    type: SET_SCREAMS,
    payload: screams,
  });
};

// Open an idea
export const openScream = (screamId) => async (dispatch) => {
  const db = firebase.firestore();
  const ref = await db.collection("screams").doc(screamId).get();
  const commentsRef = await db
    .collection("comments")
    .where("screamId", "==", screamId)
    .orderBy("createdAt", "desc")
    .get();

  if (!ref.exists) {
    console.log("No such document!");
  } else {
    const scream = ref.data();
    scream.screamId = ref.id;
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), commentId: doc.id })
    );

    window.location = "#" + scream.lat + "#" + scream.long;

    dispatch({ type: LOADING_UI });
    dispatch({ type: OPEN_SCREAM });
    const newPath = `/${screamId}`;
    window.history.pushState(null, null, newPath);
    dispatch({ type: SET_SCREAM, payload: scream });
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const closeScream = () => (dispatch) => {
  dispatch({ type: CLOSE_SCREAM });
  window.history.pushState(null, null, "/");

  setTimeout(() => {
    document.body.style.overflow = "scroll";
  }, 1000);
};

// Post an idea
export const postScream = (newScream, user, history) => async (dispatch) => {
  const db = firebase.firestore();

  dispatch({ type: LOADING_UI });

  if (newScream.title.trim() === "") {
    dispatch({
      type: SET_ERRORS,
      payload: { title: "" },
    });
  } else if (newScream.body.trim() === "") {
    dispatch({
      type: SET_ERRORS,
      payload: { body: "Beschreibung fehlt" },
    });
  } else {
    const newScreamData = {
      locationHeader: newScream.locationHeader,
      district: newScream.district,
      title: newScream.title,
      lat: newScream.lat,
      long: newScream.long,
      body: newScream.body,
      userHandle: user.credentials.handle,
      sex: user.credentials.sex,
      age: user.credentials.age,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0,
      status: "None",
      project: newScream.project,
    };

    if (newScream.Thema) newScreamData.Thema = newScream.Thema;
    if (newScream.weblinkTitle)
      newScreamData.weblinkTitle = newScream.weblinkTitle;
    if (newScream.weblink) newScreamData.weblink = newScream.weblink;
    if (newScream.contactTitle)
      newScreamData.contactTitle = newScream.contactTitle;
    if (newScream.contact) newScreamData.contact = newScream.contact;
    if (newScream.selectedUnix)
      newScreamData.selectedUnix = newScream.selectedUnix;

    await db
      .collection("screams")
      .add(newScreamData)
      .then((doc) => {
        const resScream = newScream;
        resScream.screamId = doc.id;

        dispatch({
          type: POST_SCREAM,
          payload: resScream,
        });

        setTimeout(() => {
          const project =
            window.location.pathname.indexOf("_") > 0
              ? window.location.pathname.substring(1)
              : "";

          if (project.indexOf("_") > 0) {
            dispatch(openProject(project));
          } else {
            history.push(`/${resScream.screamId}`);
            const screamId = resScream.screamId;
            dispatch(openScream(screamId));
          }
        }, 20);
      });
  }
};

// Edit your idea
export const editScream = (editScream) => async (dispatch) => {
  const db = firebase.firestore();
  dispatch({ type: LOADING_UI });
  const screamId = editScream.screamId;

  if (editScream.notes) {
    editScream.notes = editScream.notes;
  } else {
    delete editScream.notes;
  }

  await db
    .collection("screams")
    .doc(screamId)
    .update(editScream)
    .then((doc) => {
      dispatch({
        type: EDIT_SCREAM,
        payload: editScream,
      });
    });
  dispatch(openScream(screamId));
  dispatch(clearErrors());
};

// Delete your idea
export const deleteScream = (screamId, user) => async (dispatch) => {
  const db = firebase.firestore();
  const ref = db.collection("screams").doc(screamId);
  const doc = await ref.get();

  console.log(doc.data());

  if (!doc.exists) {
    console.log("Scream not found");
  }
  // else if (doc.data().userHandle !== user.credentials.handle) {
  //   console.log("Unauthorized", doc.data().handle, user.credentials.handle);
  //   // return res.status(403).json({ error: "Unauthorized" });
  // }
  else {
    dispatch({
      type: DELETE_SCREAM,
      payload: screamId,
    });
    ref.delete().then(() => {
      window.history.pushState(null, null, "/");
      window.location.reload(false);
      dispatch(clearErrors());
    });
  }
};

export const getUserEmail = (userHandle) => async (dispatch) => {
  const db = firebase.firestore();
  await db
    .collection("users")
    .doc(userHandle)
    .get()
    .then((doc) => {
      dispatch({
        type: SET_SCREAM_USER,
        payload: doc.data(),
      });
    });
};
