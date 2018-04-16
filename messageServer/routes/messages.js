const express = require('express');
const router = express.Router();
const mid = require('./middleware.js');

// for authentication
router.use((req, res, next) => {
  next();
});

router.post('/outbox/:user', mid.createMessage, mid.createInboxes, mid.createOutbox);
router.get('/outbox/:user', mid.getOutbox, mid.getMessages);
router.get('/inbox/:user', mid.getInbox, mid.getMessages);

module.exports = router;
