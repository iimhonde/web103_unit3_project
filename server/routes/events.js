import express from 'express'
import eventsController from '../controllers/events.js'

const router = express.Router()

// GET all events
router.get('/', eventsController.getAllEvents)

// GET upcoming events only
router.get('/upcoming', eventsController.getUpcomingEvents)

// GET events by location ID
router.get('/location/:locationId', eventsController.getEventsByLocation)

// GET event by ID
router.get('/:id', eventsController.getEventById)

// POST create new event
router.post('/', eventsController.createEvent)

// PUT update event by ID
router.put('/:id', eventsController.updateEvent)

// DELETE event by ID
router.delete('/:id', eventsController.deleteEvent)

export default router