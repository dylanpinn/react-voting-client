import React from 'react';
import ReactDOM from 'react-dom';
import { Voting } from '../Voting';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate,
} from 'react-addons-test-utils';
import { List } from 'immutable';

it('renders a pair of buttons', () => {
  const component = renderIntoDocument(<Voting pair={['Trainspotting', '28 Days Later']} />);
  const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

  expect(buttons.length).toBe(2);
  expect(buttons[0].textContent).toBe('Trainspotting');
  expect(buttons[1].textContent).toBe('28 Days Later');
});

it('invokes callback when a button is clicked', () => {
  let votedWidth;
  const vote = entry => (votedWidth = entry);

  const component = renderIntoDocument(<Voting
    pair={['Trainspotting', '28 Days Later']}
    vote={vote}
  />);
  const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
  Simulate.click(buttons[0]);

  expect(votedWidth).toBe('Trainspotting');
});

it('disables buttons when user has voted', () => {
  const component = renderIntoDocument(<Voting
    pair={['Trainspotting', '28 Days Later']}
    hasVoted="Trainspotting"
  />);
  const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

  expect(buttons.length).toBe(2);
  expect(buttons[0].hasAttribute('disabled')).toBe(true);
  expect(buttons[1].hasAttribute('disabled')).toBe(true);
});

it('adds label to the voted entry', () => {
  const component = renderIntoDocument(<Voting
    pair={['Trainspotting', '28 Days Later']}
    hasVoted="Trainspotting"
  />);
  const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

  expect(buttons[0].textContent).toContain('Voted');
});

it('renders just the winner when there is one', () => {
  const component = renderIntoDocument(<Voting winner="Trainspotting" />);
  const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
  expect(buttons.length).toEqual(0);

  const winner = ReactDOM.findDOMNode(component.refs.winner);
  expect(winner).toBe.ok;
  expect(winner.textContent).toContain('Trainspotting');
});

it('renders as a pure component', () => {
  const pair = ['Trainspotting', '28 Days Later'];
  const container = document.createElement('div');
  let component = ReactDOM.render(
    <Voting pair={pair} />,
    container,
  );

  let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
  expect(firstButton.textContent).toEqual('Trainspotting');

  pair[0] = 'Sunshine';
  component = ReactDOM.render(
    <Voting pair={pair} />,
    container,
  );
  firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
  expect(firstButton.textContent).toEqual('Trainspotting');
});

it('does update DOM when prop changes', () => {
  const pair = List.of('Trainspotting', '28 Days Later');
  const container = document.createElement('div');
  let component = ReactDOM.render(
    <Voting pair={pair} />,
    container,
  );

  let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
  expect(firstButton.textContent).toEqual('Trainspotting');

  const newPair = pair.set(0, 'Sunshine');
  component = ReactDOM.render(
    <Voting pair={newPair} />,
    container,
  );
  firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
  expect(firstButton.textContent).toEqual('Sunshine');
});
