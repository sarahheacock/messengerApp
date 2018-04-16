const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.js');

app.use(bodyParser.urlencoded({ extended: false }));

// ==============ROUTES=============================
app.use('/', userRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  res.status(404).send(error);
})

// ============START SERVER==========================
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
