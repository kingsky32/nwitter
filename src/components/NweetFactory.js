import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fBase";

const NweetFactory = ({ userObject }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async e => {
    e.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${userObject.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObject = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObject.uid,
      attachmentUrl
    };
    await dbService.collection("nweets").add(nweetObject);
    setNweet("");
  };
  const onChange = e => {
    const { target: { value } } = e;
    setNweet(value);
  };
  const onFileChange = e => {
    const { target: { files } } = e;
    const [theFile] = files;
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const { currentTarget: { result } } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={nweet}
        onChange={onChange}
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment &&
        <div>
          <img src={attachment} width="50px" height="50px" alt="thumb" />
          <button onClick={onClearAttachment}>Clear Photo</button>
        </div>}
    </form>
  );
};

export default NweetFactory;