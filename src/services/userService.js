const User = require('../models/user');

async function createUser(userData) {
  const newUser = new User(userData);
  await newUser.save();

  await User.create({
    user: newUser._id,
    visualLearner: false,
    challengedModules: [],
    achievementLevel: 'basic'
  });

  return newUser;
}

async function getUserById(userId) {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return user;
}

async function updateUser(userId, updateData) {
  const { visualLearner, ...userFields } = updateData;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    userFields,
    { new: true }
  );
  if (!updatedUser) throw new Error('User not found for update');

  if (typeof visualLearner === 'boolean') {
    await User.findOneAndUpdate(
      { user: updatedUser._id },
      { visualLearner },
      { upsert: true }
    );
  }

  return updatedUser;
}

module.exports = {
  createUser,
  getUserById,
  updateUser
};