import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import { List, Map } from 'immutable';
import Results from './Results';

it('renders entries with vote counts or zero', () => {
  const pair = List.of('Trainspotting', '28 Days Later');
  const tally = Map({'Trainspotting': 5});
  const component = renderIntoDocument(
    <Results pair={pair} tally={tally} />
  );
  const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
  const [train, days] = entries.map(e => e.textContent);

  expect(entries.length).toEqual(2);
  expect(train).toContain('Trainspotting');
  expect(train).toContain('5');
  expect(days).toContain('28 Days Later');
  expect(days).toContain('0');
});
