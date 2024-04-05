const express = require('express');
const path = require('path');

const router = express.Router();

// Rota para a página inicial
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'assets', 'html', 'index.html'));
});

module.exports = router;
