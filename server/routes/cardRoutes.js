const express = require('express');
const router = express.Router();
const { generateCard, shareCard } = require('../controllers/cardController');

router.post('/generate-card', generateCard);
router.post('/share-card', shareCard);

module.exports = router;
