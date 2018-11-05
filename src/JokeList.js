import React, { Component } from 'react';
import './JokeList.css';
import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid/v4';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = { votes: [], isLoading: true };
    this.vote = this.vote.bind(this);
  }

  async componentDidMount() {
    this.jokes = [];
    for (let i = 0; i < 10; i++) {
      await this.requestJoke();
    }
    this.setState({ isLoading: false });
  }

  async requestJoke() {
    let response = await axios.get('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' }
    });
    let joke = { joke: response.data.joke, id: uuid() };
    this.jokes.push(joke);
    console.log(this.jokes);
  }

  vote(direction, id) {}

  render() {
    let jokes;
    if (this.jokes) {
      jokes = this.jokes.map((e, i) => (
        <Joke joke={e.joke} key={e.id} handleClick={this.vote} />
      ));
    }

    return (
      <div className="JokeList">{this.state.isLoading ? undefined : jokes}</div>
    );
  }
}

export default JokeList;
