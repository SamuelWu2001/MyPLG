// config.js
const ENV = {
    development: {
      API_URL: 'https://de83-223-139-21-65.ngrok-free.app',
    }
};
  
const getEnvVars = (env = 'development') => {
  return ENV[env];
};

export default getEnvVars;
  