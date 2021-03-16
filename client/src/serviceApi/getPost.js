const { default: axios } = require("axios");
const { BaseUrl } = require("./baseUrl");

export const getPost = async ({ page, limit }) => {
  const url = `${BaseUrl}product/all?page=${page}&limit=${limit}`;
  return await axios.get(url, {});
};
//localhost:4000/product/id?id=60505fbeade1037b32f1b544
export const getOnePost = async ({ id }) => {
  const url = `${BaseUrl}product/id?id=${id}`;
  return await axios.get(url);
};
