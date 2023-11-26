import { Button, Paper, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../Reducers/UserReducer/UserActions";
import { RootState } from "../Reducers/RootReducer/RootReducer";

const Header = () => {
  const { auth } = useSelector((state: RootState) => state.firebaseReducer);
  const { user } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch<any>();
  return (
    <Paper sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
      Header
      {user ? (
        <Typography component={"h5"}>Hello, {user.name}</Typography>
      ) : (
        <Button variant="text" onClick={() => dispatch(signIn(auth))}>
          Sign In
        </Button>
      )}
    </Paper>
  );
};

export default Header;
