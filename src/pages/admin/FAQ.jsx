import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from '../../components/BreadCrumbs';
import Navbar from '../../components/Navbar';
import Table from '../../components/Table';
import { Plus } from 'lucide-react';
import { useFaqStore } from '../../stores/useFaqStores.js';

const FaqList = () => {
  const {
    faqList,
    fetchFaq,
    addFaq,
    updateFaq,
    deleteFaq,
    isAddingFaq,
    isUpdatingFaq,
    isDeletingFaq,
  } = useFaqStore();

  const [modalType, setModalType] = useState(null); // null | 'new' | 'edit' | 'delete'
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [formState, setFormState] = useState({ pertanyaan: '', answer: '' });

  useEffect(() => {
    fetchFaq();
  }, [fetchFaq]);

  const openModal = (type, faq = null) => {
    setModalType(type);
    setSelectedFaq(faq);
    if (faq) {
      setFormState({ pertanyaan: faq.pertanyaan, answer: faq.answer });
    } else {
      setFormState({ pertanyaan: '', answer: '' });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedFaq(null);
    setFormState({ pertanyaan: '', answer: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalType === 'new') {
      await addFaq(formState);
    } else if (modalType === 'edit') {
      await updateFaq({ ...formState, id: selectedFaq.id });
    } else if (modalType === 'delete') {
      await deleteFaq(selectedFaq.id);
    }
    closeModal();
  };

  const columns = [
    {
      header: 'No',
      render: (row, index) => index + 1,
    },
    {
      header: 'Question',
      accessor: 'pertanyaan',
    },
    {
      header: 'Answer',
      accessor: 'answer',
    },
    {
      header: 'Aksi',
      render: (row) => (
        <div className="flex space-x-2 whitespace-nowrap">
          <button
            onClick={() => openModal('edit', row)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-md shadow-sm"
          >
            Edit
          </button>
          <button
            onClick={() => openModal('delete', row)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md shadow-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-30 p-6">
          <Breadcrumbs />
          <div className="max-w-12xl mx-auto text-left pb-6">
            <h2 className="text-4xl font-bold text-gray-800">List FAQ</h2>
          </div>
          <div className="max-w-12xl mx-auto bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">List FAQ</h2>
              <button
                onClick={() => openModal('new')}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Tambah
              </button>
            </div>
            <Table columns={columns} data={faqList} />
          </div>
        </div>
      </div>

      {/* Satu modal untuk semua aksi */}
      <Modal
        isOpen={modalType !== null}
        onClose={closeModal}
        title={
          modalType === 'new'
            ? 'Tambah FAQ Baru'
            : modalType === 'edit'
            ? 'Edit FAQ'
            : 'Konfirmasi Hapus'
        }
        onSubmit={handleSubmit}
      >
        {modalType === 'delete' ? (
          <p>
            Apakah Anda yakin ingin menghapus FAQ "
            <strong>{selectedFaq?.pertanyaan}</strong>"? Tindakan ini tidak dapat
            dibatalkan.
          </p>
        ) : (
          <>
            <div>
              <label className="block text-sm">Pertanyaan</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formState.pertanyaan}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, pertanyaan: e.target.value }))
                }
                required
                disabled={modalType === 'delete'}
              />
            </div>
            <div>
              <label className="block text-sm">Jawaban</label>
              <textarea
                className="w-full p-2 border rounded"
                value={formState.answer}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, answer: e.target.value }))
                }
                required
                disabled={modalType === 'delete'}
              />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default FaqList;
