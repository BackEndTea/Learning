import React, {useState} from 'react';
import UserInput from "./UserInput";
import UserOutput from "./UserOutput";

const UserCard = () => {
  const [name, setName] = useState('Foo');
  const handleNameChange = (newName) => {
    setName(newName);
  };
  return (
    <div className="userCard">
      <UserInput
        name={name}
        handleNameChange={handleNameChange}
      />
      <UserOutput
        name={name}
      />
    </div>
  )
};

export default UserCard;
