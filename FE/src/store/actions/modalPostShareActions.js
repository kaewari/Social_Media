export const openModalPostShare = (post) => ({
  type: "OPEN_MODAL_SHARE",
  payload: post,
});

export const closeModalPostShare = () => ({
  type: "CLOSE_MODAL_SHARE",
});
