// @flow

import React, { Component } from 'react';
import { NavLink, withRouter, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { MESSAGE_OUTBOX_PAGE_ROUTE, MESSAGE_PAGE_ROUTE } from '../../routes';
import formatDate from '../common/format-date';
import TextLoader from '../common/loaders/text-loader';

type Props = {
  match: any,
  messages: object,
  loadInProgress: boolean,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  messages: state.messaging.outbox,
  loadInProgress: state.loading === 'outboxMessage',
});

class messageShow extends Component<Props> {
  constructor(props) {
    super(props);
    const { messages, loadInProgress } = props;
    const { id: messageId } = props.match.params;
    this.state = {
      message: this.loadMessage(messageId, messages),
      loadInProgress,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { messages, loadInProgress } = nextProps;
    const { id: messageId } = nextProps.match.params;
    this.setState({
      message: this.loadMessage(messageId, messages),
      loadInProgress,
    });
  }

  loadMessage = (messageId, messages) => {
    const message = messages.find(msg => (parseInt(msg.id, 10) === parseInt(messageId, 10)));
    return message && this.addPrevAndNext(messages, message);
  };

  addPrevAndNext = (messages, message) => {
    const activeIndex = messages.indexOf(message);
    const prevAndNext = {
      prevId: messages[(activeIndex - 1)] ? messages[(activeIndex - 1)].id : null,
      nextId: messages[(activeIndex + 1)] ? messages[(activeIndex + 1)].id : null,
    };
    return Object.assign(message, prevAndNext);
  };

  loadPrev = () => {
    const { messages, loadInProgress } = this.props;
    this.setState(prevState => ({
      messageId: prevState.message.prevId,
      message: this.loadMessage(prevState.message.prevId, messages),
      loadInProgress,
    }));
  };

  loadNext = () => {
    const { messages, loadInProgress } = this.props;
    this.setState(prevState => ({
      messageId: prevState.message.nextId,
      message: this.loadMessage(prevState.message.nextId, messages),
      loadInProgress,
    }));
  };

  render() {
    const {
      message, loadInProgress,
    } = this.state;
    const hasData = message && Object.keys(message).length > 0;

    if (!hasData) {
      return (
        <Redirect to={MESSAGE_OUTBOX_PAGE_ROUTE} />
      );
    }

    const MessageNav = () => (
      <nav className="nav justify-content-between mt-4 mb-2">
        <NavLink
          className="item nav-link text-info"
          to={MESSAGE_OUTBOX_PAGE_ROUTE}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          Back
        </NavLink>
        <NavLink
          className={`item nav-link text-info ml-auto border-left border-right ${message.prevId ? '' : 'disabled'}`}
          to={`${MESSAGE_OUTBOX_PAGE_ROUTE}/${message.prevId ? message.prevId : message.id}`}
          data-disabled={!message.prevId}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
          onClick={this.loadPrev}
        >
          &laquo;
        </NavLink>
        <NavLink
          className={`item nav-link text-info mr-auto border-right ${message.nextId ? '' : 'disabled'}`}
          to={`${MESSAGE_OUTBOX_PAGE_ROUTE}/${message.nextId ? message.nextId : message.id}`}
          data-disabled={!message.nextId}
          activeClassName="active"
          activeStyle={{ color: 'limegreen' }}
          exact
          onClick={this.loadNext}
        >
          &raquo;
        </NavLink>
        <NavLink
          className="item nav-link ml-auto text-info"
          to={MESSAGE_PAGE_ROUTE}
          activeClassName="active disabled"
          activeStyle={{ color: 'limegreen' }}
          exact
        >
          Inbox
        </NavLink>
      </nav>
    );

    return (
      <main className="messageView h-100">
        { !hasData && !loadInProgress && (
          <Redirect to={MESSAGE_PAGE_ROUTE} />
        )}
        <section className="h-100 pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <MessageNav />
            <div className="card position-relative">
              {(loadInProgress) && (
                <TextLoader />
              )
              }
              { hasData && (
              <div className="card-body">
                <p className="primaryType text-right m-0 p-0">
                  {`To: ${message.to.userName}`}
                </p>
                <p className="ternaryType text-right m-0 p-0">
                  {formatDate(message.sent)}
                </p>
                <h4 className="card-title text-primary">
                  {message.subject}
                </h4>
                <hr />
                <blockquote className="lead">
                  {message.body}
                </blockquote>

              </div>
              )}
            </div>
            <MessageNav />
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(messageShow));
