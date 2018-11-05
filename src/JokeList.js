import React, { Component } from 'react';
import './JokeList.css';
import Joke from './Joke';
import axios from 'axios';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = { votes: [] };
    this.vote = this.vote.bind(this);
  }

  async componentDidMount() {
    let response = await axios.get('https://icanhazdadjoke.com/', {
      headers: { accept: 'application/json' }
    });
  }

  vote(direction, id) {}

  render() {
    return (
      <div className="JokeList">
        <Joke handleClick={this.vote} />
      </div>
    );
  }
}

export default JokeList;
