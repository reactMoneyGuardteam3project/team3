import axios from 'axios';

// Ensure baseURL is taken from CRA env var REACT_APP_API_BASE_URL
const setAxiosBaseURL = () => {
  axios.defaults.baseURL =
    process.env.REACT_APP_API_BASE_URL || 'https://wallet.b.goit.study';
};

const setAxiosHeader = (tokenReceived) => {
  try {
    const savedDataLocal = JSON.parse(localStorage.getItem('persist:auth'));
    const savedToken =
      savedDataLocal?.token === 'null' ? null : savedDataLocal?.token?.slice(1, -1);

    axios.defaults.headers.common.Authorization = tokenReceived || savedToken || '';
  } catch (error) {
    // fallback if localStorage parsing fails
    axios.defaults.headers.common.Authorization = tokenReceived || '';
  }
};

const clearAxiosHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

const axiosConfig = {
  setAxiosBaseURL,
  setAxiosHeader,
  clearAxiosHeader,
};

export default axiosConfig;
