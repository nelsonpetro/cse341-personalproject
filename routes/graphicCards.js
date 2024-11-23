const express = require('express');
const router = express.Router();
const graphicsController = require('../controllers/graphicCards');
const validation = require('../middleware/validate');

router.get('/', graphicsController.getAll);

router.get('/:id', graphicsController.getSingle);

router.post('/', validation.saveGraphicCard, graphicsController.createCard);

router.put('/:id', validation.saveGraphicCard, graphicsController.updateCard);

router.delete('/:id', graphicsController.deleteCard);

module.exports = router;
