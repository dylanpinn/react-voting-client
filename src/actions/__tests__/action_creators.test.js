import * as actions from '../action_creators';

describe('actions', () => {
  it('should create an action to set state', () => {
    const state = {};
    const expectedAction = {
      type: 'SET_STATE',
      state,
    };
    expect(actions.setState(state)).toEqual(expectedAction);
  });

  it('should create an action to vote', () => {
    const entry = {};
    const expectedAction = {
      type: 'VOTE',
      meta: { remote: true },
      entry,
    };
    expect(actions.vote(entry)).toEqual(expectedAction);
  });

  it('should create an action for next', () => {
    const expectedAction = {
      type: 'NEXT',
      meta: { remote: true },
    };
    expect(actions.next()).toEqual(expectedAction);
  });
});
