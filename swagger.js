const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Graphic Cards API - CSE341',
    description: 'Graphic Cards API - Week 3/4 Personal Activity'
  },
  host: 'cse341-personalproject-kan5.onrender.com',
  schemes: ['https','http'],
  definitions: {
    graphicCards: {
      brand: "NVIDIA",
      model: "RTX 3080",
      memory: "10 GB",
      memoryType: "GDDR6X",
      coreClock: "1.44 GHz",
      boostClock: "1.71 GHz",
      powerConsumption: 320,
      priceUSD: 699.99,
      availability: true,
      ports: ["HDMI", "DisplayPort"],
      releaseDate: "2021-01-01",
      features: ["Ray Tracing", "DLSS"]
    }
  }
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
