import React from 'react';
import { Button } from '@mui/material';

export default function ButtonComponent({ name, onClick }) {
  return (
    <Button variant="contained" onClick={onClick}>
      {name}
    </Button>
  );
}
