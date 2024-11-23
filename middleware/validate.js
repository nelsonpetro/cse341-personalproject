const validator = require('../helpers/validate');

const saveGraphicCard = (req, res, next) => {
  const validationRule = {
    brand: 'required|string|in:NVIDIA,AMD,Intel', // Ensures it is one of the three brands
    model: 'required|string', // Model must be a string and is required
    memory: ['required', 'regex:/^\\d+\\sGB$/'], // Matches format like '8 GB'
    memoryType: 'required|string|in:GDDR6,GDDR6X', // Ensures it is one of GDDR6 or GDDR6X
    coreClock: ['required', 'regex:/^\\d+(\\.\\d+)?\\sGHz$/'], // Matches format like '2.05 GHz'
    boostClock: ['required', 'regex:/^\\d+(\\.\\d+)?\\sGHz$/'], // Matches format like '2.05 GHz'
    powerConsumption: 'required|integer|min:1|max:1000', // Ensures it's an integer within the range of 1 to 1000
    priceUSD: 'required|numeric|min:0', // Ensures a non-negative numeric value for price
    availability: 'required|boolean', // Ensures it's a boolean value
    ports: 'required|array|min:1', // Ensures there is at least one port
    'ports.*': 'string', //Ensures each port is a string
    releaseDate: 'required|date', // Ensures the release date is a valid date
    features: 'array|min:1', // Ensures there is at least one feature
    'features.*': 'string' // Ensures each feature is a string
  };
  validator(req.body, validationRule, {}, (err, status) => {
    !status
      ? res.status(412).send({
          sucess: false,
          message: 'Validation failed',
          data: err
        })
      : next();
  });
};

module.exports = {
  saveGraphicCard,
};
