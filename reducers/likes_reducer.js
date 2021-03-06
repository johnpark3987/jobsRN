import _ from 'lodash'
import { REHYDRATE } from 'redux-persist/constants';
import {
  LIKE_JOB,
  CLEAR_LIKED_JOB
} from '../actions/types';

export default function(state=[], action) {
  switch (action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || [];
    case LIKE_JOB:
      // AsnycStorage.setItem()
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');

    case CLEAR_LIKED_JOB:
      return [];
    default:
      return state;
  }
}

//
// import { PERSIST_REHYDRATE } from 'redux-persist/lib/constants';
//
// import {
//     MESSAGE_SAVE
// } from '../actions/types';
//
//
// export default (state = [], action) => {
//  switch (action.type) {
//
//     case PERSIST_REHYDRATE:
//
//     return action.payload.messages || [];
//
//     case MESSAGE_SAVE:
//
//         return [
//             action.payload,
//             ...state
//         ];
//
//     default:
//         return state;
//     }
// };
