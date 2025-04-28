import { useState } from 'react';
import timelineData from '../dummy/timelineData';
import {
  Loader2,
  CheckCircle,
  XCircle,
  FileText,
  Pencil,
  Mic,
  Users,
} from 'lucide-react';

export default function Timeline() {
  const failedIndex = timelineData.findIndex((item) => item.status === 'failed');
  const inProgressIndex = timelineData.findIndex((item) => item.status === 'inProgress');
  
  const initialIndex =
    failedIndex !== -1 ? failedIndex :
    inProgressIndex !== -1 ? inProgressIndex :
    0;
  
  const [current, setCurrent] = useState(initialIndex);

  const handlePrev = () => {
    setCurrent((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev < timelineData.length - 1 ? prev + 1 : prev));
  };

  const getStageIcon = (title) => {
    if (title.includes('Pendaftaran')) return <FileText className="w-10 h-10 text-orange-500" />;
    if (title.includes('Tahap 1')) return <Pencil className="w-10 h-10 text-orange-500" />;
    if (title.includes('Tahap 2')) return <Mic className="w-10 h-10 text-orange-500" />;
    if (title.includes('Tahap 3')) return <Users className="w-10 h-10 text-orange-500" />;
    return null;
  };

  const renderStatusIcon = (status) => {
    if (status === 'done') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'inProgress') return <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />;
    if (status === 'failed') return <XCircle className="w-5 h-5 text-red-500" />;
    return <div className="w-4 h-4 rounded-full border-2 border-gray-400 bg-white" />;
  };

  const currentData = timelineData[current];

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
            style={{ width: `${(current / (timelineData.length - 1)) * 100}%` }}
          ></div>

          <div className="absolute top-full left-0 w-full flex justify-between mt-2">
            {timelineData.map((item, index) => {
                const clickableStatuses = ['done', 'failed', 'inProgress'];
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
                    <span className="mt-1">{getStageIcon(item.title)}</span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                );
            })}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-2 bg-orange-500 rounded-full disabled:opacity-50"
          disabled={current === initialIndex}
        >
          <span className="text-xl">→</span>
        </button>
      </div>

      <div className="text-center mt-20">
        <h2 className="text-3xl text-gray-600 font-bold">{currentData.title}</h2>
        <p className="italic text-gray-500 mt-2">- {currentData.date}, 2025</p>

        {currentData.status === 'done' ? (
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto">{currentData.description}</p>
        ) : currentData.status === 'failed' ? (
          <p className="mt-4 text-red-600 font-semibold">Anda tidak lolos pada tahap ini.</p>
        ) : (
          <p className="mt-4 text-yellow-500 italic">Konten akan tersedia setelah tahap ini selesai.</p>
        )}
      </div>
    </div>
  );
}
