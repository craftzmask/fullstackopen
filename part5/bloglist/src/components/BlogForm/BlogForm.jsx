import { useBlog, useField } from "../../hooks";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";

const BlogForm = ({ onCloseForm }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const { createBlog } = useBlog();

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog({
      title: title.inputProps.value,
      author: author.inputProps.value,
      url: url.inputProps.value,
    });
    title.reset();
    author.reset();
    url.reset();
    onCloseForm();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Create New
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            id="title"
            label="Title"
            fullWidth
            // Spread your hook's value/onChange/etc. directly onto TextField
            {...title.inputProps}
            // Keep your test id on the native input
            inputProps={{ "data-testid": "title" }}
          />

          <TextField
            id="author"
            label="Author"
            fullWidth
            {...author.inputProps}
            inputProps={{ "data-testid": "author" }}
          />

          <TextField
            id="url"
            label="URL"
            fullWidth
            {...url.inputProps}
            inputProps={{ "data-testid": "url" }}
          />

          <Stack direction="row" spacing={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              data-testid="blog-button"
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default BlogForm;
