const request = require('request');
const express = require('express');
const router = express.Router();

router.post('/:task', (req, res, next) => {
  // const url = req.url.replace('/user', '');
  // res.json(req.body);
  request.post({
    'url': `http://localhost:6000/${req.params.task}`,
    'form': req.body
  }, (err, response, body) => {
    if(err) return res.json(err);
    res.send(body);
  })
})


module.exports = router;
