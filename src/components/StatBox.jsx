import React from 'react';

export default function StatBox({ title, value, color = 'text-black' }) {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${color}`}>{value}</div>
    </div>
  );
}
