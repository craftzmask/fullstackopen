import { useQueryClient } from "@tanstack/react-query";
import { useField } from "../hooks";
import blogService from "../services/blogs";

const CommentForm = ({ blogId }) => {
  const comment = useField("text");
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await blogService.comment(blogId, comment.inputProps.value);
    await queryClient.invalidateQueries({ queryKey: ["blogs"] });
    comment.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {...comment.inputProps} />
      <button type="submit">add comment</button>
    </form>
  );
};

export default CommentForm;
