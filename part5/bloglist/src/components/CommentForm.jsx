import { useState } from "react";
import { Box, Stack, TextField, Alert } from "@mui/material";
import { Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useField } from "../hooks";
import blogService from "../services/blogs";

const CommentForm = ({ blogId }) => {
  const comment = useField("text");
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSubmitting(true);
    try {
      await blogService.comment(blogId, comment.inputProps.value);
      await queryClient.invalidateQueries({ queryKey: ["blogs"] });
      comment.reset();
    } catch (error) {
      setErr(error?.message || "Failed to add comment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={1}>
        <TextField
          fullWidth
          placeholder="Add a comment"
          multiline
          minRows={1}
          {...comment.inputProps} // value / onChange from your hook
        />
        <Button
          type="submit"
          variant="contained"
          loading={submitting}
          sx={{ width: 160 }}
        >
          Add
        </Button>
      </Stack>

      {err && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {err}
        </Alert>
      )}
    </Box>
  );
};

export default CommentForm;
