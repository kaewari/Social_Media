import React, { useRef, useState } from "react";
import { Image } from "react-bootstrap";
import "./PostUpload.css";
function PostUpload() {
  const [mind, setMind] = useState();
  const name = useRef("Son");
  return (
    <div className="post-upload">
      <div className="top">
        <Image
          src="https://loremflickr.com/640/480/animals"
          alt={name.current}
          roundedCircle
          width={40}
          height={40}
        />
        <input
          className="w-100"
          placeholder={`What's on your mind, ${name.current}?`}
          type="text"
          onChange={(e) => setMind(e.target.value)}
        />
      </div>
      <hr />
      <div className="bottom">
        <div>Live Video</div>
        <div>Photo/video</div>
        <div>Feeling/activity</div>
      </div>
    </div>
  );
}

export default PostUpload;
