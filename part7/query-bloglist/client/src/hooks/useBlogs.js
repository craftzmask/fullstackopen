import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNotificationActions } from "./useNotification";

export const useBlogs = () => {
  const queyrClient = useQueryClient();
  const { notify } = useNotificationActions();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (blog) => {
      queyrClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      notify(error.response.data.error, "error");
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: blogService.like,
    onSuccess: () => {
      queyrClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      notify(error.response.data.error, "error");
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queyrClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      notify(error.response.data.error, "error");
    },
  });

  return {
    blogs: result.data,
    isPending: result.isPending,
    addBlog: (blog) => newBlogMutation.mutate(blog),
    likeBlog: (blog) => likeBlogMutation.mutate(blog),
    deleteBlog: (blog) => deleteBlogMutation.mutate(blog.id),
  };
};
