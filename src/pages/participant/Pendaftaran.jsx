import React from 'react';
import Navbar from '../../components/Navbar';

const RegisterForm = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-35 py-10 px-4">
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-8">
        <form className="space-y-6">
          {/* Nama */}
          <div>
            <label htmlFor="nama" className="block font-semibold text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              placeholder="nama lengkap"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          {/* NIM */}
          <div>
            <label htmlFor="nim" className="block font-semibold text-gray-700 mb-1">
              Nomor Induk Mahasiswa
            </label>
            <input
              type="tel"
              id="nim"
              placeholder="202xxxxxxxxxxxx"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
            {/* Angkatan */}
            <div>
            <label htmlFor="angkatan" className="block font-semibold text-gray-700 mb-1">
              Angkatan
            </label>
            <input
              type="text"
              id="angkatan"
              placeholder="202x"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Pastikan email yang dimasukkan aktif.</p>
          </div>

          {/* Nomor WhatsApp */}
          <div>
            <label htmlFor="whatsapp" className="block font-semibold text-gray-700 mb-1">
              Nomor WhatsApp
            </label>
            <input
              type="tel"
              id="whatsapp"
              placeholder="08xxxxxxxxxx"
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Pastikan nomor yang dimasukkan aktif.</p>
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Jenis Kelamin
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="Pria" className="accent-orange-500" />
                Pria
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="Wanita" className="accent-orange-500" />
                Wanita
              </label>
            </div>
          </div>

          {/* Motivasi */}
          <div>
            <label htmlFor="motivasi" className="block font-semibold text-gray-700 mb-1">
              Jelaskan motivasi kamu untuk menjadi asisten laboratorium!
            </label>
            <textarea
              id="motivasi"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows="4"
              placeholder="Tuliskan motivasimu di sini..."
            ></textarea>
          </div>

          {/* Ide Kreatif */}
          <div>
            <label htmlFor="ide" className="block font-semibold text-gray-700 mb-1">
              Jelaskan ide kreatif anda!
            </label>
            <textarea
              id="ide"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows="4"
              placeholder="Yuk tuliskan ide kreatifmu di sini..."
            ></textarea>
          </div>

          {/* Upload File */}
          <div className="mb-4">
           <div className="flex items-center justify-between mb-2">
            <label className="block font-semibold text-gray-700 mb-1">Lampiran .pdf (max. 1mb)</label>
          </div>
          <a
              href="/template-cv.pdf" 
              download
              className="text-orange-500 text-sm border border-orange-300 px-3 py-1 rounded hover:bg-orange-100"
             >
              📄 Download Template CV
          </a>
          <input
            type="file"
            id="file"
            accept=".pdf"
            className="block pt-5 w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-4
                      file:rounded file:border-0 file:text-sm file:font-semibold
                      file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

          {/* Tombol Daftar */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white font-bold px-6 py-3 rounded-md hover:bg-orange-600 transition duration-200"
            >
              Daftar
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="mt-10 text-center text-xs text-gray-500">
          Developed by Information System Division Infotech © 2025
          <br />
          Informatics Laboratory, University of Muhammadiyah Malang
        </footer>
      </div>
    </div>
  );
};

export default RegisterForm;
