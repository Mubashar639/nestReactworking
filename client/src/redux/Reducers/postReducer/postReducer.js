import * as postAction from "../../actions/postAction";

const initialstate = {
  loading: false,
  posts: [],
  singlePost: {},
  errors: [],
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case postAction.ADD_POST:
      return { ...state, loading: false, user: action.payload };
    case postAction.POST_GET:
      return { ...state, posts: action.payload, loading: false };
    case postAction.POST_GET_ONE:
      return { ...state, singlePost: action.payload, loading: false };
    case postAction.POST_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
}
