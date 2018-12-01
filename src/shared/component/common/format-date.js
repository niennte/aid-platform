// @flow

export default (date) => {
  const options = {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const dateTimestamp = Date.parse(date);
  const dateObject = new Date(dateTimestamp);
  return dateObject.toLocaleDateString('en-US', options);
};
