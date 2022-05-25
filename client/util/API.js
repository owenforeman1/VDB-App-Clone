// Axios is a popular NPM package used for preforming API requests
import axios from "axios";
const APIKEY = "a784963fa24f4f1e9cd7ca071a414ca4";

// Using axios, we create a search method that is specific to our use case and export it at the bottom
const search = (query) =>
  axios.get(`https://api.rawg.io/api/games?search=${query}&key=${APIKEY}`);

// Export an object with a "search" method that searches the Giphy API for the passed query
export default search;