const BASE_URL = "https://flight-status-mock.core.travelopia.cloud/flights";

export const fetchFlights = async () => {
  try {
    const responsePromise = await fetch(BASE_URL);
    const response = await responsePromise.json();
    return response;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

export const fetchFlightDetails = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching flight details:", error);
    throw error;
  }
};
