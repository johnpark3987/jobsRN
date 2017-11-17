import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  USER_HAS_TOKEN,
  USER_HAS_NO_TOKEN
} from './types';

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  console.log(token);
  if (token) {
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('1692654517422835', {
    permissions: ['public_profile']
  });
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL })
  }
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};

export const checkForToken = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    dispatch({ type: USER_HAS_TOKEN });
  } else {
    dispatch({ type: USER_HAS_NO_TOKEN });
  }
};
