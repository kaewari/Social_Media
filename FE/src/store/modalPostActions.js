export const openModalPost = (post) => ({
  type: "OPEN_MODAL",
  payload: post,
});

export const closeModalPost = () => ({
  type: "CLOSE_MODAL",
});
