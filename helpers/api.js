import links from "./links";
import axios from "axios";
import ObjectHelper from "./ObjectHelper";


const getLocation = (location) => {
  return links + location;
};


async function status(response) {

  if (response.status >= 200 && response.status < 300) {
    // alert('Working fine ')
  }
  if (response.status >= 401 && response.status <= 403) {
   
  }
  if (response.status == 400 || (response.status >= 404 && response.status < 500)) {

  }
  if (response.status >= 500) {
    // alert(`Server error, we are working on it please wait for sometime\nError code : ${response?.status} `)
  }
}

export const doPost = async (thunk , location , query , body, token) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);

  let headers = {
    "Content-Type": "application/json"
  }

  const response = await axios.post(url, body, headers);
  status(response)
  return await response;
};


export const doDel = async (thunk , location , query) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);

  let headers = {
    "Content-Type": "application/json",
  }

  const response = await axios.delete(url, headers);
  status(response)
  return await response;
};

export const doGet = async (thunk , location , query,token ) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
  const response  = await axios.get(url);
  status(response)
  return await response;
};

export const doPut = async (thunk , location , query, body ) => {
  let url = getLocation(location) + ObjectHelper.getQueryString(query);
 
  const response  = await axios.put(url, body);
  status(response)
  
  return await response;
};