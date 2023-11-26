import { Container, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import Header from "../../Header/Header";
import FormComponent from "../../FormComponent/FormComponent";
import { RootState } from "../../Reducers/RootReducer/RootReducer";
import PostsComponent from "../../PostsComponent/PostsComponent";

const BlogPage = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  return (
    <Container
      maxWidth="lg"
      sx={{ flexGrow: 1, display: "flex", minHeight: "100vh" }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} md={user ? 8 : 12}>
          <PostsComponent />
        </Grid>
        {user && (
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
              <FormComponent user={user} />
            </Paper>
          </Grid>
        )}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
            Footer
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogPage;
