import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_reducer';

export default combineReducers({
  auth, jobs, likedJobs
});


//
//
// //import { combineReducers } from 'redux';
//
// import messagesForm from './message_form_reducer';
// import messages from './message_reducer';
//
// export default ({
//  messagesForm, messages
// });
