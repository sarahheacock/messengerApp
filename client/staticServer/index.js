const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../build')))
app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
