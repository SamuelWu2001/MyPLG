// config.js
const ENV = {
    development: {
      API_URL: 'https://b874-223-139-28-87.ngrok-free.app/',
    }
};
  
const getEnvVars = (env = 'development') => {
  return ENV[env];
};

export default getEnvVars;
  