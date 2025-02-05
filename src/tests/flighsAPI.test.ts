import { fetchFlights, fetchFlightDetails } from "../api/flighsAPI";

// Type assertion to tell TypeScript that `fetch` is a Jest mock function
global.fetch = jest.fn() as jest.Mock;

describe("Flight API functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetchFlights should return flight data", async () => {
    const mockResponse = [
      {
        id: expect.any(Number),
        flightNumber: expect.any(String),
        airline: expect.any(String),
        origin: expect.any(String),
        destination: expect.any(String),
        departureTime: expect.any(String),
        status: expect.any(String),
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const data = await fetchFlights();
    expect(data).toEqual(expect.arrayContaining(mockResponse));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://flight-status-mock.core.travelopia.cloud/flights"
    );
  });

  test("fetchFlights should handle fetch errors", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchFlights()).rejects.toThrow("Network error");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("fetchFlightDetails should return flight details", async () => {
    const flightId = "1";
    const mockResponse = {
      id: expect.any(Number),
      flightNumber: expect.any(String),
      airline: expect.any(String),
      origin: expect.any(String),
      destination: expect.any(String),
      departureTime: expect.any(String),
      status: expect.any(String),
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        id: 1,
        flightNumber: "A1B68",
        airline: "Airline 1",
        origin: "Origin 1",
        destination: "Destination 1",
        departureTime: "2025-02-03T16:52:50.152Z",
        status: "On Time",
      }),
    });

    const data = await fetchFlightDetails(flightId);
    expect(data).toEqual(expect.objectContaining(mockResponse));
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://flight-status-mock.core.travelopia.cloud/flights/${flightId}`
    );
  });

  test("fetchFlightDetails should handle fetch errors", async () => {
    const flightId = "4";
    (fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch flight details")
    );

    await expect(fetchFlightDetails(flightId)).rejects.toThrow(
      "Failed to fetch flight details"
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
