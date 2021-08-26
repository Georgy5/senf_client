/** @format */

import React from "react";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/likeActions";
import PropTypes from "prop-types";

//Components
import MyButton from "../../util/MyButton";
import WishNote from "../modals/WishNote";
import SignNote from "../profile/SignNote";

//Images
import HandBorder from "../../images/icons/handsnoclap.png";
import HandFull from "../../images/icons/handsFull.png";

const LikeButton = ({ screamId }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);

  const likedScream = () => {
    if (user.likes && user.likes.find((like) => like.screamId === screamId))
      return true;
    else return false;
  };

  const likeButton = !user.authenticated ? (
    <MyButton>
      <SignNote />
      <img src={HandBorder} width="100%" alt="LikeIcon" />
    </MyButton>
  ) : likedScream() ? (
    <MyButton onClick={() => dispatch(unlikeScream(screamId, user))}>
      <img src={HandFull} width="100%" alt="LikeIcon" />
      <WishNote />
    </MyButton>
  ) : (
    <MyButton onClick={() => dispatch(likeScream(screamId, user))}>
      <img src={HandBorder} width="100%" alt="LikeIcon" />
      <WishNote />
    </MyButton>
  );
  return likeButton;
};

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

export default LikeButton;
