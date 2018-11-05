import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
  // static defaultProps = {
  //   votes: 0
  // };

  render() {
    return (
      <div className="Joke">
        <span>{this.props.joke}</span>
        <i
          className="up fas fa-thumbs-up"
          onClick={() => this.props.handleClick('up', this.props.id)}
        />{' '}
        <i
          className="down fas fa-thumbs-down"
          onClick={() => this.props.handleClick('down', this.props.id)}
        />{' '}
        <i className="vote-total">{this.props.votes}</i>
      </div>
    );
  }
}

export default Joke;
