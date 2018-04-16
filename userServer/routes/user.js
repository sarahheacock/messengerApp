const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.post('/login', (req, res, next) => {
  User.findOne({ where: { username: req.body.username } }).then(user => {
    if(!user){
      return res.json({"message": "Username not found."})
    }
    return user.checkPassword(req.body.username, req.body.password);
  }).then(userOutput => {
    return res.json(userOutput);
  }).catch(err => {
    return res.json(err);
  })
})

router.post('/signup', (req, res, next) => {
  // res.json({message: req.body})
  if(req.body.password !== req.body.verifyPassword){
    return res.json({ message: "Passwords do not match." });
  }

  // build and save instance
  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(user => {
    return user.createJWT();
  }).then(userOutput => {
    res.json(userOutput);
  }).catch(err => {
    res.json({message: "There is already an account associated with this username."})
  });
})

module.exports = router;
