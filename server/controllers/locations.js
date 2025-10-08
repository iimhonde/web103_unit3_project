import { pool } from "../config/database.js";

const getAllLocations = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM locations ORDER BY id ASC')
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getLocationById = async (req, res) => {
    try {
        const locationId = parseInt(req.params.id)
        const result = await pool.query('SELECT * FROM locations WHERE id = $1', [locationId])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' })
        }
        
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const createLocation = async (req, res) => {
    try {
        const { name, address, capacity, description, image } = req.body
        const result = await pool.query(
            'INSERT INTO locations (name, address, capacity, description, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, address, capacity, description, image]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateLocation = async (req, res) => {
    try {
        const locationId = parseInt(req.params.id)
        const { name, address, capacity, description, image } = req.body
        
        const result = await pool.query(
            'UPDATE locations SET name = $1, address = $2, capacity = $3, description = $4, image = $5 WHERE id = $6 RETURNING *',
            [name, address, capacity, description, image, locationId]
        )
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' })
        }
        
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteLocation = async (req, res) => {
    try {
        const locationId = parseInt(req.params.id)
        const result = await pool.query('DELETE FROM locations WHERE id = $1 RETURNING *', [locationId])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Location not found' })
        }
        
        res.status(200).json({ message: 'Location deleted successfully', location: result.rows[0] })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation
}