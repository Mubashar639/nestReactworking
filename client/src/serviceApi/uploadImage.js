const { default: axios } = require("axios");
const { BaseUrl } = require("./baseUrl");

export const uploadImage = async (payload) => {
  const url = `${BaseUrl}product/uploadImage`;
  return await axios.post(url, payload);
};
