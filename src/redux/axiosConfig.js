import axios from 'axios';

// Set the base URL for axios from environment variables or fallback
const setAxiosBaseURL = () => {
  axios.defaults.baseURL =
    process.env.REACT_APP_API_BASE_URL || 'https://wallet.b.goit.study';
};

// Set the Authorization header for axios
const setAxiosHeader = (tokenReceived) => {
  let token = tokenReceived;

  if (!token) {
    try {
      const savedDataLocal = JSON.parse(localStorage.getItem('persist:auth'));
      const savedToken = savedDataLocal?.token;
      if (savedToken && savedToken !== 'null') {
        // Remove quotes added by redux-persist stringification
        token = savedToken.slice(1, -1);
      }
    } catch (error) {
      console.error('Error parsing token from localStorage:', error);
    }
  }

  axios.defaults.headers.common.Authorization = token || '';
};

// Clear the Authorization header
const clearAxiosHeader = () => {
  delete axios.defaults.headers.common.Authorization;
};

const axiosConfig = {
  setAxiosBaseURL,
  setAxiosHeader,
  clearAxiosHeader,
};

export default axiosConfig;
