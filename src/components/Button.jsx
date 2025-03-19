import React from 'react';
import { Button } from '@mui/material';

export default function ButtonComponent({ name, onClick, size }) {
  return (
    <Button variant="contained" onClick={onClick} size={size}>
      {name}
    </Button>
  );
}
