const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const messageRouter = require('./routes/messages.js');

app.use(bodyParser.json());

// ==============ROUTES=============================
app.use('/', messageRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  res.status(404).send(error);
})

// ============START SERVER==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
