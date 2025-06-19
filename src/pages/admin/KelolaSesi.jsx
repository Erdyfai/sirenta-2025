import Navbar from '../../components/Navbar';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from '../../components/BreadCrumbs';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminStore from '../../stores/useAdminStore';

export default function KelolaSesi() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [selectedSesi, setSelectedSesi] = useState(null);

  const { sessions, loadingSessions, fetchRecruitmentSessions } = useAdminStore();

  useEffect(() => {
    fetchRecruitmentSessions();
  }, [fetchRecruitmentSessions]);

  const filteredData = useMemo(() => {
    return (sessions || []).filter((item) =>
      item.name?.toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [searchItem, sessions]);

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

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

  const handleKlikTahap = (sesi, tahap) => {
    navigate(`/admin/kelola-sesi/${sesi.id}/${tahap.id}`);
  };

  const handleToggleStatus = async (sessionId, isCurrentlyActive) => {
    try {
      if (!isCurrentlyActive) {
        await useAdminStore.getState().updateRecruitmentSessionStatus(sessionId, true); 
      } else {
        await useAdminStore.getState().updateRecruitmentSessionStatus(sessionId, false); 
      }
  
      toast.success(`Sesi berhasil di${!isCurrentlyActive ? 'aktifkan' : 'nonaktifkan'}`);
      fetchRecruitmentSessions(); // refresh ulang
    } catch (err) {
      console.error('Gagal toggle status sesi:', err);
      toast.error('Gagal mengubah status sesi');
    }
  };
  

  const handleHapusSesi = () => {
    // TODO: implementasi delete menggunakan API
  };

  const columns = [
    { header: '#', accessor: 'index', render: (row, index) => index + 1 },
    {
      header: 'Nama Sesi',
      accessor: 'name',
      render: (row) => (
        <div>
          <div className="font-medium">{row.name}</div>
          <div className="mt-2 flex gap-1 flex-wrap">
            {row.stages?.map((tahap, index) => (
              <button key={index} className="btn btn-xs btn-soft btn-primary" onClick={() => handleKlikTahap(row, tahap)}>
                {tahap.name}
              </button>
            ))}
          </div>
        </div>
      ),
    },
    { header: 'Jumlah Peserta', accessor: 'registrations_count' },
    {
      header: 'Fase Sekarang',
      accessor: 'fase',
      render: (row) => {
        const fase = row.stages?.find((t) => t.status === 'active');
        return <span className="font-semibold">{fase ? fase.name : 'selesai'}</span>;
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span className={row.is_active ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
          {row.is_active ? 'Open' : 'Close'}
        </span>
      ),
    },
    {
      header: 'Aksi',
      accessor: 'aksi',
      render: (row) => (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button className="btn btn-xs btn-soft btn-warning" onClick={() => handleEditSesi(row)}>
              Edit
            </button>
            <button className="btn btn-xs btn-soft btn-error" onClick={handleHapusSesi}>
              Hapus
            </button>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-x btn-soft btn-success"
              onClick={() => handleToggleStatus(row.id, row.is_active)}
            >
              {row.is_active ? 'Nonaktifkan' : 'Aktifkan'}
            </button>
          </div>
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
            <h2 className="text-4xl font-bold text-gray-800">Daftar Sesi</h2>
          </div>
          <div className="max-w-12xl mx-auto bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <button className="btn btn-sm bg-orange-lab text-white hover:bg-orange-700" onClick={handleTambahSesi}>
                Tambah Sesi
              </button>
              <input type="text" placeholder="Search" className="input" onChange={handleSearchChange} value={searchItem} />
            </div>
            {loadingSessions ? (
              <div className="text-center py-6">Memuat data sesi...</div>
            ) : (
              <Table columns={columns} data={filteredData} />
            )}
          </div>
        </div>
      </div>

    {/* MODAL */}
    <Modal
      isOpen={openModal}
      onClose={handleCloseModal}
      title={selectedSesi ? 'Edit Sesi' : 'Tambah Sesi'}
    >
     <form
        onSubmit={async (e) => {
          e.preventDefault();
          const fd = e.target;

          const stageKeys = ['pendaftaran', 'tahap1', 'tahap2', 'tahap3'];

          const tahapan = stageKeys
            .map((key, i) => {
              const name = fd[key].value.trim();
              if (!name) return null;
              return {
                name,
                description: fd[`${key}_desc`].value || null,
                status: fd[`${key}_status`].value,
                stage_order: i + 1,
              };
            })
            .filter(Boolean);

          const payload = {
            name: fd.namasesi.value,
            description: fd.deskripsi.value || null,
            started_at: fd.tanggalmulai.value,
            ended_at: fd.tanggalakhir.value || null,
            tahapan: tahapan,
          };

          try {
            if (!selectedSesi) {
              await useAdminStore.getState().createRecruitmentSession(payload);
            } else {
              await useAdminStore.getState().updateRecruitmentSession(selectedSesi.id, payload)
            }
            handleCloseModal();
          } catch (err) {
            console.error('Error submitting form:', err);
          }
        }}
      >
        {/* --- DATA SESI --- */}
        <div className="mb-4 mt-4">
          <label className="block text-sm font-medium mb-1">Nama Sesi</label>
          <input
            name="namasesi"
            type="text"
            className="input input-bordered w-full"
            required
            defaultValue={selectedSesi?.name || ''}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Deskripsi Sesi (opsional)</label>
          <textarea
            name="deskripsi"
            rows="3"
            className="textarea textarea-bordered w-full"
            defaultValue={selectedSesi?.description || ''}
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex flex-col w-full">
            <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
            <input
              name="tanggalmulai"
              type="date"
              className="input input-bordered w-full"
              required
              defaultValue={selectedSesi?.started_at?.split('T')[0] || ''}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="block text-sm font-medium mb-1">Tanggal Berakhir (opsional)</label>
            <input
              name="tanggalakhir"
              type="date"
              className="input input-bordered w-full"
              defaultValue={selectedSesi?.ended_at?.split('T')[0] || ''}
            />
          </div>
        </div>

        {/* --- DATA TAHAP --- */}
        <label className="block text-sm font-medium mb-1">Tahapan, Deskripsi & Status</label>
        {['Pendaftaran', 'Tahap 1', 'Tahap 2', 'Tahap 3'].map((label, i) => {
          const key = i === 0 ? 'pendaftaran' : `tahap${i}`;
          const stageData = selectedSesi?.stages?.[i] || {};
          return (
            <div key={key} className="border rounded-xl p-4 mb-3">
              <p className="font-semibold mb-2">{label}</p>
              <input
                name={key}
                type="text"
                placeholder={`Nama ${label}`}
                className="input input-bordered w-full mb-2"
                defaultValue={stageData.name || label}
                required={i === 0}
              />
              <textarea
                name={`${key}_desc`}
                rows="2"
                placeholder="Deskripsi tahap (opsional)"
                className="textarea textarea-bordered w-full mb-2"
                defaultValue={stageData.description || ''}
              />
              <select
                name={`${key}_status`}
                className="select select-bordered w-full"
                defaultValue={stageData.status || 'inactive'}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          );
        })}

        <div className="modal-action">
          <button type="submit" className="btn btn-primary">Simpan</button>
          <button type="button" onClick={handleCloseModal} className="btn">Batal</button>
        </div>
      </form>

      </Modal>

    </div>
  );
}
