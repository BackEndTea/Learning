import React, {Component} from 'react';
import './App.css';
import ValidationComponent from "./ValidationComponent";
import CharComponent from "./CharComponent";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    }
  }

  updateInputText = e => {
    this.setState({inputText: e.target.value})
  };

  charRemovalHandler = (id) => {
    let inputText = this.state.inputText;
    inputText = inputText.slice(0, id) + inputText.slice(id +1);

    this.setState({inputText})
  };

  render() {
    const inputText = this.state.inputText;
    const map = Array.prototype.map;
    return (
      <div className="App">
        <input
          type="text"
          value={inputText}
          onChange={this.updateInputText}
        />
        <p>{inputText.length} </p>
        <ValidationComponent
          len={inputText.length}
        />
        {map.call(inputText,(char,id) => <CharComponent key={id} char={char} id={id} onClickHandler={() => this.charRemovalHandler(id)}/> )}
        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (=> ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (=> CharComponent) and style it as an inline box (=> display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
      </div>
    );
  }
}

export default App;
