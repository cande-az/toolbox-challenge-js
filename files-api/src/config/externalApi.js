const axios = require("axios");
const { EXTERNAL_API, EXTERNAL_SECRET } = require("./envs");

const externalApi = axios.create({
  baseURL: `${EXTERNAL_API}/secret`,
  headers: {
    Authorization: `Bearer ${EXTERNAL_SECRET}`,
  },
});

module.exports = externalApi;