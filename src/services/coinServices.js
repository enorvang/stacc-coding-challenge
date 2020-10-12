import axios from "axios";
const baseUrl = "https://api.coingecko.com/api/v3";

/**
 * Used to ping the server.
 */
const pingServer = async () => {
  const response = await axios.get(`${baseUrl}/ping`);
  return response.data;
};

/**
 * Gets a list of coins given a certain currency.
 * @param {String} currency the currency to use
 */
const getAllCoinsForCurrency = async (currency) => {
  const response = await axios.get(`${baseUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
  return response.data;
}

/**
 * Gets information about a given coin.
 * @param {*} id id of coin, e.g. "bitcoin"
 */
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



export default { pingServer, getCoin, getAllCoinsForCurrency, getCoinHistory };
