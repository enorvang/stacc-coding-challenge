import axios from "axios";
const baseUrl = "https://fintech-webinar-2020-api.vercel.app/api";
const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik0wTXhNVEEzTVVFeU5rRkZSREZGTnpSRE1VUXdPVVU0TXpBNFF6QkdRVVF6UkVSRE1VSTNSUSJ9.eyJpc3MiOiJodHRwczovL3N0YWNjeC5ldS5hdXRoMC5jb20vIiwic3ViIjoiejQ0RGdzWVFKREtyNTRCcmZvU0x3c2pLWWRtUDRLdWtAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc3RhY2MuZmludGVjaCIsImlhdCI6MTYwMTIwNTAwNywiZXhwIjoxNjAzNzk3MDA3LCJhenAiOiJ6NDREZ3NZUUpES3I1NEJyZm9TTHdzaktZZG1QNEt1ayIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.fBvgUGcc1zS3eStbdGo19mLC6KqOdMeBdo_xuZEBz9jCzllRfrgqIhPbys5Se2XreGxu5_6oKWlXbqDOvnbuvjTJKnhoO9Aom1meUjqbQgaROeN0hbmPxVDKF-JDtOdZbAWtZv1ds9bWF0zqo9Z7ogicZ0eUi8FnEA2h2I6peVQPL9cJJwSfhjXPW73Ws4e6c0vynnhXLc5BcQgst0iaMZd4n3tdruzP_bgEY5GqbKvJxHjL2KNHh933VZSZdx_7mf4imsgsed2AL1QkIkqj5lvf_niyzrEmOLs_K_rSOZqRzO0c1u9wxrCK7qlryzpv8nz3C3zXfNdnMQHOejOFpQ";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 3000, //if request takes longer than 3 seconds, don't complete it.
  headers: { "Authorization" : `Bearer ${token}`},
});

const getAll = async () => {
  const response = await instance.get("/accounts");
  return response.data;
};
/*
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
*/
export default { getAll };
