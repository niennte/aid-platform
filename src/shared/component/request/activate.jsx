// @flow

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { activateRequest } from '../../action/requests';
import wavingFlagIcon from '../common/svg/waving-flag-icon-src';
import palette from '../common/palette';

type Props = {
  authorization: string,
  request: object,
  hasErrors: boolean,
  errorMessage: string,
  errors: Object,
  dispatch: Function,
  loadInProgress: boolean,
};

const mapStateToProps = state => ({
  authorization: state.user.authorization,
  hasErrors: state.errors.request.hasErrors,
  errorMessage: state.errors.request.errorMessage,
  errors: state.errors.request.errors,
  loadInProgress: state.loading === 'markDoneRequest',
});

class RequestActivateForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      request: Object.assign(props.request, { status: 'active' }),
      authorization: props.authorization,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const { fulfillment } = prevState;
      fulfillment[name] = value;
      return { fulfillment };
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { request, authorization } = this.state;
    const { dispatch } = this.props;
    dispatch(activateRequest(request, authorization));
  };

  infoDetail = () => (
    <p className="mb-0">
      Your request has been activated!
    </p>
  );

  cssInvalid = (field, errors) => (errors[field] ? 'is-invalid' : '');

  render() {
    const {
      hasErrors, errorMessage, errors, loadInProgress,
    } = this.props;
    const showForm = true;
    return (
      <div className="container-fluid">
        <hr />
        {
          hasErrors
          && (
            <div
              id="error_explanation"
              className="alert alert-warning text-center"
              role="alert"
            >
              <p className="mb-0">{errorMessage}</p>
              {
                Object.entries(errors).length
                  ? (
                    <ul className="list-unstyled" style={{ fontSize: '65%' }}>
                      {Object.entries(errors).map(([name, error]) => (
                        <li key={name}>
                          {`${error}`}
                        </li>
                      ))}
                    </ul>
                  ) : ''
              }
            </div>
          )
        }
        { showForm && (
          <form onSubmit={this.handleSubmit}>
            <div className="field form-group">
              <button
                className="btn btn-secondary p-2 text-white mt-2"
                type="submit"
              >
                {loadInProgress ? 'Activating...' : 'Activate'}
                <img
                  className="iconImage"
                  alt="volunteer"
                  title="volunteer"
                  src={wavingFlagIcon(palette.milderYellow)}
                  style={{
                    width: '45px',
                    height: '45px',
                  }}
                />
              </button>
            </div>
          </form>
        )
        }

      </div>
    );
  }
}

export default connect(mapStateToProps)(RequestActivateForm);
