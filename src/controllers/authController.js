const express = require('express');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User = require('../models/user');
const authConfig = require('../../config/auth');


const router = express.Router();

function generateToken(user){
  return jwt.sign({id: user.id}, authConfig.secret, {expiresIn: 86400});
};

router.post('/register', async (req, resp) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return resp.status(422).send({error: 'User already exists'});

    const user = await User.create(req.body);

    user.password = undefined;

    return resp.send({user, token: generateToken(user)});

  } catch(e) {
    return resp.status(400).send({error: 'Registration failed'});
  }
} );

router.post('/authenticate', async (req, resp) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password')

    if(!user)
      return resp.status(400).send({error: 'User not found'});


    if( !await bcrypt.compare(password, user.password) )
      return resp.status(400).send({error: 'Invalid password'});

    user.password = undefined;

    return resp.send({user, token: generateToken(user)});

  } catch(e) {
    console.log('ERRO: ', e)
    return resp.status(400).send({error: 'Authenticate failed'});
  }
} );

module.exports = app => app.use('/auth', router);