import Navbar from '../../components/Navbar';

export default function Faq() {
  return (
    <div className="">
      <Navbar />
      <div className="flex-[1] md:flex-[2] bg-white p-6 sm:p-10 flex flex-col justify-center items-center text-center order-1 md:order-1">
            <h1 className="font-semibold mb-4">This is FAQ page</h1>
      </div>
    </div>
  );
}