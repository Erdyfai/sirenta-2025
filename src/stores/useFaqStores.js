import { create } from 'zustand';
import { api } from '../services/api';
import toast from 'react-hot-toast';

export const useFaqStore = create((set, get) => ({
  faqList: [],
  isLoadingFaq: false,
  isAddingFaq: false,
  isDeletingFaq: false,
  isUpdatingFaq: false,

  fetchFaq: async () => {
    set({ isLoadingFaq: true });
    try {
      const res = await api.get('/faq/fetch-data-faq');
      set({ faqList: res.data.data });
    } catch (error) {
      toast.error('Gagal mengambil data FAQ');
    } finally {
      set({ isLoadingFaq: false });
    }
  },

  addFaq: async ({ pertanyaan, answer }) => {
    set({ isAddingFaq: true });
    try {
      const res = await api.post('/faq/add-data-faq', { pertanyaan, answer });
      const newFaq = res.data.data;
      // Tambahkan data baru ke daftar FAQ tanpa perlu fetch ulang
      set((state) => ({ faqList: [newFaq, ...state.faqList] }));
      toast.success('FAQ berhasil ditambahkan');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Gagal menambahkan FAQ');
    } finally {
      set({ isAddingFaq: false });
    }
  },
deleteFaq: async (id) => {
    set({ isDeletingFaq: true });
    try {
      await api.delete(`/faq/delete-faq/${id}`);
      set((state) => ({
        faqList: state.faqList.filter((faq) => faq.id !== id),
      }));
      toast.success('FAQ berhasil dihapus');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Gagal menghapus FAQ');
    } finally {
      set({ isDeletingFaq: false });
    }
  },
  updateFaq: async ({ id, pertanyaan, answer }) => {
    set({ isUpdatingFaq: true });
    try {
      const res = await api.put('/faq/update-faq', { id, pertanyaan, answer });
      const updatedFaq = res.data.data;
      set((state) => ({
        faqList: state.faqList.map((faq) =>
          faq.id === id ? updatedFaq : faq
        ),
      }));
      toast.success('FAQ berhasil diperbarui');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Gagal memperbarui FAQ');
    } finally {
      set({ isUpdatingFaq: false });
    }
  },

}));
