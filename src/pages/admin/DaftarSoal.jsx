import React, { useState } from 'react';
import { Plus, Eye, Edit, Trash2, Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import Navbar from '../../components/Navbar';


export default function KelolaSoal() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate('/admin/koleksi-soal');
  }

  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: 'multiple_choice',
      question_text: 'Apa itu React?',
      file_path: null
    },
    {
      id: 2,
      type: 'essay',
      question_text: 'Jelaskan perbedaan antara SQL dan NoSQL!',
      file_path: null
    }
  ]);

  const columns = [
    { header: 'No', render: (_, idx) => idx + 1 },
    { header: 'Tipe Soal', accessor: 'type' },
    { header: 'Pertanyaan', accessor: 'question_text' },
    {
      header: 'Aksi',
      render: (row) => (
        <div className="flex gap-2">
          <button className="btn btn-xs btn-info flex items-center gap-1">
            <Eye size={14} /> Detail
          </button>
          <button className="btn btn-xs btn-warning flex items-center gap-1">
            <Edit size={14} /> Edit
          </button>
          <button className="btn btn-xs btn-error flex items-center gap-1">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen w-[90%] mx-auto pt-28">
        <div className="max-w-12xl mx-auto text-left pt-6 pb-6">
            <h1 className="text-4xl font-bold text-gray-800">Koleksi Soal</h1>
            <h2 className="text-xl text-gray-800 pt-3">Nama Bank Soal</h2>
        </div>  
        <div className="bg-white rounded-xl shadow-md p-6">
          <button onClick={handleClick} className="btn btn-x bg-transparent flex items-center gap-2">
            <Undo2 size={16} /> Back
          </button>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Daftar Soal</h2>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-success flex items-center gap-1"
            >
              <Plus size={16} /> Tambah Soal
            </button>
          </div>

          <Table columns={columns} data={questions} />

          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Tambah Soal Baru"
          >
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Tipe Soal</label>
                <select className="select select-bordered w-full">
                  <option value="multiple_choice">Pilihan Ganda</option>
                  <option value="essay">Essay</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Pertanyaan</label>
                <textarea className="textarea textarea-bordered w-full" placeholder="Tulis pertanyaan di sini"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Upload File (opsional)</label>
                <input type="file" className="file-input file-input-bordered w-full" />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Simpan</button>
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Batal</button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
