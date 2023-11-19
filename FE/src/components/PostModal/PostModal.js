// src/PostModal.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalPostActions";
import "./PostModal.css"; // Import the CSS file
import { Button, Card, CloseButton, Image, Form } from "react-bootstrap";
import moment from "moment";
const list = [];
const PostModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, selectedPost } = useSelector((state) => state.modal);
  const [show, setShow] = useState(false);
  const closeModalHandler = () => {
    document.body.style.overflowY = "scroll";
    dispatch(closeModal());
  };
  function showMoreComments() {
    setShow(!show);
  }
  function sendComment(e) {
    e.preventDefault();
  }
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
              <Card>
                <div className="m-2 p-2">
                  <div className="d-flex">
                    <img className="avatar" src={selectedPost.image} alt="" />

                    <div className="d-flex flex-column">
                      <span className="fw-bold ms-2">{selectedPost._id}</span>
                      <span className="ms-2">
                        {moment().startOf("hour").fromNow()}
                      </span>
                    </div>
                  </div>
                  <Card.Title>{selectedPost.content}</Card.Title>
                  <Card.Title>
                    This is content from selectedPost {selectedPost._id}
                  </Card.Title>
                </div>
                <Card.Img src={selectedPost.image} />
                <Card.Body>
                  <div className="d-flex justify-content-center">
                    <div className="body d-flex justify-content-between">
                      <Button>
                        <i className="fa-solid fa-thumbs-up"></i>
                        Like
                      </Button>
                      <Button>
                        <i className="fa-solid fa-comment"></i>
                        Comment
                      </Button>
                      <Button>
                        <i className="fa-solid fa-share"></i>
                        Share
                      </Button>
                    </div>
                  </div>
                  <Form onSubmit={sendComment} className="d-flex">
                    <a href={selectedPost.image}>
                      <img
                        className="avatar"
                        src={selectedPost.image}
                        alt={selectedPost.title}
                      />
                    </a>
                    <input
                      id={selectedPost.id}
                      className="comment ms-2 rounded w-100 rounded-4 ps-2"
                      type="text"
                      placeholder="Write your comment"
                      required={true}
                    />
                  </Form>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                  <p>{selectedPost._id}</p>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
