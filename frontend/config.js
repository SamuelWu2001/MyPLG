// config.js
const ENV = {
    development: {
      API_URL: 'https://ed28-118-171-84-28.ngrok-free.app',
    }
};
  
const getEnvVars = (env = 'development') => {
  return ENV[env];
};

export default getEnvVars;
  