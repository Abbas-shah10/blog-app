import { create } from 'zustand'
import api from '../lib/axios'



const usePostStore = create((set) => ({
  posts: null,
  error: false,
  post: null,
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
  },
  getPost: async (postId) => {
    try {
      set({ loading: true })

      const userToken = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await api.get(`/posts/${postId}`, config);
      set({
        post: data.Post,
        loading: false,
      })
    } catch (error) {
      console.log(error.response?.data || error.message)
      set({ loading: false })
    }
  },
  updatePost: async (postId, postDetails) => {
    try {
      set({ loading: true })

      const userToken = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await api.patch(`/posts/${postId}`, postDetails, config);
      console.log(data)
      set((state) => ({
        posts: state.posts.map((post) => post.id === postId ? postDetails : post)
      }))
    } catch (error) {
      console.log(error.response?.data || error.message)
      set({ loading: false })
    }
  },
  deletePost: async (postId) => {
    try {
      set({ loading: true })

      const userToken = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      await api.delete(`/posts/${postId}`, config);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
        loading: false
      }))
    } catch (error) {
      console.log(error.response?.data || error.message)
      set({ loading: false })
    }
  }
}))

export default usePostStore;