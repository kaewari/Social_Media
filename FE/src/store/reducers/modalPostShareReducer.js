const initialState = {
  modalOpen: false,
  post: null,
};

const modalPostShareReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MODAL_SHARE":
      return {
        ...state,
        modalOpen: true,
        selectedPost: action.payload,
      };
    case "CLOSE_MODAL_SHARE":
      return {
        ...state,
        modalOpen: false,
        post: null,
      };
    default:
      return state;
  }
};
export default modalPostShareReducer;
