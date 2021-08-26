/** @format */

import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  SET_COMMENTS,
  SET_COMMENT,
  DELETE_COMMENT,
  POST_SCREAM,
  EDIT_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  LOADING_PROJECTS_DATA,
  SET_PROJECTS,
  SET_PROJECT_SCREAMS,
  SET_SCREAM_USER,
  SET_FULL_SCREAMS,
  SET_COOKIES,
} from "../types";

const initialState = {
  projects: [],
  projectScreams: [],
  loadingProjectScreams: false,
  screams: [],
  scream: {},
  comment: {},
  like: {},
  loading: false,
  loadingProjects: false,
  scream_user: {},
  full_screams: [],
  cookie_settings: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };

    case SET_SCREAM_USER:
      return {
        ...state,
        scream_user: action.payload,
      };

    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM:
      let index_delete = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index_delete, 1);
      return {
        ...state,
      };

    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case SET_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };

    case DELETE_COMMENT:
      const listComments = state.scream.comments.filter(
        (comment) => comment.commentId !== action.payload
      );
      state.scream.comments = listComments;
      return {
        ...state,
      };

    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case EDIT_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments],
        },
      };

    case LOADING_PROJECTS_DATA:
      return {
        ...state,
        loadingProjects: true,
      };

    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loadingProjects: false,
      };

    case SET_PROJECT_SCREAMS:
      return {
        ...state,
        project: action.payload,
        // projectScreams: action.payload,
        // loadingProjectScreams: false,
      };

    case SET_FULL_SCREAMS:
      return {
        ...state,
        full_screams: action.payload,
        loading: false,
      };

    case SET_COOKIES:
      return {
        ...state,
        cookie_settings: action.payload,
      };

    default:
      return state;
  }
}
