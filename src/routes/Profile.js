import React, { useState } from "react";
import { authService } from "fBase";
import { useHistory } from "react-router-dom";

export default ({ userObject, refreshUser }) => {
  const [newDisplayname, setNewDisplayName] = useState(userObject.displayName);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  }
  const onChange = e => {
    const {
      target: { value }
    } = e;
    setNewDisplayName(value);
  }
  const onSubmit = async e => {
    e.preventDefault();
    if (userObject.displayName !== newDisplayname) {
      await userObject.updateProfile({
        displayName: newDisplayname
      });
      refreshUser();
    }
  }
  return <>
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayname} />
      <input type="submit" value="Update Profile" />
    </form>
    <button onClick={onLogOutClick}>Log Out</button>
  </>;
};
