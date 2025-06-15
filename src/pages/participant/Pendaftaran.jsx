import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../components/Navbar';
import useParticipantStore from '../../stores/useParticipantStore';

const RegisterForm = () => {
  const navigate = useNavigate(); 
  const { profile, fetchProfile, registerParticipant } = useParticipantStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    if (!profile) fetchProfile();
  }, [profile, fetchProfile]);

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

    if (!form.motivasi || !form.ide || !form.file) {
      alert('Motivasi, ide, dan file wajib diisi.');
      return;
    }

    const payload = {
      user_motivation: form.motivasi,
      user_idea: form.ide,
      file: form.file,
    };

    setIsSubmitting(true);
    await registerParticipant(payload);
    navigate('/participant/dashboard'); 
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white pt-24 pb-12 px-4">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 border border-orange-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">
          Formulir Pendaftaran Asisten Laboratorium
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informasi Otomatis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['nama', 'nim', 'angkatan', 'email', 'whatsapp'].map((field) => (
              <div key={field}>
                <label className="block font-medium text-gray-700 capitalize">{field}</label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={form[field]}
                  disabled
                  className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
            ))}
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Jenis Kelamin</label>
            <div className="flex gap-6">
              {['L', 'P'].map((gender) => (
                <label key={gender} className="flex items-center gap-2 text-gray-600">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={form.gender === gender}
                    onChange={handleChange}
                    className="accent-orange-500"
                    disabled
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          {/* Motivasi dan Ide */}
          <div>
            <label className="block font-medium text-gray-700">Motivasi</label>
            <textarea
              name="motivasi"
              value={form.motivasi}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 border rounded-md bg-white"
              placeholder="Apa motivasimu menjadi asisten?"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium text-gray-700">Ide Kreatif</label>
            <textarea
              name="ide"
              value={form.ide}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-3 border rounded-md bg-white"
              placeholder="Tulis ide yang ingin kamu kontribusikan..."
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block font-medium text-gray-700">Lampiran CV (.pdf max 5MB)</label>
            <a
              href="/template-cv.pdf"
              download
              className="text-sm text-orange-500 underline block mb-2"
            >
              📄 Download Template CV
            </a>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0 file:text-sm file:font-semibold
                file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-orange-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-orange-600 transition ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Mendaftar...' : 'Daftar'}
            </button>
          </div>
        </form>

        <footer className="mt-10 text-center text-xs text-gray-500">
          Developed by Information System Division Infotech © 2025 <br />
          Informatics Laboratory, University of Muhammadiyah Malang
        </footer>
      </div>
    </div>
  );
};

export default RegisterForm;
