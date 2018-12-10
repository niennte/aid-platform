// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { RESPONSE_PAGE_ROUTE } from '../../routes';
import { fetchResponseList } from '../../action/responses';

import fulfillIconSrc from '../common/svg/done-double-icon-src';
import volunteerIconSrc from '../common/svg/volunteer-icon-src';
import clockIconSrc from '../common/svg/clock-icon-src';
import colorCodeMarkers from '../common/color-code-markers';
import formatDate from '../common/format-date';
import palette from '../common/palette';
import TextLoader from '../common/loaders/text-loader';

type Props = {
  authorization: string,
  dispatch: Function,
  responses: object,
  loadInProgress: boolean,
  history: any,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  responses: state.responsesOwn.list,
  loadInProgress: state.loading === 'responseList',
});


class responseList extends Component<Props> {
  constructor(props) {
    super(props);
    const { dispatch, authorization, loadInProgress } = props;
    dispatch(fetchResponseList(authorization));
    this.state = {
      responses: props.responses,
      loadInProgress,
    };
  }

  componentDidMount() {
    const { dispatch, authorization } = this.props;
    dispatch(fetchResponseList(authorization));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      responses: nextProps.responses,
      loadInProgress: nextProps.loadInProgress,
    });
  }

  navigateToShow = (e) => {
    e.preventDefault();
    const requestId = e.currentTarget.dataset.id;
    const { history } = this.props;
    history.push(`${RESPONSE_PAGE_ROUTE}/${requestId}`);
  };

  render() {
    const { responses, loadInProgress } = this.state;
    const ready = !loadInProgress;

    return (
      <main className="responseView">
        {(loadInProgress) && (
          <TextLoader />
        )
        }
        <section className="pt-5 pb-3 container d-flex justify-content-center">
          <div className="width-two-third">
            <nav className="nav justify-content-between mt-4 mb-2">
              <h4 className="text-primary">Your responses</h4>
            </nav>
            { (responses.length > 0) ? (
              <table className="table table-bordered bg-white table-hover">
                <thead className="bg-info">
                  <tr>
                    <th colSpan="2">Response</th>
                    <th colSpan="2">Request</th>
                  </tr>
                </thead>
                <tbody>
                  { responses.map((response) => {
                    const { request } = response;
                    const isDelivered = response.status === 'delivered';
                    const isPosted = response.status === 'posted';
                    const isFulfilled = response.fulfillment
                      && Object.keys(response.fulfillment).length > 0;
                    const isActive = request.status === 'active' && !isFulfilled;
                    const isPending = request.status === 'pending';
                    return (
                      <tr
                        key={response.id}
                        data-id={response.id}
                        className={request.isFulfilled ? 'fulfilled' : 'unfulfilled'}
                        onClick={this.navigateToShow}
                      >
                        <td className="statusCell">
                          <span
                            className="infographicsContainer"
                          >
                            {isDelivered && (
                            <span
                              className="fulfillment iconContainer rounded-circle d-inline-block p-0 m-1"
                            >
                              <img
                                className="iconImage rounded-circle"
                                alt="fulfillment"
                                title="fulfillment"
                                src={fulfillIconSrc(palette.seaGreen)}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  border: `2px solid ${palette.seaGreen}`,
                                  padding: '10px',
                                }}
                              />
                            </span>
                            )}
                          </span>
                          {isPosted && (
                          <span className="infographicsContainer">
                            <span
                              className="responses iconContainer rounded-circle d-inline-block m-1"
                              style={{
                                border: `2px solid ${palette.softerOrange}`,
                                color: palette.seaGreen,
                                padding: '9px 5px',
                                minWidth: '52px',
                                marginTop: '5px',
                              }}
                            >
                              <img
                                alt="volunteer"
                                title="volunteer"
                                src={volunteerIconSrc(palette.softerOrange)}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  marginLeft: '5px',
                                }}
                              />
                            </span>
                          </span>
                          )}
                        </td>
                        <td className="statusCell">
                          <p className="text-70 b-bottom">
                            {formatDate(response.posted)}
                          </p>
                          <p className="m-0 p-0">
                            {response.message}
                          </p>
                        </td>
                        <td className="statusCell">
                          <span
                            className="infographicsContainer"
                          >
                            {isActive && (
                            <span
                              className="fulfillment iconContainer rounded-circle d-inline-block p-0 m-1"
                            >
                              <img
                                className="iconImage rounded-circle "
                                alt="active"
                                title="active"
                                src={colorCodeMarkers(request.type)}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                }}
                              />
                            </span>
                            )}
                            {isPending && (
                            <span
                              className="fulfillment iconContainer rounded-circle d-inline-block p-0 m-1"
                            >
                              <img
                                className="iconImage rounded-circle "
                                alt="active"
                                title="active"
                                src={clockIconSrc(palette.milderYellow)}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                }}
                              />
                            </span>
                            )}
                            {isFulfilled && (
                            <span
                              className="fulfillment iconContainer rounded-circle d-inline-block p-0 m-1"
                            >
                              <img
                                className="iconImage rounded-circle"
                                alt="fulfillment"
                                title="fulfillment"
                                src={fulfillIconSrc(palette.seaGreen)}
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  border: `2px solid ${palette.seaGreen}`,
                                  padding: '10px',
                                }}
                              />
                            </span>
                            )}
                          </span>
                        </td>
                        <td>
                          <p className="text-70 b-bottom">
                            {formatDate(request.created)}
                          </p>
                          <p className="m-0 p-0">
                            {request.title}
                          </p>
                          <p className="m-0 p-0 text-70">
                            {request.description}
                          </p>
                        </td>
                      </tr>
                    );
                  })
              }
                </tbody>
              </table>
            ) : (ready
              && (
                <p className="lead text-center pt-md-3 pt-lg-5">
                  You posted no responses.
                </p>
              )
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default withRouter(connect(mapStateToProps)(responseList));
