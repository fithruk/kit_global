import { combineReducers } from "redux";
import { firebaseReducer } from "../FireBaseReducer/FirebaseReducer";
import { userReducer } from "../UserReducer/UserReducer";
import { postReducer } from "../PostsReducer/PostsReducer";
import { apartPostReducer } from "../ApartPostReducer/ApartPostReducer";

export const rootReducer = combineReducers({
  firebaseReducer,
  userReducer,
  postReducer,
  apartPostReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
