import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
  // static defaultProps = {
  //   votes: 0
  // };

  render() {
    return (
      <div className="Joke">
        {this.props.joke}{' '}
        <i
          className="up fas fa-thumbs-up"
          onClick={() => this.props.handleClick('up', this.props.id)}
        />{' '}
        <i
          className="down fas fa-thumbs-down"
          onClick={() => this.props.handleClick('down', this.props.id)}
        />{' '}
        {this.props.votes}
      </div>
    );
  }
}

export default Joke;
