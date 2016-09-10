import React, { PropTypes } from 'react';

const propTypes = {
  winner: PropTypes.any,
};

const Winner = (props) => (
  <div className="winner">
    Winner is {props.winner}!
  </div>
);

Winner.propTypes = propTypes;

export default Winner;
