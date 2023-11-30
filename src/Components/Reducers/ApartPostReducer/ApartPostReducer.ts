import { FormType } from "../../FormComponent/FormComponent";
import { SET_APART_POST } from "../PostsReducer/PostsActions";

const initialState: FormType = {
  email: "",
  title: "",
  post: "",
};

export interface ActionTypeApart {
  type: string;
  payload: FormType;
}

const apartPostReducer = (state = initialState, action: ActionTypeApart) => {
  switch (action.type) {
    case SET_APART_POST:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export { apartPostReducer };
