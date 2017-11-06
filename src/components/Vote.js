// @flow
import React from 'react';
import classNames from 'classnames';

export default class extends React.PureComponent<*> {
  getPair = () => this.props.pair || [];

  isDisabled = () => !!this.props.hasVoted;

  hasVotedFor = (entry: any) => this.props.hasVoted === entry;

  render() {
    return (
      <div className="voting">
        {this.getPair().map(entry =>
        (
          <button
            key={entry}
            className={classNames({ voted: this.hasVotedFor(entry) })}
            disabled={this.isDisabled()}
            onClick={() => this.props.vote(entry)}
          >
            <h1>{entry}</h1>
            {this.hasVotedFor(entry) ?
              <div className="label">Voted</div> :
            null}
          </button>))}
      </div>);
  }
}
