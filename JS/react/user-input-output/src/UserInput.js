import React from 'react';

const UserInput = (props) => {
  const handleNameChange = event => {
    props.nameHandler(event.target.value);
  };

  const styles = {
    backgroundColor: 'light-gray',
    border: "1px solid blue",
    boxShadow: "3px 5px #eee",
  };

  return (
    <input style={styles} type="text" value={props.name} onChange={handleNameChange}/>
  );
};

export default UserInput;
