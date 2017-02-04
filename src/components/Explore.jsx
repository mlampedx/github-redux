import React, { PureComponent, PropTypes } from 'react';

const GITHUB_REPO = 'https://github.com/reactjs/redux';

export default class Explore extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value);
    }
  }

  getInputValue = () => {
    return this.refs.input.value;
  }

  setInputValue = (val) => {
    this.refs.input.value = val;
  }

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.handleGoClick();
    }
  }

  handleGoClick = () => {
    this.props.onChange(this.getInputValue());
  }
  
  render() {
    return (
      <div>
        <p>Type a username or repo name and press 'Go':</p>
        <input
          size="45"
          ref="input"
          defaultValue={this.props.value}
          onKeyUp={this.handleKeyUp}
        />
        <button onClick={this.handleGoClick}>
          Go!
        </button>
        <p>
          Code on <a href={GITHUB_REPO} target="_blank">GitHub</a>
        </p>
      </div>
    );
  }
}
