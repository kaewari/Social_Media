import moment from "moment";
import React, { useRef, useState } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/modalPostActions";
import "./Post.css";
const list = [];
const max = 5;
function Post({ post }) {
  const postRef = useRef();
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const openModalHandler = () => {
    // document.getElementById("index-page").style.overflowY = "hidden";
    dispatch(openModal(post));
  };

  function showComments() {
    setShow(!show);
  }
  const SendComment = (e) => {
    e.preventDefault();
    // setCount(count + 1);
    console.log(count);
    if (count <= max && count >= 0) {
      console.log(comment);
      list.push(comment);
      setCount(count + 1);
    }
    if (count > max) {
      console.log("block");
    }

    setComment("");
    setTimeout(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, count * 10000);
  };
  return (
    <div className="pb-2 pt-2">
      <Card className="post">
        <div className="m-2 p-2">
          <div className="d-flex">
            <img className="avatar" src={post.image} alt="" />

            <div className="d-flex flex-column">
              <span className="fw-bold ms-2">{post._id}</span>
              <span className="ms-2">{moment().startOf("hour").fromNow()}</span>
            </div>
          </div>
          <Card.Title>{post.content}</Card.Title>
          <Card.Title>This is content from post {post._id}</Card.Title>
        </div>
        <Card.Img src={post.image} />
        <Card.Body>
          <div className="d-flex justify-content-center">
            <div className="body d-flex justify-content-between">
              <Button>
                <i className="fa-solid fa-thumbs-up"></i>
                Like
              </Button>
              <Button onClick={openModalHandler}>
                <i className="fa-solid fa-comment"></i>
                Comment
              </Button>
              <Button>
                <i className="fa-solid fa-share"></i>
                Share
              </Button>
            </div>
          </div>
          <Form onSubmit={SendComment} className="d-flex">
            <a href={post.image}>
              <img className="avatar" src={post.image} alt={post.title} />
            </a>
            <input
              id={post.id}
              className="comment rounded w-100 rounded-4"
              type="text"
              placeholder="Write your comment"
              value={comment}
              required={true}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Post;
