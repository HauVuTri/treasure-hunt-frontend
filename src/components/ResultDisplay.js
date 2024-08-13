import React from 'react';
import { Typography, Container } from '@mui/material';

const ResultDisplay = ({ fuelUsed }) => {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Minimum Fuel Required: {fuelUsed}
      </Typography>
    </Container>
  );
};

export default ResultDisplay;
