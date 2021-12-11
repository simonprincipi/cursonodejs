const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './.env' });

const DB = process.env.mongourl.replace('<PASSWORD>', process.env.password);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection succesfull!'));

//Read JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//IMPORT DATA
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data succesfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
//Delete data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data succesfully deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
