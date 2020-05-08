const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');


/*const schema = {
    user_name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6).required()
        .email(),
    password: Joi.string()
        .min(6)
        .required()
};*/

router.post('/register',async(req,res)=> {

    //validate the data 

    //const validation = Joi.validate(req.body,schema);
    //res.send(validation);


    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //check the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
   
    //create a new user
    const user = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        console.log("test");
        const savedUser = await user.save();
        console.log("test");
        res.send(savedUser );
    }catch(err){
        res.status(400).send(err);
    }
    

});

//login

router.post('/login',async(req,res) => {
//validate data
const {error} = loginValidation(req.body);
if(error) return res.status(400).send(error.details[0].message);

//check if the email is exist
const user = await User.findOne({email: req.body.email});
if(!user) return res.status(400).send('Email or password is wrong');

//check if password is correct
const validPass = await bcrypt.compare(req.body.password, user.password);
if(!validPass) return res.status(400).send('Invalid password');

//create and assign a token
const token = jwt.sign({_id: user._id}, "secret");
res.header('auth-token', token).send(token);

});

module.exports =router;