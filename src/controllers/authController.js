const User = require('../models/user');

async function login(req, res) {
  try {
    const {
      username
    } = req.body;

    if (!username) {
      return res.status(400).json({
        error: 'Username is required'
      });
    }

    let user = await User.findOne({
      username
    });

    if (!user) {
      try {
        user = await new User({
          username
        }).save();
      } catch (saveErr) {
        throw saveErr;
      }
    }

    res.json({
      _id: user._id,
      username: user.username
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = {
  login
};
