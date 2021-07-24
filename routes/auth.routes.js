const router = require ("express").Router();
const UserModel = require('../models/User.model');
const bcrypt = require('bcryptjs');

router.post('/auth/signup', async (req,res, next) => {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        res.status(500).json({errorMessage: "Please fill in all fields"});
        return;
    }
    const emailreg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailreg.test(email)) {
        res.status(500).json({errorMessage: "Please enter a valid email"});
        return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    let passcheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,14}$/
    if(!passcheck.test(password)){
        res.status(500).json({errorMessage: `Password must have:
        - At least one number;
        - At least one special characters;
        - Must be between 6 and 14 characters;
        `});
    return;
    }
    try {
        let userData = await UserModel.create({username, email, password: hash})
        userData.password = '***'
        req.session.loggedInUser = userData
        res.status(200).json({userData, successMessage: `Welcome to Kolab ${userData.username}`}) 
        
    }
    catch (err){
        if (err.code === 11000){
            res.status(500).json({
                errorMessage: 'Username or email entered already exists!',
                message: err,
            })
        }
        else {
            console.log(err)
            res.status(500).json({
                errorMessage: 'There has been an error. Try again!',
                message: err,
            })
            
        }
    }
});

router.post('/auth/login', async (req, res, next) => {
    const {username, password} = req.body
    if(!username || !password){
        res.status(500).json({errorMessage: "Please enter username and password"})
    } 
    try{
       let userData = await UserModel.findOne({username})
       let match = await bcrypt.compareSync(password, userData.password)
       if(match){
           userData.password = '***'
           req.session.loggedInUser = userData;
           res.status(200).json({userData, successMessage: `Welcome back ${userData.username}`})
       } else{
           res.status(500).json({errorMessage: 'Incorrect Password'})
       }
    }
    catch (error) {
       res.status(500).json({errorMessage: 'Username does not exist'})
    }
});

router.post('/auth/logout', (req,res) => {
    req.session.destroy();
    res.status(204).json({successMessage: 'Thank you, see you next time'})
});

const isLoggedIn = (req, res, next) => {
    if (req.session.loggedInUser) {
      next()
    }
    else {
      res.status(401).json({
          errorMessage: 'Not an authorized user'
        })
    }
};

router.post('/user', async (req, res, next) => {
    try {
        // The following comments are about having access to the group name in the Navbar
        // I decided to populate the user (also not optimal)
        // The other option was to use the groupNames, this would lead to having to update the groupNames everytime the groupName is edited
        // The third option is to querry for the groups every time the navbar gets rendered, this also makes little sense
        // We need to discuss (also with Manish) what the best option is, all seem bad
        const {image_url, description, categories, groupNames, groups, posts, friends, friendRequests, _id, username, email, password} = req.body
        let newUser = await UserModel.findByIdAndUpdate(_id, {image_url, description, categories, groupNames, groups, posts, friends, friendRequests, username, email, password}, {new: true})
                                .populate('groups')
        req.session.loggedInUser = newUser;
        res.status(200).json({newUser})
    }
    catch (error) {
        res.status(500).json({
            errorMessage: 'Weird, for some reason we could not update your data. Please try again!'
        })
    }
})

router.get('/user', isLoggedIn, (req,res,next) => {
    res.status(200).json(req.session.loggedInUser);
});

module.exports = router;