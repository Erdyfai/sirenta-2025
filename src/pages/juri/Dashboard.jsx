import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [dataTable, setDataTable] = useState(tableData);
  const [searchItem, setSearchItem] = useState('');
  const [filteredData, setFilteredData] = useState(tableData);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5001/api/jury/judger', {
          withCredentials: true,
        });

        if (response.data.message === 'success' && response.data.data) {
          const normalized = response.data.data.map((item) => ({
            ...item,
            nim: item.participant?.nim || '-',
            name: item.participant?.name || '-',
          }));

          setDataTable(normalized);
          setFilteredData(normalized);
          console.log('Data normalized & fetched:', normalized);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  const handleInputNilai = (user) => {
    setSelected(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected(null);
  };

  const columns = [
    { header: '#', render: (_, index) => index + 1 },
    { header: 'NIM', accessor: 'nim' },
    { header: 'Nama', accessor: 'name' },
    { header: 'Tahap', accessor: 'evaluation_type' },
    { header: 'Catatan', accessor: 'notes' },
    { header: 'Nilai', accessor: 'score' },
    {
      header: 'Aksi',
      render: (row) => (
        <div className="flex gap-2">
          <button className="btn btn-xs btn-soft btn-primary">Lihat CV</button>
          <button onClick={() => handleInputNilai(row)} className="btn btn-xs btn-soft btn-secondary">
            Input Nilai
          </button>
        </div>
      ),
    },
  ];

  const handleSearchChange = (e) => {
    const searchvalue = e.target.value;
    setSearchItem(searchvalue);

    const filtereditems = dataTable.filter((item) => item.nim.includes(searchvalue));
    setFilteredData(filtereditems);
  };

  return (
    <div>
      <div className="min-h-screen w-[90%] mx-auto pb-10 pt-28">
        <Navbar />
        <h1 className="text-2xl font-semibold mb-3">Selamat datang</h1>
        <p className="text-sm text-gray-500">
          Welcome to the Juri Dashboard. Here you can manage the judging process and view participant submissions.
        </p>
        <Stat stats={statsData(isOpen)} />
        <div className="flex w-full justify-between mt-4">
          <input type="text" placeholder="Search by NIM" className="input" onChange={handleSearchChange} value={searchItem} />
        </div>
        <Table columns={columns} data={filteredData} />

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
                <input type="text" value={Selected.nim} disabled className="input input-bordered w-full" name="nim" />
              </div>

              <div className="mb-4 ">
                <label className="block text-sm font-medium mb-1">Nilai</label>
                <input type="text" className="input input-bordered w-full" placeholder="Masukan nilai" name="nilai" />
              </div>

              <div className="mb-4 ">
                <label className="block text-sm font-medium mb-1">Catatan</label>
                <input type="text" className="input input-bordered w-full" placeholder="Masukan catatan" name="catatan" />
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
