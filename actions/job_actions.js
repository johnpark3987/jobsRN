import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
  FETCH_JOBS,
  FETCH_JOBS_ERROR,
  LIKE_JOB,
  CLEAR_LIKED_JOB
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
}

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    let zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    let { data } = await axios.get(url);
    console.log(data);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch (e) {
    dispatch({ type: FETCH_JOBS_ERROR, payload: e });
    console.error(e);
  }
};

export const likeJob = (job) => {
  return {
    type: LIKE_JOB,
    payload: job
  };
};

export const clearLikedJobs = () => {
  return {
    type: CLEAR_LIKED_JOB
  };
};
