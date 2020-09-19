import React, { useEffect, useState } from "react";
import Nweet from "Components/Nweet";
import { dbService } from "fBase";
import NweetFactory from "Components/NweetFactory";

const Home = ({ userObject }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService.collection("nweets").onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNweets(nweetArray);
    });
  }, []);
  return (
    <div>
      <NweetFactory userObject={userObject} />
      <div>
        {nweets.map(nweet =>
          <Nweet key={nweet.id} nweetObject={nweet} isOwner={nweet.creatorId === userObject.uid} />
        )}
      </div>
    </div>
  );
};

export default Home;
