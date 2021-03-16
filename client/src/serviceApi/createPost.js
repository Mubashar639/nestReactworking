const { default: axios } = require("axios");
const { BaseUrl } = require("./baseUrl");

export const createPost = async (payload) => {
  const url = `${BaseUrl}product/create`;
  return await axios.post(url, payload);
};
