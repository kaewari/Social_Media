export const openModal = (post) => ({
  type: "OPEN_MODAL",
  payload: post,
});

export const closeModal = () => ({
  type: "CLOSE_MODAL",
});
