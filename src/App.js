import React, { useState } from 'react';
import MatrixInput from './components/MatrixInput';
import MatrixDisplay from './components/MatrixDisplay';
import ResultDisplay from './components/ResultDisplay';
import { CircularProgress, Container } from '@mui/material';
import { calculateFuel } from './services/apiService';

function App() {
  const [matrix, setMatrix] = useState(null);
  const [fuelUsed, setFuelUsed] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setMatrix(data.matrix);
    setLoading(true);
    try {
      const response = await calculateFuel(data);
      setFuelUsed(response.data.fuelUsed);
    } catch (error) {
      console.error('Failed to calculate fuel:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <MatrixInput onSubmit={handleSubmit} />
      {matrix && <MatrixDisplay matrix={matrix} />}
      {loading && (
        <Container sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress />
        </Container>
      )}
      {fuelUsed && !loading && <ResultDisplay fuelUsed={fuelUsed} />}
    </Container>
  );
}

export default App;
