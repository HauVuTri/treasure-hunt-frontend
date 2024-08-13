import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Paper,
  Box,
  FormHelperText
} from '@mui/material';

const MatrixInput = ({ onSubmit }) => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [p, setP] = useState(3); // Default value for `p`
  const [matrix, setMatrix] = useState(Array(3).fill().map(() => Array(3).fill(1)));
  const [error, setError] = useState('');

  useEffect(() => {
    setMatrix(Array(rows).fill().map(() => Array(cols).fill(1)));
  }, [rows, cols]);

  const handleMatrixChange = (r, c, value) => {
    const newMatrix = [...matrix];
    newMatrix[r][c] = value;
    setMatrix(newMatrix);
  };

  const handleSubmit = () => {
    const isValid = matrix.every(row => row.every(cell => cell > 0 && cell <= p));
    if (!isValid) {
      setError(`All matrix cells must contain a number between 1 and ${p}.`);
      return;
    }

    setError('');
    onSubmit({ rows, cols, p, matrix });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Enter Treasure Map Details
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ marginBottom: 2 }}>
          <TextField
            label="Rows"
            type="number"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value) || 1)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: 500 }}
          />
          <TextField
            label="Columns"
            type="number"
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value) || 1)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: 500 }}
          />
          <TextField
            label="Number of Chests (p)"
            type="number"
            value={p}
            onChange={(e) => setP(parseInt(e.target.value) || 1)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: rows * cols }}
          />
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {matrix.map((row, rIndex) =>
            row.map((col, cIndex) => (
              <Grid item xs={Math.max(12 / cols, 2)} key={`${rIndex}-${cIndex}`}>
                <TextField
                  type="number"
                  value={matrix[rIndex][cIndex]}
                  onChange={(e) => handleMatrixChange(rIndex, cIndex, parseInt(e.target.value) || 1)}
                  inputProps={{ min: 1, max: p }}
                  fullWidth
                />
              </Grid>
            ))
          )}
        </Grid>
        {error && (
          <FormHelperText error sx={{ marginTop: 2 }}>
            {error}
          </FormHelperText>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ marginTop: 3 }}
        >
          Calculate Fuel
        </Button>
      </Paper>
    </Container>
  );
};

export default MatrixInput;
