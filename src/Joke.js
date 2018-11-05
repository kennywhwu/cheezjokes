import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        {this.props.joke}
        <button className="up" onClick={() => this.props.handleClick('up')}>
          Up
        </button>
        <button className="down" onClick={() => this.props.handleClick('down')}>
          Down
        </button>
      </div>
    );
  }
}

export default Joke;
