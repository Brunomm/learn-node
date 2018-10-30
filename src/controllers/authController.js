const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, resp) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return resp.status(422).send({error: 'User already exists'});

    const user = await User.create(req.body);

    user.password = undefined;

    return resp.send({user});

  } catch(e) {
    return resp.status(400).send({error: 'Registration failed'});
  }
} );

module.exports = app => app.use('/auth', router);