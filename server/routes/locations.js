import express from 'express'
import locationsController from '../controllers/locations.js'

const router = express.Router()

// GET all locations
router.get('/', locationsController.getAllLocations)

// GET location by ID
router.get('/:id', locationsController.getLocationById)

// POST create new location
router.post('/', locationsController.createLocation)

// PUT update location by ID
router.put('/:id', locationsController.updateLocation)

// DELETE location by ID
router.delete('/:id', locationsController.deleteLocation)

export default router