import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import MatrixInput from "./components/MatrixInput";
import ResultDisplay from "./components/ResultDisplay";
import Header from "./components/Header";
import DrawerMenu from "./components/DrawerMenu";
import { CircularProgress, Box, CssBaseline, Typography } from "@mui/material";
import { calculateFuel, fetchPreviousResults } from "./services/apiService";
import { jwtDecode } from "jwt-decode";

function App() {
  const [fuelUsed, setFuelUsed] = useState(-9999);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [history, setHistory] = useState([]); // State to store the history

  // Check for token and parse username on initial load
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token && token !== "undefined") {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ]
        );
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }

    if (isAuthenticated) {
      fetchPreviousResults()
        .then((response) => {
          setHistory(response.data); // Store the fetched history
        })
        .catch((error) => {
          console.error("Failed to fetch calculation history:", error);
        });
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = (token) => {
    if (token) {
      localStorage.setItem("jwtToken", token);
    } else if (localStorage.getItem("jwtToken")) {
      token = localStorage.getItem("jwtToken");
    }
    try {
      const decodedToken = jwtDecode(token);
      setUsername(
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ]
      );
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUsername("");
    setIsAuthenticated(false);
    setFuelUsed(null);
    handleDrawerToggle();
  };

  const handleSubmit = async (data) => {
    if (!isAuthenticated) {
      alert("Please login first.");
      return;
    }

    setLoading(true);
    try {
      const response = await calculateFuel(data);

      if (response.data.fuelUsed === null) {
        setFuelUsed(null);
      } else {
        setFuelUsed(response.data.fuelUsed);

        // Optionally, update the history state after a new calculation
        fetchPreviousResults()
          .then((response) => {
            setHistory(response.data); // Update the history
          })
          .catch((error) => {
            console.error("Failed to fetch calculation history:", error);
          });
      }
    } catch (error) {
      console.error("Failed to calculate fuel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "block" }}>
      <CssBaseline />
      <Header username={username} onMenuClick={handleDrawerToggle} />
      <DrawerMenu
        open={drawerOpen}
        onClose={handleDrawerToggle}
        onLogout={handleLogout}
      />
      <Box component="main"  sx={{
    display: "flex",
    flexGrow: 1,
    p: 3,
    paddingTop: "64px", // Adjust this value if your header height is different
  }}>
        {!isAuthenticated ? (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <Box sx={{ flex: 2, marginRight: 2 }}>
              <MatrixInput onSubmit={handleSubmit} />
              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 4,
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              {!loading && <ResultDisplay fuelUsed={fuelUsed} />}
            </Box>
            <Box
              sx={{
                flex: 1,
                padding: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                maxHeight: "400px", // Set a fixed height for the container
                overflowY: "auto", // Enable vertical scrolling
              }}
            >
              <Typography variant="h6" gutterBottom>
                Calculation History
              </Typography>
              {history.map((entry, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    Map {entry.mapId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rows: {entry.rowsCount}, Columns: {entry.colsCount}, P:{" "}
                    {entry.p}
                  </Typography>
                  {entry.results.map((result) => (
                    <Typography
                      variant="body2"
                      key={result.resultId}
                      sx={{ marginTop: 1, color: "primary.main" }}
                    >
                      {new Date(result.calculatedAt).toLocaleString()} - Fuel
                      Used: {result.fuelUsed}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
