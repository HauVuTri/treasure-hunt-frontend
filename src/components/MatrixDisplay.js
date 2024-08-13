import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const MatrixDisplay = ({ matrix }) => {
  const cols = matrix[0].length;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 2,
        marginTop: 4,
      }}
    >
      {matrix.map((row, rIndex) =>
        row.map((value, cIndex) => (
          <Paper
            key={`${rIndex}-${cIndex}`}
            elevation={4}
            sx={{
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" align="center">
              {value}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default MatrixDisplay;
