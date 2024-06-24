const express = require('express');
const { UserAuthentication } = require('../Controller/Authentication');

const UserRouter=express.Router();

UserRouter.post('/SignUp',UserAuthentication.UserRegister);
UserRouter.post('/Login',UserAuthentication.UserLogin)

module.exports={UserRouter}