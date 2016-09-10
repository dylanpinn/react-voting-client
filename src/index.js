/** @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';
import './index.css';

const pair = ['Trainspotting', '28 Days Later'];

ReactDOM.render(
  <Voting pair={pair} winner="Trainspotting" />,
  document.getElementById('root')
);
