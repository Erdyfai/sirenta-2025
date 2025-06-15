import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Breadcrumbs from '../../components/BreadCrumbs';
import Table from '../../components/Table';
import useAdminStore from '../../stores/useAdminStore';
import Modal from '../../components/Modal';
import { toast } from 'react-hot-toast';

export default function StageTahap() {
  const { sessionId, stage_id } = useParams();
  const [searchItem, setSearchItem] = useState('');
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [infoContentByStatus, setInfoContentByStatus] = useState({
    pending: '',
    in_progress: '',
    passed: '',
    failed: '',
  });

  const {
    usersInStage,
    currentStageName,
    currentStageStatus,
    loadingUsers,
    fetchUsersInStage,
    clearUsersInStage,
    updateUserProgressStatus,
    updateStageStatus,
    resetStageParticipants,
    fetchStageInfo,
    upsertStageInfo,
  } = useAdminStore();

  useEffect(() => {
    if (sessionId && stage_id) {
      fetchUsersInStage(sessionId, stage_id);
      fetchStageInfo(stage_id).then((data) => {
        if (data && typeof data === 'object') {
          setInfoContentByStatus((prev) => ({
            ...prev,
            ...data,
          }));
        }
      });
    }
    return () => {
      clearUsersInStage();
    };
  }, [sessionId, stage_id]);

  const stageName = currentStageName;
  const stageStatus = currentStageStatus;
  const isStageFinal = stageStatus === 'completed' || stageStatus === 'inactive';

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

  const handleStatusUpdate = (userId, newStatus) => {
    if (isStageFinal) return;
    updateUserProgressStatus(userId, stage_id, newStatus);
  };

  const handleActivateStage = () => {
    updateStageStatus(stage_id, 'active');
  };

  const handleCompleteStage = () => {
    updateStageStatus(stage_id, 'completed');
  };

  const handleDeactivateStage = () => {
    updateStageStatus(stage_id, 'inactive');
  };

  const handleResetParticipants = () => {
    resetStageParticipants(stage_id);
  };

  const handleInfoContentChange = (status, content) => {
    console.log('infoContentByStatus', infoContentByStatus);
    setInfoContentByStatus((prev) => ({ ...prev, [status]: content }));
  };

  const handleInfoSubmit = async () => {
    await upsertStageInfo(stage_id, infoContentByStatus);
    setInfoModalOpen(false);
  };

  const userData = usersInStage.map((user) => ({
    ...user,
    status: user.status || null,
  }));

  const filteredData = useMemo(() => {
    return userData.filter((item) =>
      item.name?.toLowerCase().includes(searchItem.toLowerCase())
    );
  }, [searchItem, userData]);

  const columns = [
    { header: '#', accessor: 'index', render: (_, index) => index + 1 },
    { header: 'Nama', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    {
      header: 'Motivasi',
      accessor: 'user_motivation',
      render: (row) => (
        <p className="line-clamp-2 text-sm text-gray-700">{row.user_motivation}</p>
      ),
    },
    {
      header: 'Ide',
      accessor: 'user_idea',
      render: (row) => (
        <p className="line-clamp-2 text-sm text-gray-700">{row.user_idea}</p>
      ),
    },
    {
      header: 'CV',
      accessor: 'cv_file_path',
      render: (row) => (
        <a
          href={row.cv_file_path}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm"
        >
          Lihat CV
        </a>
      ),
    },
    {
      header: 'Nilai Test',
      accessor: 'score',
      render: (row) => {
        const testScore = row.scores?.find((s) => s.evaluation_type === 'test');
        return (
          <span className="text-sm">
            {testScore ? `${testScore.score} (${testScore.evaluation_type})` : 'Belum dinilai'}
          </span>
        );
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <span
          className={
            row.status === 'lulus'
              ? 'text-green-600'
              : row.status === 'tidak lulus'
              ? 'text-red-500'
              : 'text-gray-500'
          }
        >
          {row.status || 'Belum Ditentukan'}
        </span>
      ),
    },
    {
      header: 'Aksi',
      accessor: 'aksi',
      render: (row) => (
        <div className="flex gap-2">
          <button
            className="btn btn-xs btn-success"
            disabled={isStageFinal}
            onClick={() => handleStatusUpdate(row.id, 'passed')}
          >
            Lulus
          </button>
          <button
            className="btn btn-xs btn-error"
            disabled={isStageFinal}
            onClick={() => handleStatusUpdate(row.id, 'failed')}
          >
            Tidak Lulus
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
            <h2 className="text-3xl font-bold text-gray-800">
              Peserta Tahap: {stageName}
            </h2>
            <h3 className="text-2xl text-gray-800">
              Status Tahap: {stageStatus}
            </h3>
          </div>
          <div className="max-w-12xl mx-auto bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button
                  className="btn btn-sm bg-blue-600 text-white hover:bg-green-700"
                  onClick={handleCompleteStage}
                  disabled={isStageFinal}
                >
                  Selesaikan Tahap
                </button>
                <button
                  className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                  onClick={handleDeactivateStage}
                  disabled={isStageFinal}
                >
                  Nonaktifkan Tahap
                </button>
                <button
                  className="btn btn-sm bg-green-600 text-white hover:bg-green-400"
                  onClick={handleActivateStage}
                  disabled={stageStatus === 'active'}
                >
                  Aktifkan Tahap
                </button>
                <button
                  className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => setInfoModalOpen(true)}
                >
                  Detail Tahap
                </button>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="input"
                onChange={handleSearchChange}
                value={searchItem}
              />
            </div>
            {loadingUsers ? (
              <div className="text-center text-gray-600">Memuat peserta...</div>
            ) : userData.length === 0 ? (
              <div className="text-center text-gray-500 py-4">
                Belum ada peserta pada tahap ini.
              </div>
            ) : (
              <Table columns={columns} data={filteredData} />
            )}
            <div className="mt-4 text-right">
              <button
                className="btn btn-sm bg-yellow-500 text-white hover:bg-yellow-600"
                onClick={handleResetParticipants}
                disabled={isStageFinal}
              >
                Reset Status Peserta
              </button>
            </div>
          </div>

          <Modal
            isOpen={infoModalOpen}
            onClose={() => setInfoModalOpen(false)}
            title={`Detail Tahap: ${stageName}`}
            onSubmit={handleInfoSubmit}
          >
            {['pending', 'in_progress', 'passed', 'failed'].map((status) => (
              <div key={status} className="mb-4">
                <label className="font-semibold capitalize block mb-1">
                  Status: {status.replace('_', ' ')}
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-28"
                  placeholder={`Konten untuk status ${status}`}
                  value={infoContentByStatus[status] || ''}
                  onChange={(e) => handleInfoContentChange(status, e.target.value)}
                />
              </div>
            ))}
          </Modal>
        </div>
      </div>
    </div>
  );
}
