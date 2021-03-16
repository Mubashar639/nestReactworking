import { message } from "antd";
import { Redirect } from "react-router-dom";
import { getPost, getOnePost } from "../../serviceApi/getPost";
import { postLoading, postOneSuccessfull, postSuccessfull } from "../actions";

export const getPostFromBackend = ({ page, limit }) => async (dipsatch) => {
  dipsatch(postLoading());
  try {
    const response = await getPost({ page, limit });
    //citites fillter
    dipsatch(postSuccessfull(response.data));
  } catch (err) {
    if (err.response) {
      message.error(err.response.data.message);
    } else {
      message.error(err.message);
    }
  }
};

export const getPostOne = ({ id }, history) => async (dipsatch) => {
  dipsatch(postLoading());
  try {
    const response = await getOnePost({ id });
    //citites fillter
    dipsatch(postOneSuccessfull(response.data));
  } catch (err) {
    if (err.response) {
      message.error(err.response.data.message);
    } else {
      message.error(err.message);
    }
    history.push("/gallery");
  }
};
