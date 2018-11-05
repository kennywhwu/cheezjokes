import React, { Component } from 'react';
import './JokeList.css';
import Joke from './Joke';
import axios from 'axios';
// import uuid from 'uuid/v4';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = { jokes: [], isLoading: true };
    this.vote = this.vote.bind(this);
    this.refreshList = this.refreshList.bind(this);
  }

  async componentDidMount() {
    if (JSON.parse(localStorage.getItem('jokes'))) {
      this.setState({
        jokes: JSON.parse(localStorage.getItem('jokes')),
        isLoading: false
      });
    } else {
      let jokes = [];
      for (let i = 0; i < 10; i++) {
        await this.requestJoke(jokes);
      }
      this.setState({ jokes, isLoading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('jokes', JSON.stringify(this.state.jokes));
  }

  async requestJoke(jokes) {
    let response = await axios.get('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' }
    });
    let joke = { joke: response.data.joke, id: response.data.id, votes: 0 };

    if (jokes.every((e, i) => e.id !== joke.id)) {
      jokes.push(joke);
    } else {
      await this.requestJoke(jokes);
    }
  }

  vote(direction, id) {
    console.log(direction, id);
    let newJoke = {
      joke: this.state.jokes[id].joke,
      votes: this.state.jokes[id].votes,
      id: this.state.jokes[id].id
    };

    // Change vote total based on direction
    if (direction === 'up') {
      newJoke.votes += 1;
    } else {
      newJoke.votes -= 1;
    }

    // Pull in jokes array from current state
    let votedJokes = {
      jokes: [
        ...this.state.jokes.slice(0, id),
        newJoke,
        ...this.state.jokes.slice(id + 1)
      ]
    };

    // Order jokes based on reverse order vote
    let orderedJokes = votedJokes.jokes.sort((a, b) => b.votes - a.votes);

    // Set state
    this.setState(st => ({
      jokes: orderedJokes
    }));
  }

  async refreshList() {
    localStorage.removeItem('jokes');
    this.setState({ isLoading: true });
    let jokes = [];
    for (let i = 0; i < 10; i++) {
      await this.requestJoke(jokes);
    }
    this.setState({ jokes, isLoading: false });
  }

  render() {
    let result;
    let jokes;
    if (!this.state.isLoading) {
      jokes = this.state.jokes.map((e, i) => (
        <Joke
          joke={e.joke}
          key={e.id}
          id={i}
          handleClick={this.vote}
          votes={e.votes}
        />
      ));
      result = (
        <div>
          {jokes}
          <button onClick={this.refreshList}>Refresh Jokes</button>
        </div>
      );
    } else {
      result = (
        <h1>It's loading already, can you just wait a minute please???</h1>
      );
    }

    return <div className="JokeList">{result}</div>;
  }
}

export default JokeList;
