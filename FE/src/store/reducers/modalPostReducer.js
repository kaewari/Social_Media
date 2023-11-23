const initialState = {
  modalOpen: false,
  post: null,
};

const modalPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
      return {
        ...state,
        modalOpen: true,
        selectedPost: action.payload,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        modalOpen: false,
        post: null,
      };
    default:
      return state;
  }
};
export default modalPostReducer;
