// src/PostModal.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../store/modalPostActions";
import "./PostModal.css"; // Import the CSS file
import { Button, Card, CloseButton, Image } from "react-bootstrap";
import moment from "moment";
import { Form } from "react-router-dom";
const list = [];
const PostModal = () => {
  const dispatch = useDispatch();
  const { modalOpen, selectedPost } = useSelector((state) => state.modal);
  const [show, setShow] = useState(false);
  const closeModalHandler = () => {
    dispatch(closeModal());
  };
  function showComments() {
    setShow(!show);
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
            {/* <div>
              <Card>
                <div className="m-2 p-2">
                  <div className="d-flex">
                    <img className="avatar" src={post.image} alt="" />

                    <div className="d-flex flex-column">
                      <span className="fw-bold ms-2">{post._id}</span>
                      <span className="ms-2">
                        {moment().startOf("hour").fromNow()}
                      </span>
                    </div>
                  </div>
                  <Card.Title>{post.content}</Card.Title>
                  <Card.Title>This is content from post {post._id}</Card.Title>
                </div>
                <Card.Img src={post.image} />
                <Card.Body>
                  <hr />
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
                  <hr />
                  <Form className="d-flex">
                    <a href={post.image}>
                      <img
                        className="avatar"
                        src={post.image}
                        alt={post.title}
                      />
                    </a>
                    <input
                      id={post.id}
                      className="comment ms-2 rounded w-100 rounded-4 ps-2"
                      type="text"
                      placeholder="Write your comment"
                      required={true}
                    />
                  </Form>
                  {list.length > 3 ? (
                    <>
                      <div className="d-flex">
                        <a href={post.image}>
                          <Image
                            className="avatar"
                            src={post.image}
                            alt={post.title}
                          />
                        </a>
                        <div className="d-flex flex-column">
                          <span>{post.title}</span>
                          <span>{list[list.length - 1]}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    list.map((item, index) => (
                      <div className="d-flex">
                        <a key={index} href={post.image}>
                          <Image
                            className="avatar"
                            src={post.image}
                            alt={post.title}
                          />
                        </a>
                        <div className="d-flex flex-column">
                          <span>{post.title}</span>
                          <p key={index}>{item}</p>
                        </div>
                      </div>
                    ))
                  )}
                  {show &&
                    list.map((item, index) => (
                      <div className="d-flex ">
                        <a href={post.image}>
                          <Image
                            className="avatar"
                            src={post.image}
                            alt={post.title}
                          />
                        </a>
                        <div className="d-flex flex-column">
                          <span>{post.title}</span>
                          <p key={index}>{item}</p>
                        </div>
                      </div>
                    ))}
                </Card.Body>
              </Card>
            </div> */}
            <hr />
            <div className="comments-container">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
