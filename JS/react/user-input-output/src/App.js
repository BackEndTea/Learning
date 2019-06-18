import React, {useReducer} from 'react';
import UserCard from "./UserCard";
import './UserCard.css';

// function Counter({initialCount}) {
//   const [count, setCount] = useState(initialCount);
//   return (
//     <>
//       Count: {count}
//       <button onClick={() => setCount(initialCount)}>Reset</button>
//       <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
//       <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
//     </>
//   );
// }

const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return {count: initialState['count']};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <React.Fragment>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </React.Fragment>
  );
}

function App() {
  return (
    <div>
      <UserCard/>
      <UserCard/>
      <Counter />
    </div>
  );
}

export default App;
