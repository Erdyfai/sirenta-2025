import { create } from 'zustand';
import { api } from '../services/api';
import { toast } from 'react-hot-toast';

const useAdminStore = create((set, get) => ({
  sessions: [],
  usersInStage: [],
  currentStageName: '',
  currentStageStatus: '',
  stageInfoContent: '',
  loadingSessions: false,
  loadingUsers: false,
  loadingStageInfo: false,

  // Fetch semua sesi rekrutmen
  fetchRecruitmentSessions: async () => {
    set({ loadingSessions: true });
    try {
      const res = await api.get('/admin/get/recruitment-sessions');
      set({ sessions: res.data });
      toast.success('Sesi rekrutmen berhasil dimuat');
    } catch (err) {
      console.error('Failed to fetch recruitment sessions:', err);
      toast.error('Gagal memuat sesi rekrutmen');
    } finally {
      set({ loadingSessions: false });
    }
  },

  // Fetch peserta dalam tahap tertentu
  fetchUsersInStage: async (sessionId, stageId) => {
    set({ loadingUsers: true });
    try {
      const res = await api.get(`/admin/stage-users/${sessionId}/${stageId}`);
      set({ 
        usersInStage: res.data.data,
        currentStageName: res.data.stage_name,
        currentStageStatus: res.data.stage_status
      });
      toast.success('Peserta tahap berhasil dimuat');
    } catch (err) {
      console.error('Failed to fetch users in stage:', err);
      toast.error('Gagal memuat peserta tahap');
    } finally {
      set({ loadingUsers: false });
    }
  },

  // Buat sesi rekrutmen baru
  createRecruitmentSession: async (payload) => {
    try {
      const res = await api.post('/admin/create/recruitment-sessions', payload);
      toast.success('Sesi berhasil ditambahkan');
      set((state) => ({
        sessions: [res.data.session, ...state.sessions],
      }));
      return res.data;
    } catch (err) {
      console.error('Gagal menambahkan sesi:', err);
      toast.error('Gagal menambahkan sesi');
      throw err;
    }
  },

  updateRecruitmentSession: async (sessionId, payload) => {
    try {
      const res = await api.put(`/admin/update/recruitment-sessions/${sessionId}`, payload);
      toast.success('Sesi berhasil diperbarui');
      set((state) => ({
        sessions: state.sessions.map((sesi) =>
          sesi.id === sessionId ? res.data.updatedSession : sesi
        ),
      }));
      return res.data;
    } catch (err) {
      console.error('Gagal memperbarui sesi:', err);
      toast.error('Gagal memperbarui sesi');
      throw err;
    }
  },

  updateStageStatus: async (stageId, status) => {
    try {
      const res = await api.put(`/admin/update/stages/${stageId}/status`, { status });
      set({ currentStageStatus: status });
      toast.success(`Tahap berhasil diubah menjadi ${status}`);
    } catch (err) {
      console.error('Gagal update status tahap:', err);
      toast.error('Gagal update status tahap');
    }
  },

resetStageParticipants: async (stageId) => {
    try {
      await api.put(`/admin/update/user-progress/${stageId}/reset-status`);
      set((state) => ({
        usersInStage: state.usersInStage.map((user) => ({
          ...user,
          status: 'in_progress',
        })),
      }));
      toast.success('Status semua peserta berhasil di-reset');
    } catch (err) {
      console.error('Gagal reset status peserta:', err);
      toast.error('Gagal reset status peserta');
    }
  },

  // 📄 Ambil data stage info
  fetchStageInfo: async (stageId) => {
    set({ loadingStageInfo: true });
    try {
      const res = await api.get(`/admin/get/stages/${stageId}/info`);
      const data = res.data.data || {};
      set({ stageInfoContent: data });
  
      if (res.data.message) {
        toast.success(res.data.message);
      }
  
      return data; // ✅ tambahkan ini
    } catch (err) {
      console.error('Gagal fetch stage info:', err);
      toast.error('Gagal memuat informasi tahap');
      set({ stageInfoContent: {} });
      return {}; // ✅ kembalikan object kosong agar tetap aman di .then()
    } finally {
      set({ loadingStageInfo: false });
    }
  },

  // ✏️ Tambah atau update stage info
  upsertStageInfo: async (stageId, contentByStatus) => {
    try {
      const res = await api.post(`/admin/upsert/stages/${stageId}/info`, {
        contents: Object.entries(contentByStatus).map(([status, content]) => ({
          status,
          content,
        })),
      });
  
      set({ stageInfoContent: contentByStatus });
  
      toast.success('Informasi tahap berhasil disimpan.');
    } catch (err) {
      console.error('Gagal simpan stage info:', err);
      toast.error('Gagal menyimpan informasi tahap');
    }
  },
  
  // Update status peserta tunggal
  updateUserProgressStatus: async (userId, stageId, newStatus) => {
    try {
      await api.patch(`/admin/update/user-progress/${userId}/${stageId}`, {
        status: newStatus
      });

      set((state) => {
        const updatedUsers = state.usersInStage.map(user =>
          user.id === userId ? { ...user, status: newStatus } : user
        );
        return { usersInStage: updatedUsers };
      });

      toast.success('Status peserta berhasil diperbarui');
    } catch (err) {
      console.error('Gagal memperbarui status peserta:', err);
      toast.error('Gagal memperbarui status peserta');
    }
  },

  // Reset
  clearUsersInStage: () => set({ usersInStage: [] }),
}));

export default useAdminStore;
