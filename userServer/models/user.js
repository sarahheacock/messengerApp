const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const config = require('../configure.json');
const jwt = require('jsonwebtoken');

const sequelize = new Sequelize(config.db, {});

const User = sequelize.define('user', {
  username: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING
}, {
  hooks: {
    beforeCreate: (user, options) => {
      return bcrypt.hash(user.password, config.saltRounds).then((hash) => {
        user.password = hash;
      })
    }
  }
});

User.prototype.checkPassword = function(username, password){
  const check = new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function(err, res){
      if(!res || err){
        reject({message: "Incorrect password."})
      }
      // ADD JSON WEB TOKEN HERE
      resolve(this);
    })
  });

  return check.then(user => {
    return this.createJWT();
  })
}

User.prototype.createJWT = function(){
  return new Promise((resolve, reject) => {
    const username = this.username;
    const token = jwt.sign({username: username}, config.secret);
    resolve({
      username: username,
      token: token
    })
  })
}

// CREATE TABLE IF DOES NOT EXIST
sequelize.sync({
  force: false
})

module.exports = User;
