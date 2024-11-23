const validatorjs = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
  const validation = new validatorjs(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;
