import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  USER_HAS_TOKEN,
  USER_HAS_NO_TOKEN
 } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    case USER_HAS_TOKEN:
      return { hasToken: true };
    case USER_HAS_NO_TOKEN:
      return { hasToken: false };
    default:
      return state;
  }
}
