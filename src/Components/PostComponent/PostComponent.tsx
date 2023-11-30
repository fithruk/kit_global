import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FormComponent from "../FormComponent/FormComponent";
import { useSelector } from "react-redux";
import { RootState } from "../Reducers/RootReducer/RootReducer";

interface PostComponentType {
  id?: string;
  email: string;
  title: string;
  post: string;
  prev: boolean;
}

const formTitle = "Edit your post";

const PostComponent = ({ id, email, post, title, prev }: PostComponentType) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <>
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          margin: "10px 0",
          boxShadow: "1px 1px grey",
        }}
      >
        <Typography
          component={"h3"}
          sx={{ alignSelf: "start", fontWeight: "800" }}
        >
          {title}
        </Typography>
        {prev ? (
          <Typography
            component={"p"}
            sx={{
              textAlign: "start",
              alignSelf: "start",
              height: "100px",
              width: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {post}
          </Typography>
        ) : (
          <Typography
            component={"p"}
            sx={{
              alignSelf: "start",
              height: "auto",
              width: "100%",
            }}
          >
            {post}
          </Typography>
        )}
        <Typography
          component={"p"}
          sx={{
            alignSelf: "end",
          }}
        >
          {email}
        </Typography>
        {prev ? (
          <Link
            style={{ textDecoration: "none", color: "grey" }}
            to={`/post/${id}`}
          >
            see more
          </Link>
        ) : (
          <Link style={{ textDecoration: "none", color: "grey" }} to={`/`}>
            to all posts
          </Link>
        )}
      </Box>
      {user?.email === email && !prev && (
        <Box>
          <FormComponent user={user} formTitle={formTitle} id={id} />
        </Box>
      )}
    </>
  );
};

export default PostComponent;
