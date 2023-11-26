import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../RootReducer/RootReducer";
import { AnyAction } from "redux";
import {
  addNewPost,
  loadAllPosts,
  loadOnePost,
} from "../../ApiService/ApiService";
import { FormType } from "../../FormComponent/FormComponent";

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
    dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
    getState: () => RootState
  ) => {
    const posts = await loadAllPosts(getState());

    dispatch({ type: LOAD_ALL_POSTS, payload: posts });
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

export {
  LOAD_ALL_POSTS,
  SET_APART_POST,
  ABORT_POSTS,
  createNewPost,
  getAllPosts,
  getOnePost,
};
