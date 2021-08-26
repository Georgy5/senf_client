/** @format */

import React, { useState, useEffect } from "react";

//Components
import Keyindicators from "./graphs/Keyindicators";
import ThemenDialog from "./graphs/themendialog";
import StadttteilDialog from "./graphs/stadtteilDialog";
import AltersgruppeDialog from "./graphs/altersgruppeDialog";
import WordcloudDialog from "./graphs/wordcloudDialog";

//Images
import Themencover from "../../images/themencover.png";
import Stadtteilcover from "../../images/stadtteilcover.png";
import Keywordscover from "../../images/keywordscover.png";
import Altersgruppencover from "../../images/altersgruppencover.png";

import firebase from "firebase/app";
import "firebase/firestore";

const InsightsPage = ({ order }) => {
  const db = firebase.firestore();

  const [screams, setScreams] = useState("");
  const [likesLength, setLikesLength] = useState("");
  const [commentsLength, setCommentsLength] = useState("");

  const fetchDataScreams = async () => {
    const ref = await db
      .collection("screams")
      .orderBy("createdAt", "desc")
      .get();

    const screams = [];
    ref.docs.forEach((doc) => {
      const docData = {
        likeCount: doc.data().likeCount,
        Thema: doc.data().Thema,
        Stadtteil: doc.data().Stadtteil,
      };
      screams.push(docData);
    });

    setScreams(screams);
  };

  const fetchDataLikes = async () => {
    const ref = await db.collection("likes").orderBy("createdAt", "desc").get();
    const likesLength = ref.size;
    setLikesLength(likesLength);
  };

  const fetchDataComments = async () => {
    const ref = await db
      .collection("comments")
      .orderBy("createdAt", "desc")
      .get();
    const commentsLength = ref.size;
    setCommentsLength(commentsLength);
  };

  useEffect(() => {
    fetchDataScreams();
    fetchDataLikes();
    fetchDataComments();
  }, []);

  return order === 3 ? (
    <>
      <div className="MainAnimation2">
        <Keyindicators
          screams={screams}
          likesLength={likesLength}
          commentslength={commentsLength}
        />
        <div className="cover cover1">
          <img src={Themencover} width="100%" alt="Themencover" />
          <ThemenDialog screams={screams} />
        </div>
        <div className="cover cover2">
          <img src={Stadtteilcover} width="100%" alt="Themencover" />
          <StadttteilDialog screams={screams} />
        </div>

        <div className="cover cover4">
          <AltersgruppeDialog />
          <img src={Altersgruppencover} width="100%" alt="Themencover" />
        </div>
        <div className="cover cover3">
          <img src={Keywordscover} width="100%" alt="Themencover" />{" "}
          <WordcloudDialog />
        </div>
      </div>
    </>
  ) : null;
};

export default InsightsPage;
