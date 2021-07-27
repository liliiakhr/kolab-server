const router = require("express").Router();
const EventModel = require("../models/EVent.model");

router.post('/event/add-event', async (req, res, next) => {
    try {
        const { name, description, image_url, start, end, creator, groupOrigin, users } = req.body;
        let newEvent = await EventModel.create({ name, description, image_url, start, end, creator, groupOrigin, users })
        console.log(newEvent)
        res.status(200).json(newEvent)
    }
    catch(error) {
        console.log(error)
    }
})

module.exports = router;