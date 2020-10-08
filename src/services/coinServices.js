import axios from "axios";
const baseUrl = "https://api.coingecko.com/api/v3";

const pingServer = async () => {
  const response = await axios.get(`${baseUrl}/ping`);
  return response.data;
};

const getAllCoinsForCurrency = async (currency) => {
  const response = await axios.get(`${baseUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
  return response.data;
}

const getCoin = async (id) => {
  const response = await axios.get(`${baseUrl}/coins/${id}`);
  return response.data;
}

/**
 * Gets history for a given cryptocurrency. 
 * @param {*} id id of the coin, e.g. "bitcoin"
 * @param {*} date the date for which to show historic data. format: "dd-mm-yyyy"
 */
const getCoinHistory = async (id, date) => {
  const response = await axios.get(`${baseUrl}/coins/${id}/history?date=${date}`);
  return response.data;
}



export default { pingServer, getCoin, getAllCoinsForCurrency };
