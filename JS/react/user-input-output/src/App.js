import React, {useState} from 'react';
import UserInput from "./UserInput";
import UserOutput from "./UserOutput";


function App() {
  const [name, setName] = useState('Foo');
  const [nameTwo, setNameTwo] = useState('Bar');

  const handleNameChange = (newName, nameHandler) => {
    nameHandler(newName);
  };
  return (
    <div>
      <div class="userCard">
      <UserInput name={name} nameHandler={setName} handleNameChange={handleNameChange}/>
      <UserOutput name={name}  />
      </div>
      <div className="userCard">
      <UserInput name={nameTwo} nameHandler={setNameTwo} handleNameChange={handleNameChange}/>
      <UserOutput name={nameTwo}/>
      </div>
    </div>
  );
}

export default App;
