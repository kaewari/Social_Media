// src/PostModal.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalPost } from "../../store/modalPostActions";
import { openModalPostShare } from "../../store/modalPostShareActions";
import PostDesign from "../Post/PostDesign";
import "./PostModal.css";
const PostModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, selectedPost } = useSelector((state) => state.modalPost);
  console.log(modalOpen);
  const closeModalHandler = () => {
    dispatch(closeModalPost());
  };
  const openModalShareHandler = () => {
    console.log(1231232);
    dispatch(openModalPostShare(selectedPost));
  };
  return (
    <>
      {modalOpen && (
        <div className="modal" onClick={closeModalHandler}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="title">
              <div className="invisible"></div>
              <h4 className="text-center">Title</h4>
              <div
                className="btn-close close"
                onClick={closeModalHandler}
              ></div>
            </div>
            <div className="comments-container">
              <PostDesign
                post={selectedPost}
                openModalPostHandler={null}
                openModalShareHandler={openModalShareHandler}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
