const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URIs;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // eslint-disable-next-line no-console
  .then(() => console.log("Database Connected Successfully!"))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

// all routes
const earthRouter = require('./api/routes/RouteModel');

app.use('/earth', earthRouter);

app.use('/', express.static(path.resolve(__dirname, './dist')));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
  res.end();
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
