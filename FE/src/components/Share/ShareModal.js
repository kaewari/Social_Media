import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalPostShare } from "../../store/modalPostShareActions";
import { Form } from "react-bootstrap";
import "./ShareModal.css";
function ShareModal() {
  const dispatch = useDispatch();
  const { modalOpen, selectedPost } = useSelector(
    (state) => state.modalPostShare
  );
  const closeModalHandler = () => {
    dispatch(closeModalPostShare());
  };
  return (
    <>
      {modalOpen && (
        <div className="share-modal" onClick={closeModalHandler}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="title">
              <div className="invisible"></div>
              <h4 className="text-center">Share</h4>
              <div
                className="btn-close close"
                onClick={closeModalHandler}
              ></div>
            </div>
            <div class="comments-container">
              <div class="search">
                <div className="user">
                  <span class="p-3">To:</span>
                  <input type="text" placeholder="Search for people and groups"/>
                </div>
                <div class="list-account">
                  <div className="p-3">
                    <span>No account found</span>
                  </div>
                </div>
              </div>
              <div className="text-center mb-2">
                <button className="btn btn-primary" style={{ width: "90%" }}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ShareModal;
