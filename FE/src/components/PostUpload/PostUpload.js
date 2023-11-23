import React, { useRef, useState } from "react";
import { Image, Modal } from "react-bootstrap";
import "./PostUpload.css";
import MediaFile from "./Photo_Video/MediaFile";
function PostUpload() {
  const [mind, setMind] = useState();
  const [media, setMedia] = useState(false);
  const name = useRef("Son");
  function openPhotoVideo() {
    setMedia(true);
  }
  function closePhotoVideo() {
    setMedia(false);
  }
  return (
    <div className="post-upload">
      <div className="top">
        <Image
          src="https://loremflickr.com/640/480/animals"
          alt={name.current}
          roundedCircle
          width={40}
          height={40}
          loading="lazy"
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
        <div onClick={openPhotoVideo}>Photo/video</div>
        <div>Feeling/activity</div>
      </div>
    </div>
  );
}

export default PostUpload;
