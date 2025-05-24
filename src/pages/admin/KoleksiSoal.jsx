import React, { useState } from 'react';
import { Plus, ChevronDown, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import Navbar from '../../components/Navbar';

export default function KelolaSoal() {
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate('/admin/koleksi-soal/daftar-soal');
  }

  const [koleksi, setKoleksi] = useState([
    {
      id: 1,
      judul: 'Bank Soal Rekruitmen Asisten 2021',
      penggunaan: 'Rekruitmen Asisten 2021',
      durasi: '120 Menit',
      dimulai: '20 Januari 2022 14:25'
    },
    {
      id: 2,
      judul: 'BANK SOAL TESTING',
      penggunaan: 'OPREC 2022 QA & TESTING',
      durasi: '90 Menit',
      dimulai: '20 Januari 2022 18:00'
    }
  ]);

  const columns = [
    { header: 'No', render: (_, idx) => idx + 1 },
    { header: 'Judul Koleksi', accessor: 'judul' },
    { header: 'Penggunaan', accessor: 'penggunaan' },
    { header: 'Durasi Pengerjaan', accessor: 'durasi' },
    { header: 'Dimulai Pada', accessor: 'dimulai' },
    {
      header: 'Aksi',
      render: (row) => (
        <div className="flex gap-2">
          <button onClick={handleClick} className="btn btn-xs btn-warning flex items-center gap-1">
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
            <h2 className="text-4xl font-bold text-gray-800">Koleksi Soal</h2>
        </div>
        <div className="max-w-12xl mx-auto bg-white rounded-xl shadow-md p-6">
          {/* Text & button*/}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">List Koleksi Soal</h2>
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="btn btn-success flex items-center gap-1">
                <Plus size={16} />
                Tambah Koleksi
                <ChevronDown size={16} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded border shadow z-10">
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 hover:bg-gray-100"
                  >
                    Buat Baru
                  </button>
                  <button onClick={() => setDropdownOpen(false)} className="w-full text-left p-2 hover:bg-gray-100">
                    Gunakan Koleksi
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Tabel */}
          <Table columns={columns} data={koleksi} />
        </div>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Tambah Koleksi Soal">
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Judul Koleksi</label>
                <input className="input input-bordered w-full" placeholder="Contoh: Bank Soal 2025" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Penggunaan / Deskripsi</label>
                <input className="input input-bordered w-full" placeholder="Contoh: Seleksi Asisten 2025" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Durasi Pengerjaan (Menit)</label>
                <input type="number" className="input input-bordered w-full" placeholder="Contoh: 120" />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Dimulai Pada</label>
                <input type="datetime-local" className="input input-bordered w-full" />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Simpan</button>
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Batal</button>
              </div>
            </form>
        </Modal>
      </div>
    </div>
  );
}
