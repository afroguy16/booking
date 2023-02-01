import axios from 'axios'

export default axios.create({
  baseURL: 'https://private-37dacc-cfcalendar.apiary-mock.com/',
  timeout: 1000
});
