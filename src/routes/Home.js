import Nweet from "components/Nweet";
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = ({ userObject }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  useEffect(() => {
    dbService.collection("nweets").onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNweets(nweetArray);
    });
  }, []);
  const onSubmit = async e => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObject.uid
    });
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
    <div>
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
      <div>
        {nweets.map(nweet =>
          <Nweet key={nweet.id} nweetObject={nweet} isOwner={nweet.creatorId === userObject.uid} />
        )}
      </div>
    </div>
  );
};

export default Home;
