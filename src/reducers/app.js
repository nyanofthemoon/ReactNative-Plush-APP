import {fromJS} from 'immutable';

import * as types from './../constants'

const initialState = fromJS({
  facebookStatus: 'unauthenticated',
  socketStatus  : 'disconnected'
});

export default (state = initialState, action) => {
  let nextState;
  switch (action.type) {
    case types.FACEBOOK_LOGIN_REQUESTED:
      nextState = fromJS(state).set('facebookStatus', 'authenticating');
      break;
    case types.FACEBOOK_LOGIN_SUCCEEDED:
      nextState = fromJS(state).set('facebookStatus', 'authenticated');
      break;
    case types.FACEBOOK_LOGIN_FAILED:
      nextState = fromJS(state).set('facebookStatus', 'unauthenticated');
      break;
    case types.SOCKET_CONNECTION_REQUESTED:
      nextState = fromJS(state).set('socketStatus', 'connecting');
      break;
    case types.SOCKET_CONNECTION_SUCCEEDED:
      nextState = fromJS(state).set('socketStatus', 'connected');
      break;
    case types.SOCKET_CONNECTION_FAILED:
      nextState = fromJS(state).set('socketStatus', 'disconnected');
      break;
    default:
      break;
  }
  return nextState || state;
}