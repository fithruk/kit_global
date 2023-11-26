import { FormType } from "../../FormComponent/FormComponent";
import { SET_APART_POST } from "../PostsReducer/PostsActions";

const initialState: FormType = {
  email: "",
  title: "",
  post: "",
};

interface ActionType {
  type: string;
  payload: FormType;
}

const apartPostReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_APART_POST:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export { apartPostReducer };
