import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../RootReducer/RootReducer";
import { AnyAction } from "redux";
import { login } from "../../ApiService/ApiService";
import { Auth } from "firebase/auth";

const SET_USER = "SET_USER";

const signIn = (auth: Auth) => {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const user = await login(auth);
    dispatch({
      type: SET_USER,
      payload: { name: user?.displayName, email: user?.email },
    });
  };
};

export { SET_USER, signIn };
