import { SET_USER } from "./UserActions";

export interface User {
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
}

interface Action {
  type: string;
  payload: User;
}

const initialState: UserState = { user: null };

const userReducer = (state = initialState, action: Action): UserState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

export { userReducer };
