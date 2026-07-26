import { create } from "zustand";
import blogService from "./services/blogs";

/** Notification Store */
export const useNotificationStore = create((set) => ({
  message: "",
  status: "",
  actions: {
    notify: (message, status, durationInSecs = 5) => {
      set(() => ({ message, status }));
      setTimeout(() => {
        set(() => ({ message: "", status: "" }));
      }, durationInSecs * 1000);
    },
  },
}));

export const useNotifcationActions = () => {
  return useNotificationStore((state) => state.actions);
};

/** Blog Store */
export const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    intializeBlogs: async () => {
      const blogs = await blogService.getAll();
      set(() => ({ blogs }));
    },
    createBlog: async (blog) => {
      const newBlog = await blogService.create(blog);
      set((state) => ({ blogs: state.blogs.concat(newBlog) }));
      return newBlog;
    },
  },
}));

export const useBlogActions = () => useBlogStore((state) => state.actions);
