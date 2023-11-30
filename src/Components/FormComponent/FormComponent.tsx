import {
  Box,
  Button,
  TextField,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";
import { User } from "../Reducers/UserReducer/UserReducer";
import {
  createNewPost,
  removePost,
  updatePost,
} from "../Reducers/PostsReducer/PostsActions";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../Reducers/Store/Store";

const FormSchema = z.object({
  email: z.string().email(),
  title: z.string().min(1),
  post: z.string().min(1),
});

interface FormComponentProps {
  user: User;
  formTitle?: string;
  id?: string;
}

export type FormType = z.infer<typeof FormSchema>;

const FormComponent: React.FC<FormComponentProps> = ({
  user,
  formTitle,
  id,
}) => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const userData: FormType = { title, post, email: user.email };
      const validatedForm = FormSchema.parse(userData);
      if (id) {
        dispatch(updatePost(id, validatedForm));
        setTitle("");
        setPost("");
        return;
      }
      dispatch(createNewPost(validatedForm));
      setTitle("");
      setPost("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errArr = Object.entries(error.formErrors.fieldErrors);
        errArr.forEach((err) => alert(`Field ${err[0]} ${err[1]}`));
      }
    }
  };

  const handleDelete = (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Delete this post?")) {
      dispatch(removePost(id));
      navigate("/");
    }
    return;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography component={"h4"} textAlign={"center"}>
        {" "}
        {formTitle ? formTitle : "Create new post"}
      </Typography>
      <TextField
        sx={{ margin: "0 0 10px 0" }}
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextareaAutosize
        style={{ padding: "16.5px 14px" }}
        id="post"
        minRows={5}
        placeholder="Enter your text..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ margin: "5px 0 5px 0" }}
      >
        Submit
      </Button>
      {id && (
        <Button
          variant="contained"
          color="warning"
          onClick={handleDelete.bind(null, id)}
        >
          Delete post
        </Button>
      )}
    </Box>
  );
};

export default FormComponent;
