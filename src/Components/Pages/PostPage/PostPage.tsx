import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOnePost } from "../../Reducers/PostsReducer/PostsActions";
import Header from "../../Header/Header";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../Reducers/RootReducer/RootReducer";
import PostComponent from "../../PostComponent/PostComponent";
import { AppDispatch } from "../../Reducers/Store/Store";

const PostPage = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const apartPost = useSelector((state: RootState) => state.apartPostReducer);

  useEffect(() => {
    if (id) dispatch(getOnePost(id));
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        flexGrow: 1,
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <PostComponent
        id={id}
        email={apartPost.email}
        title={apartPost.title}
        post={apartPost.post}
        prev={false}
      />
    </Container>
  );
};

export default PostPage;
