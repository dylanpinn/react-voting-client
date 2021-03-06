import { List, Map, fromJS } from 'immutable';
import reducer from '../reducer';

describe('reducer', () => {
  const moviePair = ['Trainspotting', '28 Days Later'];
  const defaultAction = {
    type: 'SET_STATE',
    state: {
      vote: {
        pair: moviePair,
        tally: { Trainspotting: 1 },
      },
    },
  };
  const defaultExpect = (nextState) => {
    expect(nextState).toEqual(fromJS({
      vote: {
        pair: moviePair,
        tally: { Trainspotting: 1 },
      },
    }));
  };

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({ Trainspotting: 1 }),
        }),
      }),
    };
    const nextState = reducer(initialState, action);
    defaultExpect(nextState);
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = defaultAction;
    const nextState = reducer(initialState, action);
    defaultExpect(nextState);
  });

  it('handles SET_STATE without initial state', () => {
    const action = defaultAction;
    const nextState = reducer(undefined, action);
    defaultExpect(nextState);
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: moviePair,
        tally: { Trainspotting: 1 },
      },
    });
    const action = { type: 'VOTE', entry: 'Trainspotting' };
    const nextState = reducer(state, action);

    expect(nextState).toEqual(fromJS({
      vote: {
        pair: moviePair,
        tally: { Trainspotting: 1 },
      },
      hasVoted: 'Trainspotting',
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: moviePair,
        tally: { Trainspotting: 1 },
      },
    });
    const action = { type: 'VOTE', entry: 'Sunshine' };
    const nextState = reducer(state, action);
    defaultExpect(nextState);
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: moviePair,
        tally: { Trainspotting: 1 },
      },
      hasVoted: 'Trainspotting',
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Sunshine', 'Slumdog Millionaire'],
        },
      },
    };
    const nextState = reducer(initialState, action);

    expect(nextState).toEqual(fromJS({
      vote: {
        pair: ['Sunshine', 'Slumdog Millionaire'],
      },
    }));
  });
});
