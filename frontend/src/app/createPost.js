import { create } from 'zustand'
import api from '../lib/axios'



const usePostStore = create((set) => ({
  posts: null,
  error: false,
  getAllPosts: async () => {
    try {
      set({ loading: true });

      const userToken = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await api.get("/posts", config);

      console.log(data);

      set({
        posts: data.Posts,
        loading: false,
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
      set({ loading: false });
    }
  },
  createPost: async (credentials) => {
    set({ loading: true })
    const userToken = localStorage.getItem('token')

    const config = {
      headers: { Authorization: `Bearer ${userToken}` }
    };
    const { data } = await api.post("/posts", credentials, config)

    set({
      posts: data.post,
      loading: false
    })
  }
}))

export default usePostStore;