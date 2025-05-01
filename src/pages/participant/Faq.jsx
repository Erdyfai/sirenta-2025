import Accordion from '../../components/Accordion';
import Navbar from '../../components/Navbar';
import faqData from '../../mockdata/faqdata';

export default function Faq() {
  return (
    <div className="">
      <Navbar />
      <div className="md:mt-24 flex-[1] md:flex-[2] p-6 sm:p-10 flex flex-col items-center">
        <h4 className="text-white font-semibold mb-4">FREQUENTLY ASKED QUESTIONS</h4>

        {faqData.map((faq) => {
          return <Accordion key={faq.id} question={faq.question} answer={faq.answer} />;
        })}
      </div>
    </div>
  );
}
