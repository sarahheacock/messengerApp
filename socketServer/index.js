const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

const userRouter = require('./routes/userRouter.js');
const messageRouter = require('./routes/messageRouter.js');

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(bodyParser.json());

app.use('/message', messageRouter);
app.use('/user', userRouter);

// ==============ERROR HANDELER===============================
app.get("*", (req, res, next) => {
  request(`http://localhost:8000${req.url}`, (err, response, body) => {
    if(err) return res.json(err);
    res.send(body);
  })
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
