// @flow

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { MESSAGE_PAGE_ROUTE, MESSAGE_OUTBOX_PAGE_ROUTE } from '../../routes';
import { fetchOutboxList } from '../../action/fetch-inbox';
import formatDate from '../common/format-date';

type Props = {
  authorization: string,
  dispatch: Function,
  messages: object,
  loadInProgress: boolean,
  history: any,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  messages: state.messaging.outbox,
  loadInProgress: state.loading === 'outbox',
});

class messageList extends Component<Props> {
  constructor(props) {
    super(props);
    const { dispatch, authorization, loadInProgress } = props;
    dispatch(fetchOutboxList(authorization));
    this.state = {
      messages: [],
      loadInProgress,
    };
  }

  componentDidMount() {
    const { dispatch, authorization } = this.props;
    dispatch(fetchOutboxList(authorization));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      messages: nextProps.messages,
      loadInProgress: nextProps.loadInProgress,
    });
  }

  navigateToShow = (e) => {
    e.preventDefault();
    const messageId = e.currentTarget.dataset.id;
    const { history } = this.props;
    history.push(`${MESSAGE_OUTBOX_PAGE_ROUTE}/${messageId}`);
  };

  render() {
    const { messages, loadInProgress } = this.state;
    const ready = !loadInProgress;
    return (
      <main className="messageView outbox">
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between align-items-center mt-4 mb-2">
              <h4 className="text-primary">
              Outbox
              </h4>
              <NavLink
                className="item nav-link border-right ml-auto text-info"
                to={MESSAGE_PAGE_ROUTE}
                activeClassName="active disabled"
                activeStyle={{ color: 'limegreen' }}
                exact
              >
                Inbox
              </NavLink>
              <NavLink
                className="item nav-link text-info"
                to={MESSAGE_OUTBOX_PAGE_ROUTE}
                activeClassName="active disabled"
                activeStyle={{ color: 'limegreen' }}
                exact
              >
                Outbox
              </NavLink>
            </nav>

            { loadInProgress && (
              <p className="lead text-center pt-md-3 pt-lg-5">
                Loading...
              </p>
            )}

            { (messages.length > 0) ? (
              <table className="table table-bordered bg-white table-hover">
                <thead className="bg-info">
                  <tr>
                    <th>To</th>
                    <th>Subject</th>
                    <th>Sent</th>
                  </tr>
                </thead>
                <tbody>
                  { messages.map(message => (
                    <tr
                      key={message.id}
                      data-id={message.id}
                      onClick={this.navigateToShow}
                    >
                      <td>{message.to.userName}</td>
                      <td>
                        {message.subject}
                      </td>
                      <td>
                        <span className="text-70">
                          {formatDate(message.sent)}
                        </span>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            ) : (ready
              && (
                <p className="lead text-center pt-md-3 pt-lg-5">
                  You have no messages.
                </p>
              )
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(messageList));
