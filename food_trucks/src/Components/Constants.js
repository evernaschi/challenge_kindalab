// Constants.js
const production = {
    url: 'https://kindalabe.fly.dev/foodtrucks?'
  };
  const development = {
    url: 'http://localhost:8000/foodtrucks?'
  };
  export const config = process.env.NODE_ENV === 'development' ? development : production;
  