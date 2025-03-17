import React from 'react';
import { TextField } from '@mui/material';

export default function InputField({ label, type, value, onChange, required }) {
  return <TextField variant="outlined" label={label} type={type} value={value} onChange={onChange} required={required} size="normal"></TextField>;
}
