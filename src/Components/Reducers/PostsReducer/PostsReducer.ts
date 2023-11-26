import { FormType } from "../../FormComponent/FormComponent";
import { LOAD_ALL_POSTS, ABORT_POSTS } from "./PostsActions";

export interface PostType {
  id?: string;
  data: FormType;
}

const initialState: PostType[] = [];

interface Action {
  type: string;
  payload: PostType[];
}

const postReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_ALL_POSTS:
      return [...state, ...action.payload];
    case ABORT_POSTS:
      return [];
    default:
      return state;
  }
};

export { postReducer };
