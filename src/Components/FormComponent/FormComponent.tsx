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
  const [errors, setErrors] = useState<FormType | null>(null);
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const userData: FormType = { title, post, email: user.email };
      const validatedForm = FormSchema.parse(userData);
      dispatch<any>(createNewPost(validatedForm));
      setTitle("");
      setPost("");
      setErrors(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // setErrors(error.formErrors.fieldErrors);
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

// import React, { useState } from 'react';
// import { Button, TextField, Box } from '@mui/material';
// import { z } from 'zod';

// const FormSchema = z.object({
//   title: z.string().nonempty({ message: 'Title is required' }),
//   post: z.string().nonempty({ message: 'Post is required' }),
// });

// type FormType = z.infer<typeof FormSchema>;

// const FormComponent: React.FC = () => {
//   const [form, setForm] = useState<FormType>({ title: '', post: '' });
//   const [errors, setErrors] = useState<FormType | null>(null);

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();

//     try {
//       const validatedForm = FormSchema.parse(form);
//       console.log(validatedForm);
//       setErrors(null);
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         setErrors(error.formErrors.fieldErrors);
//       }
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
//       <TextField
//         id="title"
//         label="Title"
//         value={form.title}
//         onChange={(e) => setForm({ ...form, title: e.target.value })}
//         error={!!errors?.title}
//         helperText={errors?.title}
//       />
//       <TextField
//         id="post"
//         label="Post"
//         value={form.post}
//         onChange={(e) => setForm({ ...form, post: e.target.value })}
//         error={!!errors?.post}
//         helperText={errors?.post}
//       />
//       <Button type="submit">Submit</Button>
//     </Box>
//   );
// };

// export default FormComponent;
