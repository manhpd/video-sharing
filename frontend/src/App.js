import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    message: null
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/top_pages')
      .then(res => {
        let message = res.data.message;
        this.setState({message: message});
      }, err => {
        console.log(err)
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Front end</h1>
        <p>Message from backend: </p>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
export default App;
