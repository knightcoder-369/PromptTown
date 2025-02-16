'use server';

const User = require('../modals/user.modal');
const { connect } = require('../db');

async function createUser(user) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

module.exports = { createUser };