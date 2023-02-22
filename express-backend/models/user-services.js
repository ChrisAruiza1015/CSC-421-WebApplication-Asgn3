const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userModel = require("./user");
const jwt = require('jsonwebtoken');
dotenv.config()

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PWD +
      "@" +
      process.env.MONGO_CLUSTER +
      "/" +
      process.env.MONGO_DB +
      "?retryWrites=true&w=majority",
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

async function getUsers(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await userModel.find();
  } else if (name && !job) {
    result = await findUserByName(name);
  } else if (job && !name) {
    result = await findUserByJob(job);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByNameandPassword(username, password) {
  return await userModel.findOne({ username: username, password: password });
}

async function findUserByName(name) {
  return await userModel.find({ username: name });
}


exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.findUserByName = findUserByName;
exports.findUserByNameandPassword = findUserByNameandPassword;
