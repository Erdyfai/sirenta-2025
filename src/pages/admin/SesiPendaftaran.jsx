import { useParams, useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';

import sesidata from '../../mockdata/sesidata';

export default function Pendaftaran() {
  const { sesiId, tahap } = useParams();
  const navigate = useNavigate();
  const [peserta, setPeserta] = useState([]);

  useEffect(() => {
    const sesi = sesidata.find((s) => s.namasesi === sesiId);
    if (sesi) {
      const pesertaTahap = sesi.peserta.filter((p) => p.tahapsekarang.toLowerCase() === decodeURIComponent(tahap).toLowerCase());
      setPeserta(pesertaTahap);
    } else {
      setPeserta([]);
    }
  }, [sesiId, tahap]);

  const columns = [
    { header: '#', accessor: 'index', render: (row, index) => index + 1 },
    { header: 'Nama Peserta', accessor: 'nama' },
    { header: 'NIM', accessor: 'nim' },
    {
      header: 'Nilai',
      accessor: 'nilai',
      render: (row) => {
        const nilai = row.nilai;
        return nilai ? nilai : <span className="text-gray-500">Belum dinilai</span>;
      },
    },

    {
      header: 'Aksi',
      accessor: 'aksi',
      render: (row) => {
        const nilai = row.nilai;
        return (
          <div className="flex gap-2">
            <button onClick={() => handleLulus(row)} disabled={!nilai} className="btn btn-xs btn-soft btn-success">
              Lulus
            </button>
            <button onClick={() => handleTidakLulus(row)} disabled={!nilai} className="btn btn-xs btn-soft btn-error">
              Tidak lulus
            </button>
          </div>
        );
      },
    },

    {
      header: 'Status',
      accessor: 'status',
      render: (row) => row.status || <span className="text-gray-400 italic">Belum ditentukan</span>,
    },
  ];

  const handleLulus = (row) => {
    // Logic to mark participant as passed
    console.log(`Peserta ${row.nama} dengan NIM ${row.nim} lulus`);
  };

  const handleTidakLulus = (row) => {
    // Logic to mark participant as not passed
    console.log(`Peserta ${row.nama} dengan NIM ${row.nim} tidak lulus`);
  };

  return (
    <>
      <div className="min-h-screen w-[90%] mx-auto pb-10 pt-28">
        <Navbar />
        <h1 className="text-2xl font-semibold mb-3">
          Daftar peserta {} - {decodeURIComponent(tahap)}
        </h1>

        <button className="btn btn-sm bg-orange-lab text-white hover:bg-orange-700 mb-4" onClick={() => navigate(-1)}>
          Kembali
        </button>

        {peserta && peserta.length > 0 ? (
          <Table columns={columns} data={peserta} />
        ) : (
          <p className="text-gray-500">Tidak ada peserta terdaftar untuk tahap ini.</p>
        )}
      </div>
    </>
  );
}
