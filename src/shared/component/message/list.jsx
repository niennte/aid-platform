// @flow

import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { MESSAGE_PAGE_ROUTE, MESSAGE_OUTBOX_PAGE_ROUTE } from '../../routes';
import { fetchInboxList } from '../../action/fetch-inbox';
import messageNewIcon from '../common/svg/message-new';
import messageReadIcon from '../common/svg/message-read';
import formatDate from '../common/format-date';
import palette from '../common/palette';
import TextLoader from '../common/loaders/text-loader';

const iconStyle = {
  width: '50px',
  height: '50px',
  padding: '10px',
};

type Props = {
  authorization: string,
  dispatch: Function,
  messages: object,
  loadInProgress: boolean,
  history: any,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  messages: state.messaging.inbox,
  loadInProgress: state.loading === 'inbox',
});

class messageList extends Component<Props> {
  constructor(props) {
    super(props);
    const { dispatch, authorization, loadInProgress } = props;
    dispatch(fetchInboxList(authorization));
    this.state = {
      messages: [],
      loadInProgress,
    };
  }

  componentDidMount() {
    const { dispatch, authorization } = this.props;
    dispatch(fetchInboxList(authorization));
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
    history.push(`${MESSAGE_PAGE_ROUTE}/${messageId}`);
  };

  render() {
    const { messages, loadInProgress } = this.state;
    const ready = !loadInProgress;
    return (
      <main className="messageView">
        { loadInProgress && (
          <TextLoader />
        )}
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between align-items-center mt-4 mb-2">
              <div
                className="item nav-link"
              >
                <h4 className="text-primary">
                Inbox
                </h4>
              </div>
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

            { (messages.length > 0) ? (
              <table className="table table-bordered bg-white table-hover">
                <thead className="bg-info">
                  <tr>
                    <th />
                    <th>From</th>
                    <th>Subject</th>
                    <th>Received</th>
                  </tr>
                </thead>

                <tbody>
                  { messages.map(message => (
                    <tr
                      key={message.id}
                      data-id={message.id}
                      className={message.isRead ? 'isOld' : 'isNew'}
                      onClick={this.navigateToShow}
                    >
                      <td>
                        <span
                          className="messageStatus iconContainer rounded-circle d-inline-block p-0 m-1"
                        >
                          {message.isRead ? (
                            <img
                              className="iconImage"
                              alt="read"
                              title="read"
                              src={messageReadIcon()}
                              style={iconStyle}
                            />
                          ) : (
                            <img
                              className="iconImage"
                              alt="new"
                              title="new"
                              src={messageNewIcon(palette.navBadgeBright)}
                              style={iconStyle}
                            />
                          )}
                        </span>
                      </td>
                      <td>{message.from.userName}</td>
                      <td>
                        {message.subject}
                      </td>
                      <td>
                        <span className="text-70">
                          {formatDate(message.received)}
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
