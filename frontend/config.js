// config.js
const ENV = {
    development: {
      API_URL: 'https://4029-118-171-89-149.ngrok-free.app',
    }
};
  
const getEnvVars = (env = 'development') => {
  return ENV[env];
};

export default getEnvVars;
  