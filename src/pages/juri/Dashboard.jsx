import React from 'react';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Stat from '../../components/Stats';
import statsData from '../../mockdata/statsdata';
import Table from '../../components/Table';
import tableData from '../../mockdata/tableData';
import Modal from '../../components/Modal';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [OpenModal, setOpenModal] = useState(false);
  const [Selected, setSelected] = useState(null);

  const handleInputNilai = (user) => {
    setSelected(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected(null);
  };
  return (
    <div>
      <div className="min-h-screen w-[90%] mx-auto pt-28">
        <Navbar />
        <h1 className="text-2xl font-semibold mb-3">Selamat datang</h1>
        <p className="text-sm text-gray-500">
          Welcome to the Juri Dashboard. Here you can manage the judging process and view participant submissions.
        </p>
        <Stat stats={statsData(isOpen)} />
        <Table data={tableData} onInputNilai={handleInputNilai} />

        <Modal isOpen={OpenModal} onClose={handleCloseModal} title={`Input Nilai  ${Selected?.name}`}>
          {Selected && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCloseModal();
              }}
            >
              <div className="mb-4 mt-4">
                <label className="block text-sm font-medium mb-1">NIM</label>
                <input type="text" value={Selected.nim} disabled className="input input-bordered w-full" />
              </div>

              <div className="mb-4 ">
                <label className="block text-sm font-medium mb-1">Nilai</label>
                <input type="text" className="input input-bordered w-full" placeholder="Masukan nilai" />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Simpan
                </button>
                <button type="button" onClick={handleCloseModal} className="btn">
                  Batal
                </button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
}
