// config.js
const ENV = {
    development: {
      API_URL: 'https://b55d-223-139-28-87.ngrok-free.app',
    }
};
  
const getEnvVars = (env = 'development') => {
  return ENV[env];
};

export default getEnvVars;
  