const router = require("express").Router();
const EventModel = require("../models/Event.model");

router.post('/event/add-event', async (req, res, next) => {
    try {
        const { name, description, image_url, start, end, creator, groupOrigin, users } = req.body;
        let newEvent = await EventModel.create({ name, description, image_url, start, end, creator, groupOrigin, users })
        res.status(200).json(newEvent)
    }
    catch(error) {
        console.log(error)
    }
})

router.get('/events/:groupId/:date', async (req, res, next) => {
    try {
        let { groupId, date } = req.params;
        let eventData = await EventModel.find({ $and: [ {groupOrigin: groupId}, {start: {$gte: date} } ] })
                                .populate('users')
        res.status(200).json(eventData)
    }
     catch(error) {
        res.status(500).json({
            errorMessage: 'No events were found'
        })
    }
});

router.post('/event/participate', async (req, res, next) => {
    try {
        let { eventId, userId, action } = req.body;
        if (action === "participate") {
            let eventData = await EventModel.findByIdAndUpdate(eventId, { $addToSet: { users: userId } }, {new: true} )
                                    .populate('users')
            res.status(200).json(eventData)
        }
        if (action === "abort") {
            let eventData = await EventModel.findByIdAndUpdate(eventId, { $pull: { users: userId } }, {new: true} )
                                    .populate('users')
            res.status(200).json(eventData)
        }
    }
     catch(error) {
        res.status(500).json({
            errorMessage: 'Unfortunately something went wrong...'
        })
    }
});

router.get('/events/all', async (req, res, next) => {
    try {
        let eventData = await EventModel.find({})
                                .populate('users')
                                .populate('groupOrigin')
        res.status(200).json(eventData)
    }
     catch(error) {
        res.status(500).json({
            errorMessage: 'No events were found'
        })
    }
});

module.exports = router;


//  { start: { $lte: "2022-02-25" } } 
// useless comment