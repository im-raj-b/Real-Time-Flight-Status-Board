import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchFlightDetails } from "../api/flighsAPI";
import { Button } from "@mui/material";

export default function FlightDetails() {
  const { id } = useParams<{ id: string }>();
  const [flightDetails, setFlightDetails] = useState<[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFlightDetails(id).then((data) => {
      setFlightDetails(data);
    });
    // fetch("https://flight-status-mock.core.travelopia.cloud/flights/" + id)
    //   .then((res) => res.json())
    //   .then((data) => {
    //   });
  }, []);
  return (
    <div>
      <div>Flight Number: {flightDetails.flightNumber}</div>
      <div>Airline: {flightDetails.airline}</div>
      <div>Origin: {flightDetails.origin}</div>
      <div>Status: {flightDetails.status}</div>
      <div>Departure time: {flightDetails.departureTime}</div>
      <div>Destination: {flightDetails.destination}</div>
      <Button variant="outlined" onClick={() => navigate("/")}>
        Back
      </Button>
    </div>
  );
}
