import { create } from 'zustand';
import { api } from '../services/api';
import { toast } from 'react-hot-toast';

const useJuryStore = create((set, get) => ({
  assignments: [],
  participantsByType: {},
  loading: false,

  // Ambil semua assignment dan peserta terkait
  fetchAssignmentsAndParticipants: async () => {
    try {
      set({ loading: true });

      const res = await api.get('/jury/ev-type');
      const assignments = res.data.data || [];
      set({ assignments });

      for (const item of assignments) {
        await get().fetchParticipants(item.evaluation_type);
      }

      toast.success('Hak penilaian dan peserta berhasil dimuat');
    } catch (error) {
      console.error('Gagal memuat data juri:', error);
      toast.error('Gagal memuat hak penilaian');
    } finally {
      set({ loading: false });
    }
  },

  // Ambil peserta berdasarkan evaluation type
  fetchParticipants: async (evaluationType) => {
    try {
      const res = await api.get(`/jury/participants/${evaluationType}`);
      const participants = res.data?.participants || [];
      const evaluation_type = res.data?.evaluation_type; // agar tidak hardco

      const enriched = participants.map((p) => ({
        ...p,
        evaluation_type,
      }));

      set((state) => ({
        participantsByType: {
          ...state.participantsByType,
          [evaluationType]: enriched,
        },
      }));
    } catch (error) {
      console.error(`Gagal memuat peserta untuk ${evaluationType}:`, error);
      toast.error(`Gagal muat peserta ${evaluationType}`);
    }
  },

  // Kirim nilai ke backend dan refresh peserta
  submitScore: async ({ participant_id, evaluation_type, score, notes }) => {
    try {
      const res = await api.post('/jury/score', {
        participant_id,
        evaluation_type,
        score,
        notes,
      });

      toast.success('Nilai berhasil disimpan');

      // Refresh hanya peserta pada evaluation_type ini
      await get().fetchParticipants(evaluation_type);

      return res.data;
    } catch (error) {
      console.error('Gagal menyimpan nilai:', error);
      toast.error(error.response?.data?.message || 'Gagal menyimpan nilai');
      throw error;
    }
  },

  // Reset seluruh state juri
  resetJuryState: () => {
    set({
      assignments: [],
      participantsByType: {},
      loading: false,
    });
  },
}));

export default useJuryStore;
