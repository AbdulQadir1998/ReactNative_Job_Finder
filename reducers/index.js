import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_Reducer';

export default combineReducers({
  auth, jobs, likedJobs
});
