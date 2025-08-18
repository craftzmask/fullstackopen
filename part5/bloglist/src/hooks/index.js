import { useNotificationDispatch } from "../components/reducers/notificationReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

export const useNotify = () => {
  const dispatch = useNotificationDispatch();

  const set = (message, status) => {
    dispatch({
      type: "SET",
      payload: { message, status },
    });

    setTimeout(() => {
      dispatch({ type: "REMOVE" });
    }, 5000);
  };

  return { set };
};

export const useBlog = () => {
  const queryClient = useQueryClient();
  const notification = useNotify();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notification.set(`a new blog ${newBlog.title} added`, "success");
    },
    onError: (exception) => {
      notification.set(exception.response.data.error, "error");
    },
  });

  const likeMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notification.set(`Liked the blog ${blog.title}`, "success");
    },
    onError: (exception) => {
      notification.set(exception.response.data.error, "error");
    },
  });

  const removeMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, blog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      notification.set(`Removed the blog ${blog.title}`, "success");
    },
    onError: (exception) => {
      notification.set(exception.response.data.error, "error");
    },
  });

  const createBlog = (blog) => {
    newBlogMutation.mutate(blog);
  };

  const likeBlog = (blog, user) => {
    likeMutation.mutate({
      ...blog,
      user: user.id,
      likes: blog.likes + 1,
    });
  };

  const removeBlog = (blog) => {
    if (confirm(`Remove ${blog.title}?`)) {
      removeMutation.mutate(blog);
    }
  };

  return {
    createBlog,
    likeBlog,
    removeBlog,
  };
};
