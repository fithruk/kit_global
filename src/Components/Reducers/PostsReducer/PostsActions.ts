import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../RootReducer/RootReducer";
import { AnyAction } from "redux";
import {
  addNewPost,
  loadAllPosts,
  loadOnePost,
  updateExistPost,
  removeExistingPost,
} from "../../ApiService/ApiService";
import { FormType } from "../../FormComponent/FormComponent";
import { PostAction } from "./PostsReducer";

const LOAD_ALL_POSTS = "LOAD_ALL_POSTS";
const SET_APART_POST = "SET_APART_POST";
const ABORT_POSTS = "ABORT_POSTS";

const createNewPost = (userData: FormType) => {
  return async (
    dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
    getState: () => RootState
  ) => {
    await addNewPost(getState(), userData);
    dispatch({ type: ABORT_POSTS });
    dispatch(getAllPosts());
  };
};

const getAllPosts = () => {
  return async (
    dispatch: ThunkDispatch<RootState, undefined, PostAction>,
    getState: () => RootState
  ) => {
    const posts = await loadAllPosts(getState());
    if (Array.isArray(posts)) {
      return dispatch({ type: LOAD_ALL_POSTS, payload: posts });
    }
    dispatch({ type: LOAD_ALL_POSTS, payload: [] });
  };
};

const getOnePost = (id: string) => {
  return async (
    dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
    getState: () => RootState
  ) => {
    const post = await loadOnePost(getState(), id);

    dispatch({ type: SET_APART_POST, payload: post });
    dispatch({ type: ABORT_POSTS });
  };
};

const updatePost = (id: string, userData: FormType) => {
  return async (
    dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
    getState: () => RootState
  ) => {
    await updateExistPost(getState(), id, userData);
    dispatch(getOnePost(id));
  };
};

const removePost = (id: string) => {
  return async (getState: () => RootState) => {
    await removeExistingPost(getState(), id);
  };
};

export {
  LOAD_ALL_POSTS,
  SET_APART_POST,
  ABORT_POSTS,
  createNewPost,
  getAllPosts,
  getOnePost,
  updatePost,
  removePost,
};
