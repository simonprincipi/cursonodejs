const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.mongourl.replace('<PASSWORD>', process.env.password);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection succesfull!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
