import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'; // A trophy icon for successful results
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; // An error icon for unsolvable maps

const ResultDisplay = ({ fuelUsed }) => {
  if (fuelUsed === null) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 4,
        }}
      >
        <Card
          sx={{
            minWidth: 275,
            maxWidth: 400,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: '#f5f5f5',
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'error.main', width: 56, height: 56 }}>
                <ErrorOutlineIcon fontSize="large" />
              </Avatar>
            </Box>
            <Typography
              variant="h5"
              component="div"
              align="center"
              gutterBottom
              sx={{ color: 'text.primary', fontWeight: 'bold' }}
            >
              Unsolvable Map
            </Typography>
            <Typography
              variant="body1"
              component="div"
              align="center"
              sx={{ color: 'text.secondary' }}
            >
              This map cannot be solved. Please check the input and try again.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }
  else if(fuelUsed === -9999) {
    return ('');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 400,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: '#f5f5f5',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
              <EmojiEventsIcon fontSize="large" />
            </Avatar>
          </Box>
          <Typography
            variant="h5"
            component="div"
            align="center"
            gutterBottom
            sx={{ color: 'text.primary', fontWeight: 'bold' }}
          >
            Minimum Fuel Required
          </Typography>
          <Typography
            variant="h4"
            component="div"
            align="center"
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            {fuelUsed.toFixed(5)} units
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResultDisplay;
