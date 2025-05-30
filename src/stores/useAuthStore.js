import { create } from 'zustand';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export const useAuthStore = create(
  (set, get) => ({
    authUser: null,
    isCheckingAuth: false,
    isLoggingIn: false,

    login: async ({ nim, password }) => {
      set({ isLoggingIn: true });
      try {
        await api.post('/auth/login', { nim, password });
        await get().checkAuth();
        toast.success('Login berhasil');
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Login gagal');
        set({ authUser: null });
      } finally {
        set({ isLoggingIn: false });
      }
    },

    logout: async () => {
      try {
        await api.post('/auth/logout');
        set({ authUser: null });
        toast.success('Logout berhasil');
      } catch {
        toast.error('Logout gagal');
      }
    },

    checkAuth: async () => {
      set({ isCheckingAuth: true });
      try {
        const res = await api.get('/auth/check');
        set({ authUser: res.data });
      } catch {
        // Cookie bisa expired, jadi fallback ke null
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },
  }),
);
