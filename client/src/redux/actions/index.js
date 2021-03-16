import { POST_LOADING, POST_GET, POST_GET_ONE } from "./postAction";

export const postLoading = () => ({
  type: POST_LOADING,
});

export const postSuccessfull = (payload) => ({
  type: POST_GET,
  payload,
});

export const postOneSuccessfull = (payload) => ({
  type: POST_GET_ONE,
  payload,
});
