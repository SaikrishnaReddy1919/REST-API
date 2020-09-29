const express = require("express")
const router = express.Router()
const Subscriber = require("../models/subscriber")

//middleware
const getSubscriber =async  (req, res, next) => {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({
                message : "Cannot find subscriber"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error : error.message
        })
    }
    res.subscriber = subscriber
    next()
}


//get all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
//getting one
router.get('/:id',getSubscriber, (req, res) => {
    res.send(res.subscriber)
})
//creating one
router.post('/create', async (req, res) => {

    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedTo : req.body.subscribedTo
    })
    try {
        const newSubscriber = subscriber.save()
        res.status(201).json({subscriber})
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})
//updating ome
router.patch('/update/:id', getSubscriber, async (req, res) => {
    if (req.body.name !== null) {
        res.subscriber.name = req.body.name
    }
    if (req.body.name !== null) {
        res.subscriber.subscribedTo = req.body.subscribedTo
    }
    
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (error) {
        res.status(400).json({
            error : error.message
        })
    }
})
//deleting one

router.delete('/delete/:id',getSubscriber, async (req, res) => {
    try {
        res.subscriber.remove()
        res.json({
            message : "Subscriber removed"
        })
    } catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
})

module.exports = router