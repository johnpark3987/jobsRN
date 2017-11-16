import { AsyncStorage } from 'react-native';
import { FACEBOOK_LOGIN_SUCCESS } from './types';
import { Facebook } from 'expo';

// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {

  let token = await AsyncStorage.getItem('fb_token', token);

  if (token) {
    dispatch({ type: 'FACEBOOK_LOGIN_SUCCESS', payload: token });
    // LoginGood
  } else {
    // Start FB Login Process

  }

}
