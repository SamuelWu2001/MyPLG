// config.js
const ENV = {
    development: {
      API_URL: 'https://a769-118-171-87-156.ngrok-free.app',
    }
};
  
const getEnvVars = (env = 'development') => {
  return ENV[env];
};

export default getEnvVars;
  