import { dbService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = ({ userObject }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
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
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map(nweet =>
          <div key={nweet.id}>
            <h4>
              {nweet.text}
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
