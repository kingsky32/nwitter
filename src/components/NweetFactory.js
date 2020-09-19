import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fBase";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoVideo, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  padding: 1rem 1.4rem;
  position: relative;
  border-bottom: 1px solid ${props => props.theme.whiteColor}25;
`;

const Input = styled.input`
  font-size: 1.8rem;
  padding: .9rem 0;
  &::placeholder {
    color: ${props => props.theme.whiteColor}75;
  }
`;

const ThumbContainer = styled.div`
  width: 100%;
  height: 19rem;
  margin-top: 1rem;
  position: relative;
`;

const RemovePhoto = styled.button`
  color: ${props => props.theme.whiteColor};
  position: absolute;
  top: .8rem;
  left: .5rem;
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1.5rem;
`;

const FileSelector = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  padding: .7rem;
  margin-top: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.blueColor};
  position: relative;
`;

const FileSelectorInput = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  &::before {
    display: none;
  }
`;

const Submit = styled.button`
  background-color: ${props => props.theme.blueColor};
  padding: .8rem 2rem;
  border-radius: 8rem;
  font-size: 1.4rem;
  position: absolute;
  bottom: 1rem;
  right: 1.4rem;
`;

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
    setAttachment("");
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
  const onClearAttachment = () => setAttachment("");
  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        value={nweet}
        onChange={onChange}
        placeholder="What's on your mind?"
        maxLength={120}
      />
      {attachment !== "" &&
        <ThumbContainer>
          <RemovePhoto onClick={onClearAttachment}>
            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
          </RemovePhoto>
          <Thumb src={attachment} width="50px" height="50px" alt="thumb" />
        </ThumbContainer>}
      <FileSelector>
        <FontAwesomeIcon icon={faPhotoVideo} size="2x" />
        <FileSelectorInput type="file" accept="image/*" onChange={onFileChange} />
      </FileSelector>
      <Submit type="submit">Nweet</Submit>
    </Form>
  );
};

export default NweetFactory;
