import User from '../models/User.js';
import { sequelize } from '../db/Conn.js';

export async function findAll() {
  try {
    await sequelize.sync();
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error connecting to the db:', error);
    throw error;
  }
}

export async function findById(id) {
  try {
    await sequelize.sync();
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.error('Error connecting to the db:', error);
    throw error;
  }
}

export async function findByEmail(email) {
  try {
    await sequelize.sync();
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error('Error connecting to the db:', error);
    throw error;
  }
}

export async function create({ firstName, lastName, email }) {
  try {
    await sequelize.sync();
    const user = await User.create({ firstName, lastName, email });
    return user;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error('Email already exists');
    }
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function update(id, { firstName, lastName, email }) {
  try {
    await sequelize.sync();
    const user = await User.update({ firstName, lastName, email }, { where: { id } });
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

export async function destroy(userId) {
  try {
    await sequelize.sync();
    return await User.destroy({ where: { id: userId } });
  } catch (error) {
    console.log("Error deleting user: ", error);
    throw error;
  }
}