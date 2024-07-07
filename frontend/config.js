// config.js
const ENV = {
    development: {
      API_URL: 'https://e5d8-114-39-50-133.ngrok-free.app',
    }
};
  
const getEnvVars = (env = 'development') => {
  return ENV[env];
};

export default getEnvVars;
  