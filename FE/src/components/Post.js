import moment from "moment";
import React, { useState } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import "../components/Post.css";
const list = [];
const max = 5;
function Post(props) {
  const data = props.post;
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
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
    <Card>
      <div className="m-2 p-2">
        <div className="d-flex">
          <img className="avatar" src={data.image} alt="" />

          <div className="d-flex flex-column">
            <span className="fw-bold ms-2">{data._id}</span>
            <span className="ms-2">{moment().startOf("hour").fromNow()}</span>
          </div>
        </div>
        <Card.Title>{data.content}</Card.Title>
      </div>
      <Card.Img src={data.image} />
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
        <Form onSubmit={SendComment} className="d-flex">
          <a href={data.image}>
            <img className="avatar" src={data.image} alt={data.title} />
          </a>
          <input
            id={data.id}
            className="comment ms-2 rounded w-100 rounded-4 ps-2"
            type="text"
            placeholder="Write your comment"
            value={comment}
            required={true}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form>
        {list.length > 3 ? (
          <>
            <div className="d-flex">
              <a href={data.image}>
                <Image className="avatar" src={data.image} alt={data.title} />
              </a>
              <div className="d-flex flex-column">
                <span>{data.title}</span>
                <span>{list[list.length - 1]}</span>
              </div>
            </div>
            {!show && (
              <p className="show-comment" onClick={showComments}>
                More comment
              </p>
            )}
          </>
        ) : (
          list.map((item, index) => (
            <div className="d-flex">
              <a key={index} href={data.image}>
                <Image className="avatar" src={data.image} alt={data.title} />
              </a>
              <div className="d-flex flex-column">
                <span>{data.title}</span>
                <p key={index}>{item}</p>
              </div>
            </div>
          ))
        )}
        {show &&
          list.map((item, index) => (
            <div className="d-flex ">
              <a href={data.image}>
                <Image className="avatar" src={data.image} alt={data.title} />
              </a>
              <div className="d-flex flex-column">
                <span>{data.title}</span>
                <p key={index}>{item}</p>
              </div>
            </div>
          ))}
        {show && (
          <p className="show-comment" onClick={showComments}>
            Less comment
          </p>
        )}
      </Card.Body>
    </Card>
  );
}

export default Post;
