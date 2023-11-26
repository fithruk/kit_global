import {
  Box,
  Button,
  TextField,
  Typography,
  TextareaAutosize,
} from "@mui/material";
import { z } from "zod";
import { useState } from "react";
import { User } from "../Reducers/UserReducer/UserReducer";
import { createNewPost } from "../Reducers/PostsReducer/PostsActions";

import { useDispatch } from "react-redux";

const FormSchema = z.object({
  email: z.string().email(),
  title: z.string().min(1),
  post: z.string().min(1),
});

interface FormComponentProps {
  user: User;
}

export type FormType = z.infer<typeof FormSchema>;

const FormComponent: React.FC<FormComponentProps> = ({ user }) => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const userData: FormType = { title, post, email: user.email };
      const validatedForm = FormSchema.parse(userData);
      dispatch<any>(createNewPost(validatedForm));
      setTitle("");
      setPost("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errArr = Object.entries(error.formErrors.fieldErrors);
        errArr.forEach((err) => alert(`Field ${err[0]} ${err[1]}`));
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Typography component={"h4"}>Create new post</Typography>
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
        // label="Post"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default FormComponent;
