const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt    = require('jsonwebtoken');
// const User = require('../models/user');
// const authConfig = require('../../config/auth');

const authMiddleware = require('../middlewares/auth');


const router = express.Router();

router.use(authMiddleware)

router.get('/', async (req, resp) => {
  return resp.send({ok: true});
} );

module.exports = app => app.use('/projects', router);