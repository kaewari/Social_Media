// src/PostModal.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../store/modalPostActions";
import PostDesign from "../Post/PostDesign";
import "./PostModal.css";
const PostModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, selectedPost } = useSelector((state) => state.modalPost);
  const closeModalHandler = () => {
    dispatch(closeModal());
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
              <PostDesign post={selectedPost} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
