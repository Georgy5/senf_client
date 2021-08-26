/** @format */

import firebase from "firebase/app";
import "firebase/firestore";

import { LIKE_SCREAM, UNLIKE_SCREAM } from "../types";

// Like a scream
export const likeScream = (screamId, user) => async (dispatch) => {
  const db = firebase.firestore();
  const screamDocument = db.collection("screams").doc(screamId);
  const doc = await screamDocument.get();

  const commentsRef = await db
    .collection("comments")
    .where("screamId", "==", screamId)
    .orderBy("createdAt", "desc")
    .get();

  const likeDocument = await db
    .collection("likes")
    .where("userHandle", "==", user.credentials.handle)
    .where("screamId", "==", screamId)
    .limit(1)
    .get();

  if (!doc.exists) {
    console.log("No such document!");
  } else {
    const scream = doc.data();
    scream.screamId = doc.id;
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), commentId: doc.id })
    );

    if (likeDocument.exists) {
      console.log("already liked");
    } else {
      db.collection("likes").add({
        screamId: screamId,
        userHandle: user.credentials.handle,
        createdAt: new Date().toISOString(),
        sex: user.credentials.sex,
        age: user.credentials.age,
      });

      scream.likeCount++;
      screamDocument.update({ likeCount: scream.likeCount });

      dispatch({
        type: LIKE_SCREAM,
        payload: scream,
      });
    }
  }
};
// Unlike an idea
export const unlikeScream = (screamId, user) => async (dispatch) => {
  console.log(screamId, user);
  const db = firebase.firestore();
  const screamDocument = db.collection("screams").doc(screamId);
  const doc = await screamDocument.get();

  const commentsRef = await db
    .collection("comments")
    .where("screamId", "==", screamId)
    .orderBy("createdAt", "desc")
    .get();

  const likeDocument = await db
    .collection("likes")
    .where("userHandle", "==", user.credentials.handle)
    .where("screamId", "==", screamId)
    .limit(1)
    .get();

  if (!doc.exists) {
    console.log("No such document!");
  } else {
    const scream = doc.data();
    scream.screamId = doc.id;
    scream.comments = [];

    commentsRef.forEach((doc) =>
      scream.comments.push({ ...doc.data(), commentId: doc.id })
    );

    if (likeDocument.docs[0].id === undefined) {
      console.log("scream not liked");
    } else {
      db.collection("likes").doc(likeDocument.docs[0].id).delete();

      scream.likeCount--;
      screamDocument.update({ likeCount: scream.likeCount });

      dispatch({
        type: UNLIKE_SCREAM,
        payload: scream,
      });
    }
  }
};
