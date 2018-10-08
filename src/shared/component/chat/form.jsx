// @flow

import React from 'react';
import { connect } from 'react-redux';

import { emitMessage, emitIsTyping } from '../../action/index';

type Props = {
  dispatch: Function,
  userName: ?string,
};

const mapStateToProps = state => ({
  userName: state.user.userName,
});

class ChatForm extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.userName || '',
      userIsTyping: false,
      timeout: null,
    };
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.emitCancelUserIsTyping = this.emitCancelUserIsTyping.bind(this);
  }

  emitCancelUserIsTyping() {
    const { userName, userIsTyping } = this.state;
    const { dispatch } = this.props;
    if (!userIsTyping) {
      dispatch(emitIsTyping({
        status: false,
        userName,
      }));
    }
  }

  handleKeyUp() {
    const { timeout } = this.state;
    window.clearTimeout(timeout);
    this.setState({
      userIsTyping: false,
      timeout: window.setTimeout(this.emitCancelUserIsTyping, 1000),
    });
  }

  handleKeyDown() {
    const { userName, timeout } = this.state;
    const { dispatch } = this.props;
    window.clearTimeout(timeout);
    this.setState({
      userIsTyping: true,
      timeout: null,
    });
    dispatch(emitIsTyping({
      status: true,
      userName,
    }));
  }

  handleSubmit() {
    const { timeout } = this.state;
    window.clearTimeout(timeout);
    this.setState({
      userIsTyping: false,
    });
  }

  render() {
    const { dispatch } = this.props;
    const { userName } = this.state;
    let input;
    return (
      <div className="chatFormContainer">
        <form
          action=""
          className="chatForm bg-light p-1"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(emitMessage({
              userName,
              message: input.value,
            }));
            input.value = '';
          }}
        >
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Message"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              id="m"
              autoComplete="off"
              ref={(node) => {
                input = node;
              }}
              onKeyDown={this.handleKeyDown}
              onKeyUp={this.handleKeyUp}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="submit"
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ChatForm);
