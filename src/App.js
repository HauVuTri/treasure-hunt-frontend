import React, { useState, useEffect } from "react";
import LoginPage from "./components/LoginPage";
import MatrixInput from "./components/MatrixInput";
import ResultDisplay from "./components/ResultDisplay";
import Header from "./components/Header";
import DrawerMenu from "./components/DrawerMenu";
import {
  Backdrop,
  CircularProgress,
  Box,
  CssBaseline,
  Typography,
  Button,
} from "@mui/material";
import {
  calculateFuel,
  fetchPreviousResults,
  fetchMapByMapId,
} from "./services/apiService";
import { jwtDecode } from "jwt-decode";

function App() {
  const [fuelUsed, setFuelUsed] = useState(-9999); //Assume that -9999 is not show status
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [history, setHistory] = useState([]); // State to store the history
  const [rows, setRows] = useState(3); // Default value is 3, but this can be adjusted
  const [cols, setCols] = useState(3); // Default value is 3, but this can be adjusted
  const [p, setP] = useState(3); // Default value for number of chests
  const [matrix, setMatrix] = useState(
    Array(3)
      .fill()
      .map(() => Array(3).fill(1))
  ); // Default 3x3 matrix filled with 1

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
  const comeBackToOldMap = async (mapId) => {
    try {
      setLoading(true); // Start loading
      // Fetch the map data for the given mapId
      const response = await fetchMapByMapId(mapId);
      setLoading(false); // Stop loading

      // Extract data and construct the matrix
      const { rowsCount, colsCount, p, treasureCells } = response.data;
      const matrix = Array(rowsCount)
        .fill()
        .map(() => Array(colsCount).fill(0));

      treasureCells.forEach((cell) => {
        matrix[cell.rowNum][cell.colNum] = cell.chestNumber;
      });

      // Update state
      setRows(rowsCount);
      setCols(colsCount);
      setP(p);
      setMatrix(matrix);
      setFuelUsed(-9999);
    } catch (error) {
      console.error("Failed to fetch map data:", error);
    }
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
      <Box
        component="main"
        sx={{
          display: "flex",
          flexGrow: 1,
          p: 3,
          paddingTop: "64px",
        }}
      >
        {!isAuthenticated ? (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <Box sx={{ flex: 2, marginRight: 2 }}>
              <MatrixInput
                rows={rows}
                cols={cols}
                p={p}
                matrix={matrix}
                onSubmit={handleSubmit}
              />
              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 4,
                  }}
                >
                  <Backdrop
                    open={loading}
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                  {/* <CircularProgress /> */}
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
                maxHeight: "400px",
                overflowY: "auto",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Calculation History
              </Typography>
              {history.map((entry, index) => (
                <Box key={index} sx={{ marginBottom: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    Map {entry.mapId}
                    <Button
                      onClick={() => comeBackToOldMap(entry.mapId)}
                      color="primary"
                      variant="outlined"
                    >
                      Come back to this map
                    </Button>
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
