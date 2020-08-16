import axios from 'axios';
import qs from 'qs';
import Geocoder from 'react-native-geocoding';


import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const key = 'Your GoogleApi-key';


const JOB_QUERY_PARAMS = {
    publisher: 'Your Indeed-Publisher-Id',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10
};

const buildJobsUrl = (zip, phone, countryCode) => {
    const query = qs.stringify({...JOB_QUERY_PARAMS, q: phone, co: countryCode, l: zip });
    return `${JOB_ROOT_URL}${query}`;
};

function getCountry(addrComponents) {
    for (var i = 0; i < addrComponents.length; i++) {
        if (addrComponents[i].types[0] == "country") {
            return addrComponents[i].short_name;
        }
        if (addrComponents[i].types.length == 2) {
            if (addrComponents[i].types[0] == "political") {
                return addrComponents[i].short_name;
            }
        }
    }
    return false;
};

function getPostalCode(addrComponents) {
  for (var i = 0; i < addrComponents.length; i++) {
      if (addrComponents[i].types[0] == "postal_code") {
          return addrComponents[i].short_name;
      }
    }
};

function getCity(addrComponents) {
    for (var i = 0; i < addrComponents.length; i++) {
        if (addrComponents[i].types[0] == "administrative_area_level_2") {
            return addrComponents[i].short_name;
        }
        if (addrComponents[i].types.length == 2) {
            if (addrComponents[i].types[0] == "political") {
                return addrComponents[i].short_name;
            }
        }
    }
    return false;
};

function getLocality(addrComponents) {
    for (var i = 0; i < addrComponents.length; i++) {
        if (addrComponents[i].types[0] == "locality") {
            return addrComponents[i].short_name;
        }
        if (addrComponents[i].types.length == 2) {
            if (addrComponents[i].types[0] == "political") {
                return addrComponents[i].short_name;
            }
        }
    }
    return false;
};

export const fetchJobs = (region, phone , callback) => async (dispacth) => {
  try {
    Geocoder.init(key);
    let datas  = await Geocoder.from(region.latitude, region.longitude);
    console.log(datas);
    let countryCode = getCountry(datas.results[0].address_components);
    let countryCode1 = countryCode.toLowerCase().toString();
    let zip = getLocality(datas.results[0].address_components);
    if(zip)
    {
      const url = buildJobsUrl(zip, phone, countryCode);
      let { data } = await axios.get(url);
      dispacth({ type: FETCH_JOBS, payload: data });
      //console.log(data);
      callback;
    }
    else {
      let zip = getCity(datas.results[0].address_components);
      const url = buildJobsUrl(zip, phone, countryCode);
      let { data } = await axios.get(url);
      dispacth({ type: FETCH_JOBS, payload: data });
      //console.log(data);
      callback;
    }
    console.log(countryCode1);
    console.log(zip);
    
  }
  catch(e)
    {
      console.log(e);
    }
};

export const likeJob = (job) => {
  return {
      type: LIKE_JOB,
      payload: job
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
