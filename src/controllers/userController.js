const userService = require('../services/userService');

async function registerUser(req, res) {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getUser(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ user: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  registerUser,
  getUser,
  updateUser
};