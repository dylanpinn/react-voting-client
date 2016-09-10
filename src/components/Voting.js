import React, { PropTypes } from 'react';
import Winner from './Winner';
import Vote from './Vote';

const propTypes = {
  winner: PropTypes.any,
};

const Voting = (props) => (
  <div>
    {props.winner ?
      <Winner
        winner={props.winner}
      /> :
      <Vote {...props} />}
  </div>
);

Voting.propTypes = propTypes;

export default Voting;
