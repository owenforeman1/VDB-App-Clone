// Axios is a popular NPM package used for preforming API requests
import "dotenv/config";
import axios from "axios";
const APIKEY = process.env.APIKEY;

// Using axios, we create a search method that is specific to our use case and export it at the bottom
const search = (query) =>
  axios.get(`https://api.rawg.io/api/games?search=${query}&key=${APIKEY}`);

// Export an object with a "search" method that searches the Giphy API for the passed query
export default search;
