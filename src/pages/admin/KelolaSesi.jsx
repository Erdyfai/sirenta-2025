import Navbar from '../../components/Navbar';

export default function KelolaSesi() {
  return (
    <div className="">
      <Navbar />
      <div className="md:mt-24 flex-[1] md:flex-[2] bg-base-100 p-6 sm:p-10 flex flex-col justify-center items-center text-center">
            <h1 className="font-semibold mb-4 text-cyan-500">This is Admin Kelola Sesi page</h1>
      </div>
    </div>
  );
}