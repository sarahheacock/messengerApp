const message = require('../models/messages.js');
const Inbox = message.Inbox;
const Outbox = message.Outbox;
const Message = message.Message;

module.exports = {
  getInbox: (req, res, next) => {
    Inbox.findAll({ where: { receiver: req.params.user } }).then((messages) => {
      res.locals.messages = messages;
      next();
    })
  },

  getOutbox: (req, res, next) => {
    Outbox.findAll({ where: { sender: req.params.user } }).then((messages) => {
      res.locals.messages = messages;
      next();
    })
  },

  getMessages: (req, res, next) => {
    const findMessages = res.locals.messages.map(m => {
      return Message.findOne({ where: { id: m.messageID } })
    });

    Promise.all(findMessages).then(foundMessages => {
      const findSender = foundMessages.map(m => {
        return new Promise((resolve, reject) => {
          Outbox.findOne({
            attributes: ['sender'],
            where: { messageID: m.id }
          }).then(outboxMessage => {
            const newMessage = m.toJSON();
            newMessage.sender = outboxMessage.sender;
            resolve(newMessage)
          })
        })
      })
      return Promise.all(findSender);
    }).then(senders => {
      const findReceivers = senders.map(sender => {
        return new Promise((resolve, reject) => {
          Inbox.findAll({ where: { messageID: sender.id } }).then(inboxMessages => {
            sender.recipients = inboxMessages.map(m => m.receiver);
            resolve(sender);
          })
        })
      })
      return Promise.all(findReceivers);
    }).then(finalMessages => {
      res.json(finalMessages);
    })
  },

  createMessage: (req, res, next) => {
    Message.create({
      body: req.body.body
    }).then(message => {
      res.locals.messageID = message.id;
      next();
    })
  },

  createInboxes: (req, res, next) => {
    const createInboxPromises = req.body.recipients.map((user) => {
      const send = Inbox.create({
        receiver: user,
        messageID: res.locals.messageID
      });
      return send;
    })

    // improve this is so it sends off only recipients that exist
    Promise.all(createInboxPromises).then((messages) => {
      next();
    });
  },

  createOutbox: (req, res, next) => {
    Outbox.create({
      sender: req.body.sender,
      messageID: res.locals.messageID
    }).then(m => {
      const message = m.toJSON();
      res.json(message);
    })
  }
}
