// @flow

import wavingFlagIconSrc from './svg/waving-flag-icon-src';
import markerIconSrc from './svg/marker-icon-src';

export default (requestType) => {
  const oneTimeTaskIcon = wavingFlagIconSrc('#17a2b8');
  const materialNeedIcon = wavingFlagIconSrc('#f98237');
  const catchAllIcon = markerIconSrc('orange');
  switch (requestType) {
    case 'material-need':
    case 'material_need':
      return materialNeedIcon;
    case 'one-time-task':
    case 'one_time_task':
      return oneTimeTaskIcon;
    default:
      return catchAllIcon;
  }
};
