const router = require('express').Router()
const UserModel = require('../models/User.model')


router.post('/people', async (req, res, next) => {      
    try{
        let users = await UserModel.find({},{username: 1, _id: 1, description: 1, image_url: 1, categories: 1 })    
        res.status(200).json(users)
    }  
    catch(error){
        res.status(500).json({
            errorMessage: "Something went wrong, let's try again!",
            error: error
        })
    }
})

router.post('/getFriends', async (req, res, next) => {
    console.log(req.session.loggedInUser)
    try{
        let userData = await UserModel.findById(req.session.loggedInUser._id).populate('friends').populate('friendRequests')
        console.log(userData)
        res.status(200).json(userData.friends)
    } catch (error){
        res.status(500).json({
            errorMessage: "Something went wrong, let's try again!",
            error: error
        })
    }
})

router.post('/friend/request', async (req, res, next) => {
    const {_id} = req.session.loggedInUser
    const {userId} = req.body
    try{ 
        let requestUser = await UserModel.findByIdAndUpdate(userId, {$push: {friendRequests:  _id}}, {new: true})
        res.status(200).json({successMessage: `Your request has been sent to ${requestUser.name}`})
    } catch (error) {
        res.status(500).json({
            errorMessage: "Something went wrong, let's try again!",
            error: error
        })
    }
})

router.post('/friend/response' , async (req, res, next) => {
    const {_id} = req.session.loggedInUser
    const {response, userId} = req.body
    try{
        if(response){
            let userData = await UserModel.findByIdAndUpdate(_id, {$and: [{$push:{ friends: userId}}, {$pull: {friendRequests: userId}}]}, {new: true})
            let friend = await UserModel.findByIdAndUpdate(userId, {$push: {friends: _id}}, {new: true})
            req.session.loggedInUser = userData
            res.status(200).json({userData, successMessage: `You and ${friend.username} are now friends`})
        } else {
            let user = await UserModel.findByIdAndUpdate(_id, {$pull: {friendRequests: userId}}, {new: true})
            req.session.loggedInUser = user
            res.status(200).json({userData, successMessage: 'Request complete'})
        }
    } catch (error) {
        res.status(500).json({
            errorMessage: "Something went wrong, let's try again!",
            error: error
        })
    }
})


module.exports = router