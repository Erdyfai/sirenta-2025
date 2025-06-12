import Navbar from '../../components/Navbar';
import Table from '../../components/Table';
import sesidata from '../../mockdata/sesidata';
import Modal from '../../components/Modal';
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from '../../components/BreadCrumbs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function KelolaSesi() {
  const [openModal, setOpenModal] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [filteredData, setFilteredData] = useState(sesidata);
  const [dataSesi, setDataSesi] = useState(sesidata);
  const [selectedSesi, setSelectedSesi] = useState(null);

  const columns = [
    { header: '#', accessor: 'index', render: (row, index) => index + 1 },
    {
      header: 'Nama Sesi',
      accessor: 'namasesi',
      render: (row) => (
        <div>
          <div className="font-medium">{row.namasesi}</div>
          <div className="mt-2 flex gap-1 flex-wrap">
            {row.tahapan.map((tahap, index) => (
              <button key={index} className="btn btn-xs btn-soft btn-primary" onClick={() => handleKlikTahap(row, tahap)}>
                {tahap.nama}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    { header: 'Jumlah Peserta', accessor: 'jmlpeserta' },
    {
      header: 'Fase Sekarang',
      accessor: 'fasesekarang',
      render: (row) => {
        const fase = row.tahapan.find((t) => t.status === 'berlangsung');
        return <span className="font-semibold">{fase ? fase.nama : 'selesai'}</span>;
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => {
        const status = row.tahapan.some((t) => t.status === 'berlangsung');
        return <span className={status ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}> {status ? 'Open' : 'Close'} </span>;
      },
    },
    { header: 'Dibuat Pada', accessor: 'dibuatpada' },
    {
      header: 'Aksi',
      accessor: 'aksi',
      render: (row) => (
        <div className="flex gap-2">
          <button className="btn btn-xs btn-soft btn-warning" onClick={() => handleEditSesi(row)}>
            Edit
          </button>
          <button className="btn btn-xs btn-soft btn-error" onClick={handleHapusSesi}>
            Hapus
          </button>
        </div>
      ),
    },
  ];

  const navigate = useNavigate();

  const handleTambahSesi = () => {
    setSelectedSesi(null);
    setOpenModal(true);
  };

  const handleEditSesi = (sesi) => {
    setSelectedSesi(sesi);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSesi(null);
  };

  const handleSearchChange = (e) => {
    const searchInput = e.target.value;
    setSearchItem(searchInput);

    const filteredItems = dataSesi.filter((item) => item.namasesi.toLowerCase().includes(searchInput.toLowerCase()));

    setFilteredData(filteredItems);
  };

  const handleHapusSesi = () => {};

  const handleKlikTahap = (sesi, tahap) => {
    navigate(`/admin/${sesi.id}/${encodeURIComponent(tahap.nama)}`);

    console.log(sesi.peserta);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100 font-inter">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pt-30 p-6">
            <Breadcrumbs />
            <div className="max-w-12xl mx-auto text-left pb-6">
              <h2 className="text-4xl font-bold text-gray-800">Daftar Sesi</h2>
            </div>
            <div className="max-w-12xl mx-auto bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <button className="btn btn-sm  bg-orange-lab text-white hover:bg-orange-700" onClick={handleTambahSesi}>
                  Tambah Sesi
                </button>
                <input type="text" placeholder="Search" className="input" onChange={handleSearchChange} value={searchItem} />
              </div>
              <Table columns={columns} data={filteredData} />
            </div>
          </div>
        </div>
        <div>
          <Modal isOpen={openModal} onClose={handleCloseModal} title={selectedSesi ? 'Edit Sesi' : 'Tambah Sesi'}>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
                const formData = e.target;
                const tahapan = [formData.pendaftaran.value, formData.tahap1.value, formData.tahap2.value, formData.tahap3.value].filter((t) => t);
                const today = new Date();
                const formattedDate = today.toISOString().split('T')[0];
                const data = {
                  namasesi: formData.namasesi.value,
                  tanggalmulai: formData.tanggalmulai.value,
                  tanggalakhir: formData.tanggalakhir.value,
                  dibuatpada: formattedDate,
                  tahapan: tahapan.map((nama, index) => ({
                    nama,
                    status: index === 0 ? 'open' : 'close',
                  })),
                };

                if (selectedSesi) {
                  const updatedData = dataSesi.map((item) => (item === selectedSesi ? { ...item, ...data } : item));
                  setDataSesi(updatedData);
                  setFilteredData(updatedData);
                } else {
                  const newData = [...dataSesi, data];
                  setDataSesi(newData);
                  setFilteredData(newData);
                }
                console.log(data);
                handleCloseModal();
              }}
            >
              <div className="mb-4 mt-4">
                <label className="block text-sm font-medium mb-1">Nama Sesi</label>
                <input type="text" name="namasesi" className="input input-bordered w-full" required defaultValue={selectedSesi?.namasesi || ''} />
                <div className="flex gap-4 mt-4">
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
                    <input
                      type="date"
                      name="tanggalmulai"
                      className="input input-bordered w-full"
                      required
                      defaultValue={selectedSesi?.tanggalmulai || ''}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-medium mb-1">Tanggal Akhir</label>
                    <input
                      type="date"
                      name="tanggalakhir"
                      className="input input-bordered w-full"
                      required
                      defaultValue={selectedSesi?.tanggalakhir || ''}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Tahapan Sesi</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="pendaftaran"
                    className="input input-bordered w-full"
                    required
                    defaultValue={selectedSesi?.pendaftaran || 'Pendaftaran'}
                  />
                  <input type="text" name="tahap1" className="input input-bordered w-full" defaultValue={selectedSesi?.tahap1 || 'Tahap 1'} />
                  <input type="text" name="tahap2" className="input input-bordered w-full" defaultValue={selectedSesi?.tahap2 || 'Tahap 2'} />
                  <input type="text" name="tahap3" className="input input-bordered w-full" defaultValue={selectedSesi?.tahap3 || 'Tahap 3'} />
                </div>
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
          </Modal>
        </div>
      </div>
    </>
  );
}
