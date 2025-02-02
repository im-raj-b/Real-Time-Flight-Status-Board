# Real-Time Flight Status Board

## ✈️ Overview
This project is a React-based application built with TypeScript that mimics a real-time flight status board. It retrieves flight details from an API, updates the data at regular intervals, and allows users to view detailed information about a specific flight.

## 🚀 Features
- **Flight Table**: Displays a list of flights with details such as:
  - Flight Number
  - Airline
  - Origin & Destination
  - Departure Time
  - Status (On Time, Delayed, Boarding, Departed)
- **Auto-refresh**: Fetches fresh data every '30' seconds to update flight statuses.
- **Detail View**: Clicking on a flight opens a detailed view with comprehensive flight data.
- **Navigation**: Uses React Router for seamless navigation between the flight board and detail views.
- **Error Handling**:
  - Displays messages for network errors, API issues.
- **User-friendly UI**: Clean, readable, and accessible design.

## 🛠 Tech Stack
- **Language**: TypeScript
- **Framework**: React
- **HTTP Client**: Fetch API
- **Testing**: Jest

## 📦 Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/flight-status-board.git
   ```
2. Navigate to the project folder:
   ```sh
   cd flight-status-board
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## 🧪 Running Tests
Test cases are not written yet.

## 📡 API Endpoints
- Fetch all flights: `https://flight-status-mock.core.travelopia.cloud/flights`
- Fetch flight details: `https://flight-status-mock.core.travelopia.cloud/flights/:id`


## 📷 Screenshots

![image](https://github.com/user-attachments/assets/f42c5793-b14c-44ba-8993-85d2c7b7419c)


