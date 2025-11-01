// src/routes/cartDetailRoutes.js
const express = require('express');
const router = express.Router();
const cartDetailController = require('../controllers/cartDetailController');

router.get('/', cartDetailController.getAll);
router.get('/:id', cartDetailController.getById);
router.post('/', cartDetailController.create);
router.put('/:id', cartDetailController.update);
router.delete('/:id', cartDetailController.delete);

module.exports = router;
s