const helpers = {
  cssActive(applies) {
    return applies ? 'active' : '';
  },
  cssDisabled(applies) {
    return applies ? 'disabled' : '';
  },
  cssInvalid(applies) {
    return applies ? 'alert alert-warning' : '';
  },
  cssValidation(applies) {
    return applies ? 'is-invalid' : 'is-valid';
  },
  cssShowLoader(applies) {
    return applies ? 'show-loader' : '';
  },
  handlePlural(value) {
    return value === 1 ? '' : 's';
  },
};

export default helpers;
