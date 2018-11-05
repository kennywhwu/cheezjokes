/* React tests for JokeList component */

import React from 'react';
import { shallow, mount } from 'enzyme';
import JokeList from './JokeList';
import Joke from './Joke';
import toJson from 'enzyme-to-json';

// Smoke tests
it('should render without children without crashing', function() {
  shallow(<JokeList />);
});

it('should render with children without crashing', function() {
  mount(<JokeList />);
});

// Snapshot test
it('should match snapshot', function() {
  let wrapper = shallow(<JokeList />);
  // wrapper.setState({ vote: });
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

// // Simulation test
it('should display completed story when all prompts are submitted', function() {
  let wrapper = shallow(<JokeList />);
  wrapper.setState({
    jokes: [{ joke: 'hi', votes: 0 }],
    isLoading: false
  });
  let elem = wrapper.find('Joke').first();
  expect(elem.matchesElement(<Joke joke="hi" />)).toBe(true);
});

it('should display the correct number of votes based on up-vote/down-vote clicks', function() {
  let wrapper = mount(<JokeList />);
  wrapper.setState({
    jokes: [{ joke: 'hi', votes: 0 }],
    isLoading: false
  });
  wrapper
    .find('i.up')
    .first()
    .simulate('click');
  let elem = wrapper.find('i.vote-total').first();
  expect(elem.text()).toBe('1');
  wrapper
    .find('i.up')
    .first()
    .simulate('click');
  elem = wrapper.find('i.vote-total').first();
  expect(elem.text()).toBe('2');
  wrapper
    .find('i.down')
    .first()
    .simulate('click');
  elem = wrapper.find('i.vote-total').first();
  expect(elem.text()).toBe('1');
});

it('should display jokes in the right order based on vote total', function() {
  let wrapper = mount(<JokeList />);
  wrapper.setState({
    jokes: [{ joke: 'hi', votes: 1 }, { joke: 'bye', votes: 1 }],
    isLoading: false
  });
  wrapper
    .find('i.down')
    .first()
    .simulate('click');
  let elem = wrapper.find('span').first();
  expect(elem.text()).toBe('bye');
});
