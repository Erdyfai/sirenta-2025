import React from 'react';
import Modal from './Modal';

export default function Table({ data, onInputNilai }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-6">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>NIM</th>
              <th>Nama</th>
              <th>Motivasi</th>
              <th>Catatan</th>
              <th>Nilai</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th>{rowIndex + 1}</th>
                <td>{row.nim}</td>
                <td>{row.name}</td>
                <td>{row.motivasi}</td>
                <td>{row.catatan}</td>
                <td>{row.nilai}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-xs btn-soft btn-primary">Lihat CV</button>
                    <button onClick={() => onInputNilai(row)} className="btn btn-xs btn-soft btn-secondary">
                      Input Nilai
                    </button>
                    <button className="btn btn-xs btn-soft btn-accent">Detail</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
