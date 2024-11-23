const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Graphic Cards']
  try {
    const cards = await mongodb
      .getDb()
      .db()
      .collection('graphics')
      .find()
      .toArray();
    res.setHeader('Content-Type', 'Application/json');
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err.message || err.toString() });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Graphic Cards']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json('Must use a valid graphic card id to find a graphic card.');
  }
  const cardId = ObjectId.createFromHexString(req.params.id);
  try {
    const card = await mongodb
      .getDb()
      .db()
      .collection('graphics')
      .findOne({ _id: cardId });
    if (!card) {
      res.status(404).json({ message: 'Graphic card not found.' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(card);
    }
  } catch (err) {
    res.status(400).json({ message: err.message || err.toString() });
  }
};

const createCard = async (req, res) => {
    //#swagger.tags=['Graphic Cards']
    /*#swagger.parameters['body'] = {
    //in: 'body',
    //description: 'Create a Graphic Card in the Database',
    //schema: { $ref: '#/definitions/graphicCards' }
    }*/
  const card = {
    brand: req.body.brand,
    model: req.body.model,
    memory: req.body.memory,
    memoryType: req.body.memoryType,
    coreClock: req.body.coreClock,
    boostClock: req.body.boostClock,
    powerConsumption: req.body.powerConsumption,
    priceUSD: req.body.priceUSD,
    availability: req.body.availability,
    ports: req.body.ports,
    releaseDate: req.body.releaseDate,
    features: req.body.features
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('graphics')
    .insertOne(card);
  response.acknowledged
    ? res.status(204).send()
    : res
        .status(500)
        .json(response.error || 'An error ocurred while creating the Graphic Card in the database');
};

const updateCard = async (req, res) => {
  //#swagger.tags=['Graphic Cards']
  /*#swagger.parameters['body'] = {
  //in: 'body',
  //description: 'Create a Graphic Card in the Database',
  //schema: { $ref: '#/definitions/graphicCards' }
  }*/
  const cardId = ObjectId.createFromHexString(req.params.id);
  const card = {
    brand: req.body.brand,
    model: req.body.model,
    memory: req.body.memory,
    memoryType: req.body.memoryType,
    coreClock: req.body.coreClock,
    boostClock: req.body.boostClock,
    powerConsumption: req.body.powerConsumption,
    priceUSD: req.body.priceUSD,
    availability: req.body.availability,
    ports: req.body.ports,
    releaseDate: req.body.releaseDate,
    features: req.body.features
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('graphics')
    .replaceOne({ _id: cardId }, card);
  response.modifiedCount > 0
    ? res.status(204).send()
    : res
        .status(500)
        .json(response.error || 'An error ocurred while updating the Graphic Card information');
};

const deleteCard = async (req, res) => {
  //#swagger.tags=['Graphic Cards']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json(
        'Must use a valid graphic card id to find a graphic card to delete.'
      );
  }
  const cardId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('graphics')
    .deleteOne({ _id: cardId }, true);
  response.deletedCount > 0
    ? res.status(204).send()
    : res
        .status(500)
        .json(response.error || 'An error ocurred while deleting the Graphin Card from the database');
};

module.exports = {
  getAll,
  getSingle,
  createCard,
  updateCard,
  deleteCard
};
