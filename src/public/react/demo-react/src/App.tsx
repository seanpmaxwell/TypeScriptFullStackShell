import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {

    async function callExpress() {

      try {

        let response = await fetch('/api/say-hello/SeanMaxwell')
                              .then(res => res.json());

        alert('Hi this is a response from the backend: ' + response.response);

      } catch (err) {
        alert(err);
      }
    }

    callExpress();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

}

export default App;
