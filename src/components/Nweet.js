import React, { useState } from "react";
import { dbService, storageService } from "fBase";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem 1.4rem;
  border-bottom: 1px solid ${props => props.theme.whiteColor}25;
`;

const NweetText = styled.h4`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: 19rem;
  margin: .5rem 0 1rem;
  object-fit: cover;
  border-radius: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: ${props => props.theme.blueColor};
  padding: .8rem 2rem;
  border-radius: 8rem;
  font-size: 1.4rem;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Input = styled.input`
  font-size: 1.8rem;
  padding: .9rem 0;
  &::placeholder {
    color: ${props => props.theme.whiteColor}75;
  }
`;

const Submit = styled.input`
  background-color: ${props => props.theme.blueColor};
  padding: .8rem 2rem;
  border-radius: 8rem;
  font-size: 1.4rem;
  &:not(:last-child) {
    margin-right: 1rem;
  }
`;

const BorderButton = styled(Button)`
  background-color: transparent;
  color: ${props => props.theme.blueColor};
  border: 1px solid ${props => props.theme.blueColor};
`;

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
    <Container>
      {editing ?
      <form onSubmit={onSubmit}>
        <Input value={newNweet} onChange={onChange} placeholder="Edit your nweet" required />
        <ButtonContainer>
          <Submit type="submit" value="Update Nweet" />
          <BorderButton onClick={toggleEditing}>Cancel</BorderButton>
        </ButtonContainer>
      </form> :
      <>
        <NweetText>
          {nweetObject.text}
        </NweetText>
        {nweetObject.attachmentUrl && <Image src={nweetObject.attachmentUrl} width="50px" height="50px" alt="attachment" />}
        {isOwner && 
        <ButtonContainer>
          <Button onClick={toggleEditing}>Edit Nweet</Button>
          <BorderButton onClick={onDeleteClick}>Delete Nweet</BorderButton>
        </ButtonContainer>}
      </>}
    </Container>
  );
};

export default Nweet;
