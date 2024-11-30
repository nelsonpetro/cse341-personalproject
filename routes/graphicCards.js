const express = require('express');
const router = express.Router();
const graphicsController = require('../controllers/graphicCards');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', graphicsController.getAll);

router.get('/:id', graphicsController.getSingle);

router.post('/', isAuthenticated, validation.saveGraphicCard, graphicsController.createCard);

router.put('/:id', isAuthenticated, validation.saveGraphicCard, graphicsController.updateCard);

router.delete('/:id', isAuthenticated, graphicsController.deleteCard);

module.exports = router;
