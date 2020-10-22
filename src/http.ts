import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_ROUTE
    : `${process.env.REACT_APP_PROXY}${process.env.REACT_APP_ROUTE}`,
});

export default http;
