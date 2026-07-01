import { create } from "zustand";
import api from '../lib/axios'
const useAuthStore = create((set) => ({
    user: null,
    token: null,
    loading: false,
    posts: null,
    signup: async (credentials) => {
        set({ loading: true })
        const { data } = await api.post('/users', credentials)
        set({
            user: data.user,
            token: data.token,
            loading: false
        })
    },
    login: async (credentials) => {
        try {
            set({ loading: true })
            const { data } = await api.post('/users/auth', credentials)
            localStorage.setItem("token", data.token)
            set({
                user: data.user,
                token: data.token,
                loading: false
            })
        } catch (error) {
            set({ loading: false, error })
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null })
    },
}))

export default useAuthStore