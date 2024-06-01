// config.js
const ENV = {
    development: {
      API_URL: 'https://9500-223-139-28-87.ngrok-free.app',
    }
};
  
const getEnvVars = (env = 'development') => {
  return ENV[env];
};

export default getEnvVars;
  