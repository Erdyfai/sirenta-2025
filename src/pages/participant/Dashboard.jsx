import { Accordion } from '@mui/material';
import Navbar from '../../components/Navbar';

export default function Dashboard() {
  return (
    <div className="">
      <Navbar />
      <div className="md:mt-24 flex-[1] md:flex-[2] bg-white p-6 sm:p-10 flex flex-col justify-center items-center text-center">
        <h1 className="font-semibold mb-4">This is Dashboard page</h1>
      </div>
    </div>
  );
}


