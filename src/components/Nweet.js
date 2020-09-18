import React, { useState } from "react";
import { dbService, storageService } from "fBase";

const Nweet = ({ nweetObject, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObject.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet ?");
    if (ok) {
      await dbService.doc(`nweets/${nweetObject.id}`).delete();
      await storageService.refFromURL(nweetObject.attachmentUrl).delete();
    }
  }
  const toggleEditing = () => {
    setEditing(prev => !prev);
  }
  const onSubmit = async e => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObject.id}`).update({
      text: newNweet
    });
    setEditing(false);
  }
  const onChange = e => {
    const { target: { value } } = e;
    setNewNweet(value);
  }
  return (
    <div>
      {editing ?
      <form onSubmit={onSubmit}>
        <input value={newNweet} onChange={onChange} placeholder="Edit your nweet" required />
        <input type="submit" value="Update Nweet" />
        <button onClick={toggleEditing}>Cancel</button>
      </form> :
      <>
        <h4>
          {nweetObject.text}
        </h4>
        {nweetObject.attachmentUrl && <img src={nweetObject.attachmentUrl} width="50px" height="50px" alt="attachment" />}
        {isOwner && 
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button onClick={toggleEditing}>Edit Nweet</button>
        </>}
      </>}
    </div>
  );
};

export default Nweet;
