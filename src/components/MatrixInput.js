import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Paper,
  Box,
  FormHelperText,
  Input,
} from "@mui/material";

const MatrixInput = ({ rows, cols, p, matrix, onSubmit }) => {
  const [currentRows, setRows] = useState(rows);
  const [currentCols, setCols] = useState(cols);
  const [currentP, setP] = useState(p);
  const [currentMatrix, setMatrix] = useState(matrix);
  const [error, setError] = useState("");

  // Update the state when the props change
  useEffect(() => {
    setRows(rows);
    setCols(cols);
    setP(p);
    setMatrix(matrix);
  }, [rows, cols, p, matrix]);

  // Adjust the matrix size when rows or columns change
  useEffect(() => {
    const newMatrix = Array(currentRows)
      .fill()
      .map((_, rIndex) =>
        Array(currentCols)
          .fill()
          .map((_, cIndex) =>
            currentMatrix[rIndex] && currentMatrix[rIndex][cIndex]
              ? currentMatrix[rIndex][cIndex]
              : 1
          )
      );
    setMatrix(newMatrix);
  }, [currentRows, currentCols]);

  const handleMatrixChange = (r, c, value) => {
    const newMatrix = [...currentMatrix];
    newMatrix[r][c] = value;
    setMatrix(newMatrix);
  };

  const handleRandomize = () => {
    const newMatrix = Array(currentRows)
      .fill()
      .map(() =>
        Array(currentCols)
          .fill()
          .map(() => Math.floor(Math.random() * currentP) + 1)
      );
    setMatrix(newMatrix);
  };

  const handleSubmit = () => {
    const isValid = currentMatrix.every((row) =>
      row.every((cell) => cell > 0 && cell <= currentP)
    );
    if (!isValid) {
      setError(`All matrix cells must contain a number between 1 and ${currentP}.`);
      return;
    }

    setError("");
    onSubmit({ rows: currentRows, cols: currentCols, p: currentP, matrix: currentMatrix });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Enter Treasure Map Details
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ marginBottom: 2 }}
        >
          <TextField
            label="Rows"
            type="number"
            value={currentRows}
            onChange={(e) => setRows(parseInt(e.target.value) || 1)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: 500 }}
          />
          <TextField
            label="Columns"
            type="number"
            value={currentCols}
            onChange={(e) => setCols(parseInt(e.target.value) || 1)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: 500 }}
          />
          <TextField
            label="Number of Chests (p)"
            type="number"
            value={currentP}
            onChange={(e) => setP(parseInt(e.target.value) || 1)}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: currentRows * currentCols }}
          />
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {currentMatrix.map((row, rIndex) =>
            row.map((col, cIndex) => (
              <Grid
                item
                sx={{ width: `${100 / currentCols}%` }} // Set width as a percentage
                key={`${rIndex}-${cIndex}`}
              >
                <Input
                  type="number"
                  value={currentMatrix[rIndex][cIndex]}
                  onChange={(e) =>
                    handleMatrixChange(
                      rIndex,
                      cIndex,
                      parseInt(e.target.value) || 1
                    )
                  }
                  inputProps={{ min: 1, max: currentP }}
                  fullWidth
                  sx={{
                    padding: '0px' 
                  }}
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
          color="secondary"
          onClick={handleRandomize}
          fullWidth
          sx={{ marginTop: 3 }}
        >
          Randomize
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Calculate Fuel
        </Button>
      </Paper>
    </Container>
  );
};

export default MatrixInput;
