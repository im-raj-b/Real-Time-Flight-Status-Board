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
import { useState, useEffect } from "react";
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

export interface TableProps {
  flightsData: Flight[];
  loadingFlag?: boolean;
}

export default function FlightStatusTable() {
  const [flightsData, setFlightsData] = useState<[]>([]);
  const [loadingFlag, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchFlights().then((data) => {
      console.log(data);
      setFlightsData(data);
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    console.log("Second UseEffect");

    const interval = setInterval(() => {
      //   setLoading(true);
      fetchFlights().then((data) => {
        console.log(data);
        setFlightsData(data);
        // setLoading(false);
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box sx={{ width: "80%", margin: "auto", textAlign: "center", mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Real-Time Flight Status Board
        </Typography>
        <FlightTable flightsData={flightsData} loadingFlag={loadingFlag} />
      </Box>
    </>
  );
}

export const FlightTable: React.FC<TableProps> = (props) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      {props.loadingFlag && (
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
            <TableCell align="right">Departure time</TableCell>
            <TableCell align="right">Destination</TableCell>
            <TableCell align="right">Flight number</TableCell>
            <TableCell align="right">Origin</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.flightsData.length ? (
            props.flightsData.map((row: Flight) => (
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              No flight data available
            </div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
