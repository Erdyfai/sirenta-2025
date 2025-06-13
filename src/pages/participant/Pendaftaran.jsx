import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import useParticipantStore from '../../stores/useParticipantStore';

const RegisterForm = () => {
  const { profile, fetchProfile, registerParticipant } = useParticipantStore();
  
  const [form, setForm] = useState({
    nama: '',
    nim: '',
    angkatan: '',
    email: '',
    whatsapp: '',
    gender: '',
    motivasi: '',
    ide: '',
    file: null,
  });

  // Auto-fetch profile saat komponen dimount
  useEffect(() => {
    if (!profile) {
      fetchProfile();
    }
  }, [profile, fetchProfile]);

  // Auto-isi form jika profile sudah tersedia
  useEffect(() => {
    if (profile) {
      setForm((prev) => ({
        ...prev,
        nama: profile.name || '',
        nim: profile.nim || '',
        email: profile.email || '',
        angkatan: profile.angkatan || '',
        whatsapp: profile.whatsapp || '',
        gender: profile.gender || '',
      }));
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    await registerParticipant(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-35 py-10 px-4">
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Field Form (sama seperti sebelumnya) */}
          <div>
            <label htmlFor="nama" className="block font-semibold text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="nim" className="block font-semibold text-gray-700 mb-1">NIM</label>
            <input
              type="text"
              name="nim"
              value={form.nim}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="angkatan" className="block font-semibold text-gray-700 mb-1">Angkatan</label>
            <input
              type="text"
              name="angkatan"
              value={form.angkatan}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block font-semibold text-gray-700 mb-1">WhatsApp</label>
            <input
              type="tel"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Jenis Kelamin</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Pria"
                  checked={form.gender === 'Pria'}
                  onChange={handleChange}
                  className="accent-orange-500"
                />
                Pria
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Wanita"
                  checked={form.gender === 'Wanita'}
                  onChange={handleChange}
                  className="accent-orange-500"
                />
                Wanita
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="motivasi" className="block font-semibold text-gray-700 mb-1">Motivasi</label>
            <textarea
              name="motivasi"
              value={form.motivasi}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border rounded-md"
            ></textarea>
          </div>

          <div>
            <label htmlFor="ide" className="block font-semibold text-gray-700 mb-1">Ide Kreatif</label>
            <textarea
              name="ide"
              value={form.ide}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border rounded-md"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Lampiran CV (.pdf max 1MB)</label>
            <a href="/template-cv.pdf" download className="text-orange-500 text-sm mb-2 inline-block">📄 Download Template CV</a>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block mt-2 w-full file:border-0 file:py-2 file:px-4 file:rounded file:bg-gray-100"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white font-bold px-6 py-3 rounded-md hover:bg-orange-600 transition duration-200"
            >
              Daftar
            </button>
          </div>
        </form>

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
