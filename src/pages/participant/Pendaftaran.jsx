import React from 'react';

const RegisterForm = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">Sirent@</h1>
        <form className="space-y-6">
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
          <div>
            <label htmlFor="file" className="block font-semibold text-gray-700 mb-1">
              Lampiran .pdf (max. 1mb)
            </label>
            <a href="#" className="text-orange-500 text-sm underline mb-2 inline-block">
              📄 Download Template CV
            </a>
            <input
              type="file"
              id="file"
              accept=".pdf"
              className="block mt-1"
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
