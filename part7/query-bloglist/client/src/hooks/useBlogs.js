import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import blogService from "../services/blogs";

export const useBlogs = () => {
  const queyrClient = useQueryClient();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queyrClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  return {
    blogs: result.data,
    isPending: result.isPending,
    addBlog: (newBlog) => newBlogMutation.mutate(newBlog),
  };
};
