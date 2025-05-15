import Accordion from '../../components/Accordion';
import Navbar from '../../components/Navbar';
import faqData from '../../mockdata/faqdata';

export default function Faq() {
  return (
    <div>
      <div className="min-h-screen w-[90%] mx-auto pt-28">
        <Navbar className />
        <div className=" pb-6">
          <h4 className="font-semibold text-center">FAQ</h4>
        </div>
        {faqData.map((faq) => {
          return <Accordion key={faq.id} question={faq.question} answer={faq.answer} />;
        })}
      </div>
    </div>
  );
}
