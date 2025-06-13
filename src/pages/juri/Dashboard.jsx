import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Stat from '../../components/Stats';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import useJuryStore from '../../stores/useJuryStore';

export default function Dashboard() {
  const { fetchAssignmentsAndParticipants, participantsByType, loading, assignments, submitScore } = useJuryStore();

  const [isOpen, setIsOpen] = useState(true);
  const [OpenModal, setOpenModal] = useState(false);
  const [Selected, setSelected] = useState(null);
  const [searchItem, setSearchItem] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Gabungkan semua peserta dari berbagai evaluation type
  const mergedParticipants = Object.values(participantsByType).flat();

  useEffect(() => {
    fetchAssignmentsAndParticipants();
  }, []);

  useEffect(() => {
    // Filter awal (tanpa pencarian)
    setFilteredData(mergedParticipants);
  }, [mergedParticipants]);

  const handleInputNilai = (user) => {
    setSelected(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected(null);
  };

  const handleSearchChange = (e) => {
    const searchvalue = e.target.value;
    setSearchItem(searchvalue);

    const filtereditems = mergedParticipants.filter((item) => item.nim?.toLowerCase().includes(searchvalue.toLowerCase()));

    setFilteredData(filtereditems);
  };

  const generateSummaryStats = () => {
    const mergedParticipants = Object.values(participantsByType).flat();
    const total = mergedParticipants.length;
    const dinilai = mergedParticipants.filter((p) => p.has_scored).length;
    const types = assignments.map((a) => a.evaluation_type).join(', ');

    return [
      {
        title: 'Total caslab',
        value: `${total} orang`,
        color: 'text-black',
      },
      {
        title: 'Hak penjurian',
        value: types,
        color: 'text-black',
      },
      {
        title: 'Jumlah dinilai',
        value: `${dinilai} orang`,
        color: 'text-green-500',
      },
    ];
  };

  const columns = [
    { header: '#', render: (_, index) => index + 1 },
    { header: 'NIM', accessor: 'nim' },
    { header: 'Nama', accessor: 'name' },
    {
      header: 'Catatan',
      render: (row) => row.notes || '-',
    },
    {
      header: 'Nilai',
      render: (row) => row.score_value || '-',
    },
    {
      header: 'Aksi',
      render: (row) => (
        <div className="flex gap-2">
          <a href={row.cv_file_path || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-xs btn-soft btn-primary">
            Lihat CV
          </a>
          <button onClick={() => handleInputNilai(row)} className="btn btn-xs btn-soft btn-secondary">
            Input Nilai
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="min-h-screen w-[90%] mx-auto pb-10 pt-28">
        <Navbar />
        <h1 className="text-2xl font-semibold mb-3">Selamat datang</h1>
        <p className="text-sm text-gray-500">
          Welcome to the Juri Dashboard. Here you can manage the judging process and view participant submissions.
        </p>

        <Stat stats={generateSummaryStats()} />

        <div className="flex w-full justify-between mt-4">
          <input type="text" placeholder="Search by NIM" className="input" onChange={handleSearchChange} value={searchItem} />
        </div>

        {loading ? <p className="text-gray-600 text-center mt-6">Memuat data...</p> : <Table columns={columns} data={filteredData} />}

        <Modal isOpen={OpenModal} onClose={handleCloseModal} title={`Input Nilai ${Selected?.name}`}>
          {Selected && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const nilai = formData.get('nilai');
                const catatan = formData.get('catatan');

                try {
                  await submitScore({
                    participant_id: Selected.user_id,
                    evaluation_type: Selected.evaluation_type,
                    score: nilai,
                    notes: catatan,
                  });

                  handleCloseModal();
                } catch (error) {}
              }}
            >
              <div className="mb-4 mt-4">
                <label className="block text-sm font-medium mb-1">NIM</label>
                <input type="text" value={Selected.nim} disabled className="input input-bordered w-full" />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nilai</label>
                <input
                  type="text"
                  name="nilai"
                  defaultValue={Selected?.score_value || ''}
                  className="input input-bordered w-full"
                  placeholder="Masukan nilai"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Catatan</label>
                <input
                  type="text"
                  name="catatan"
                  defaultValue={Selected?.notes || ''}
                  className="input input-bordered w-full"
                  placeholder="Masukan catatan"
                />
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
