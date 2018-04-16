const Sequelize = require('sequelize');
const config = require('../configure.json');

const sequelize = new Sequelize(config.db, {});

const Inbox = sequelize.define('inbox', {
  receiver: Sequelize.STRING,
  messageID: Sequelize.INTEGER
});

const Outbox = sequelize.define('outbox', {
  sender: Sequelize.STRING,
  messageID: Sequelize.INTEGER
});

const Message = sequelize.define('message', {
  body: Sequelize.STRING
})

sequelize.sync({
  force: false
})

module.exports = {
  Inbox: Inbox,
  Outbox: Outbox,
  Message: Message
};
