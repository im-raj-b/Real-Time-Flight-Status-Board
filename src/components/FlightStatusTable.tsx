import {
  Backdrop,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";
import { fetchFlights } from "../api/flighsAPI";

export interface Flight {
  id: number;
  flightNumber: string;
  destination: string;
  airline: string;
  departureTime: string;
  origin: string;
  status: string;
}

export default function FlightStatusTable() {
  const [flightsData, setFlightsData] = useState<Flight[]>([]);
  const [loadingFlag, setLoading] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchFlightData = async () => {
    try {
      const data = await fetchFlights();
      console.log("Fetching flight data:", data);
      setFlightsData(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const startPolling = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (document.visibilityState === "visible") {
          fetchFlightData();
        }
      }, 30000);
    }
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    // Initial API call
    setLoading(true);
    fetchFlightData().finally(() => setLoading(false));

    // Start polling on initial render
    startPolling();

    // Handle tab visibility change
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startPolling(); // Start polling when tab is active
      } else {
        stopPolling(); // Stop polling when tab is inactive
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling(); // Clean up polling on component unmount
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []); // Only run on initial render

  return (
    <Box sx={{ width: "80%", margin: "auto", textAlign: "center", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Real-Time Flight Status Board
      </Typography>
      <FlightTable flightsData={flightsData} loadingFlag={loadingFlag} />
    </Box>
  );
}

export const FlightTable: React.FC<{
  flightsData: Flight[];
  loadingFlag?: boolean;
}> = ({ flightsData, loadingFlag }) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      {loadingFlag && (
        <Backdrop
          open={true}
          sx={{
            position: "absolute",
            zIndex: 2,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <Spinner />
        </Backdrop>
      )}
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Airline</TableCell>
            <TableCell align="right">Departure Time</TableCell>
            <TableCell align="right">Destination</TableCell>
            <TableCell align="right">Flight Number</TableCell>
            <TableCell align="right">Origin</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flightsData.length ? (
            flightsData.map((row) => (
              <TableRow
                key={row.id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/flight/${row.id}`)}
              >
                <TableCell component="th" scope="row">
                  {row.airline}
                </TableCell>
                <TableCell align="right">
                  {new Date(row.departureTime).toLocaleString("en-US", {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </TableCell>
                <TableCell align="right">{row.destination}</TableCell>
                <TableCell align="right">{row.flightNumber}</TableCell>
                <TableCell align="right">{row.origin}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No flight data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
