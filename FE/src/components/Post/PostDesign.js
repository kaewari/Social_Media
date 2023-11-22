import moment from "moment";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";

function PostDesign({
  post,
  openModalPostHandler = null,
  openModalShareHandler,
}) {
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const toggleLikeHandle = () => {
    setLike(!like);
  };
  const sendCommentHandle = (e) => {
    e.preventDefault();
    setComment("");
  };
  return (
    <Card className="post">
      <div className="m-2 p-2">
        <div className="d-flex">
          <img className="avatar me-2" src={post.image} alt={post.username} />
          <div className="d-flex flex-column">
            <p className="fw-bold m-0">This is a username of post {post._id}</p>
            <p className="m-0" style={{ fontSize: "x-small" }}>
              {moment().startOf("hour").fromNow()}
            </p>
          </div>
        </div>
        <Card.Title>{post.content}</Card.Title>
        <Card.Title>This is content from post {post._id}</Card.Title>
      </div>
      <Card.Img src={post.image} />
      <Card.Body>
        <div className="d-flex justify-content-center">
          <div className="body d-flex justify-content-between">
            <Button onClick={toggleLikeHandle}>
              {like ? (
                <i className="fa-solid fa-thumbs-up text-primary"></i>
              ) : (
                <i className="fa-solid fa-thumbs-up"></i>
              )}
              Like
            </Button>
            <Button onClick={openModalPostHandler}>
              <i className="fa-solid fa-comment"></i>
              Comment
            </Button>
            <Button onClick={openModalShareHandler}>
              <i className="fa-solid fa-share"></i>
              Share
            </Button>
          </div>
        </div>
        <Form onSubmit={sendCommentHandle} className="comment-form">
          <div className="d-flex">
            <a href={post.image}>
              <img className="avatar" src={post.image} alt={post.title} />
            </a>
            <textarea
              id={post.id}
              className="comment rounded w-100 rounded-1 h-100"
              type="text"
              placeholder="Write your comment"
              value={comment}
              required={true}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PostDesign;
