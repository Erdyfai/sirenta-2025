// src/stores/useParticipantStore.js
import { create } from 'zustand';
import { api } from '../services/api';
import { toast } from 'react-hot-toast';

const useParticipantStore = create((set, get) => ({
  profile: null,
  progress: [],
  sessionId: null,
  dashboardState: null,
  dashboardMessage: null,
  session: null,

  // TOAST CUMA UNTUK DEBUGGING
  fetchProfile: async () => {
    try {
      const response = await api.get('/participant/profile');
      set({ profile: response.data.user });
      toast.success('Profil berhasil dimuat');
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      toast.error('Gagal memuat profil');
    }
  },

  fetchProgress: async () => {
    try {
      const response = await api.get('/participant/progress');
      const { stages_progress, session_id } = response.data;
      set({ progress: stages_progress, sessionId: session_id });
      toast.success('Progress berhasil dimuat');
    } catch (error) {
      console.error('Failed to fetch progress:', error);
      toast.error('Gagal memuat progress');
    }
  },

  fetchDashboardStatus: async () => {
    try {
      const response = await api.get('/participant/dashboard-status');
      const { state, message, session } = response.data;
      set({ dashboardState: state, dashboardMessage: message, session});
      toast.success(`Status dashboard: ${state}`);
    } catch (error) {
      console.error('Failed to fetch dashboard status:', error);
      toast.error('Gagal memuat status dashboard');
    }
  },

registerParticipant: async ({ user_motivation, user_idea, file }) => {
  try {
    const formData = new FormData();
    formData.append('user_motivation', user_motivation);
    formData.append('user_idea', user_idea);
    formData.append('file', file); 

    const response = await api.post('/participant/registered', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    toast.success('Pendaftaran berhasil!');

    // Refresh data peserta setelah registrasi berhasil
    const { fetchDashboardStatus, fetchProgress } = get();
    await Promise.all([
      fetchDashboardStatus(),
      fetchProgress(),
    ]);
  } catch (error) {
    console.error('Gagal mendaftar:', error);
    const message = error?.response?.data?.message || 'Terjadi kesalahan saat mendaftar.';
    toast.error(message);
  }
},
}));

export default useParticipantStore;
