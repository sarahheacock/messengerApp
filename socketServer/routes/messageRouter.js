const request = require('request');
const express = require('express');
const router = express.Router();

router.get('/*', (req, res, next) => {
  const url = req.url.replace('/message', '');

  request(`http://localhost:3000${url}`, (err, response, body) => {
    if(err) return res.json(err);
    res.send(body);
  })
})


router.post('/*', (req, res, next) => {
  const url = req.url.replace('/message', '');

  request(`http://localhost:3000${url}`, (err, response, body) => {
    if(err) return res.json(err);
    res.send(body);
  })
})

module.exports = router;
