import { Paper } from "@mui/material";
import { useEffect } from "react";
import { getAllPosts } from "../Reducers/PostsReducer/PostsActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Reducers/RootReducer/RootReducer";
import PostComponent from "../PostComponent/PostComponent";

const PostsComponent = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.postReducer);
  useEffect(() => {
    dispatch<any>(getAllPosts());
  }, []);
  console.log(posts);

  return (
    <Paper sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
      {posts.map((post) => (
        <PostComponent
          key={post.id}
          id={post.id}
          email={post.data.email}
          title={post.data.title}
          post={post.data.post}
          prev={true}
        />
      ))}
    </Paper>
  );
};

export default PostsComponent;
