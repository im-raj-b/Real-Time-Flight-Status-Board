import { useEffect, useState } from "react";
import "./App.css";
import FlightStatusTable from "./components/FlightStatusTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightDetails from "./components/FlightDetails";

function App() {
  console.log("Load");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FlightStatusTable />} />
          <Route path="/flight/:id" element={<FlightDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
