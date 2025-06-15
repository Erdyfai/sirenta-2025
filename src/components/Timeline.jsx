import { useEffect, useState } from 'react';
import useParticipantStore from '../stores/useParticipantStore';
import useAdminStore from '../stores/useAdminStore';

import {
  Loader2,
  CheckCircle,
  XCircle,
  FileText,
  Pencil,
  Mic,
  Users,
} from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

export default function Timeline() {
  const { progress, fetchProgress } = useParticipantStore();
  const { stageInfoContent, fetchStageInfo } = useAdminStore();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchProgress();
      setLoading(false);
    };
    fetchData();
  }, [fetchProgress]);
  
  useEffect(() => {
    if (!progress || progress.length === 0) return;
  
    // Cari index tahap yang sedang in_progress
    const inProgressIndex = progress.findIndex((item) => item.status === 'in_progress');
  
    // Jika ada, set current ke tahap tersebut. Jika tidak, tetap 0
    if (inProgressIndex !== -1) {
      setCurrent(inProgressIndex);
    } else {
      setCurrent(0);
    }
  }, [progress]);

  const handlePrev = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev < progress.length - 1 ? prev + 1 : prev));
  };

  const getStageIcon = (title) => {
    if (!title) return null;
    if (title.includes('Pendaftaran')) return <FileText className="w-10 h-10 text-orange-500" />;
    if (title.includes('Tahap 1')) return <Pencil className="w-10 h-10 text-orange-500" />;
    if (title.includes('Tahap 2')) return <Mic className="w-10 h-10 text-orange-500" />;
    if (title.includes('Tahap 3')) return <Users className="w-10 h-10 text-orange-500" />;
    return null;
  };

  const renderStatusIcon = (status) => {
    if (status === 'passed') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'in_progress') return <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />;
    if (status === 'failed') return <XCircle className="w-5 h-5 text-red-500" />;
    return <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-white" />;
  };

  if (loading || !progress || progress.length === 0) {
    return <LoadingSpinner size="md" fullscreen={false} />;
  }

  const currentData = progress[current];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrev}
          className="p-2 bg-orange-500 rounded-full disabled:opacity-50"
          disabled={current === 0}
        >
          <span className="text-xl">←</span>
        </button>

        <div className="flex-1 h-1 bg-gray-200 mx-4 relative">
          <div
            className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-green-500 transition-all duration-300"
            style={{ width: `${(current / (progress.length - 1)) * 100}%` }}
          ></div>

          <div className="absolute top-full left-0 w-full flex justify-between mt-2">
            {progress.map((item, index) => {
              const clickableStatuses = ['passed', 'failed', 'in_progress'];
              const isStageClickable = clickableStatuses.includes(item.status);

              return (
                <div
                  key={index}
                  onClick={() => isStageClickable && setCurrent(index)}
                  className={`flex flex-col items-center group ${
                    isStageClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center w-6 h-6">
                    {renderStatusIcon(item.status)}
                  </div>
                  <span className="mt-1">{getStageIcon(item.stage_name)}</span>
                  <span className="text-xs text-gray-500">Tahap {item.stage_order}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-2 bg-orange-500 rounded-full disabled:opacity-50"
          disabled={currentData.status === 'in_progress'}
        >
          <span className="text-xl">→</span>
        </button>
      </div>

      <div className="text-center mt-20">
        <h2 className="text-3xl text-gray-600 font-bold">{currentData.stage_name}</h2>
        <p className="italic text-gray-500 mt-2">{currentData.stage_description}</p>

        {currentData.status === 'passed' ? (
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">Anda telah menyelesaikan tahap ini.</p>
        ) : currentData.status === 'failed' ? (
          <p className="mt-4 text-red-600 font-semibold">Anda tidak lolos pada tahap ini.</p>
        ) : currentData.status === 'in_progress' ? (
          <p className="mt-4 text-yellow-500 italic">Tahap ini sedang berlangsung.</p>
        ) : (
          <p className="mt-4 text-gray-400 italic">Tahap ini belum dibuka.</p>
        )}

        {stageInfoContent?.[currentData.status] && (
          <div className="mt-4 bg-gray-100 p-4 rounded-md border text-gray-700 max-w-2xl mx-auto whitespace-pre-line">
            {stageInfoContent[currentData.status]}
          </div>
        )}
      </div>
    </div>
  );
}
