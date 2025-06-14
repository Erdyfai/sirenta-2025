import { useEffect } from 'react';
import Accordion from '../../components/Accordion';
import Navbar from '../../components/Navbar';
import { useFaqStore } from '../../stores/useFaqStores';

export default function Faq() {
  const { faqList, isLoadingFaq, fetchFaq } = useFaqStore();

  useEffect(() => {
    fetchFaq();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-[90%] mx-auto pt-28">
        <div className="pb-6">
          <h4 className="font-semibold text-center text-2xl">FAQ</h4>
        </div>

        {isLoadingFaq ? (
          <p className="text-center text-gray-500">Memuat data FAQ...</p>
        ) : faqList.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada data FAQ.</p>
        ) : (
          faqList.map((faq) => (
            <Accordion
              key={faq.id}
              question={faq.pertanyaan}
              answer={faq.answer}
            />
          ))
        )}
      </div>
    </div>
  );
}
