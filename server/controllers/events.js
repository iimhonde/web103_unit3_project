import { pool } from "../config/database.js";

const getAllEvents = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT events.*, locations.name as location_name 
            FROM events 
            JOIN locations ON events.location_id = locations.id 
            ORDER BY events.date ASC, events.time ASC
        `)
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventById = async (req, res) => {
    try {
        const eventId = parseInt(req.params.id)
        const result = await pool.query(`
            SELECT events.*, locations.name as location_name, locations.address as location_address 
            FROM events 
            JOIN locations ON events.location_id = locations.id 
            WHERE events.id = $1
        `, [eventId])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }
        
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getEventsByLocation = async (req, res) => {
    try {
        const locationId = parseInt(req.params.locationId)
        const result = await pool.query(`
            SELECT events.*, locations.name as location_name 
            FROM events 
            JOIN locations ON events.location_id = locations.id 
            WHERE events.location_id = $1 
            ORDER BY events.date ASC, events.time ASC
        `, [locationId])
        
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const createEvent = async (req, res) => {
    try {
        const { title, date, time, location_id, price, description, image } = req.body
        const result = await pool.query(
            'INSERT INTO events (title, date, time, location_id, price, description, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [title, date, time, location_id, price, description, image]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const updateEvent = async (req, res) => {
    try {
        const eventId = parseInt(req.params.id)
        const { title, date, time, location_id, price, description, image } = req.body
        
        const result = await pool.query(
            'UPDATE events SET title = $1, date = $2, time = $3, location_id = $4, price = $5, description = $6, image = $7 WHERE id = $8 RETURNING *',
            [title, date, time, location_id, price, description, image, eventId]
        )
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }
        
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const deleteEvent = async (req, res) => {
    try {
        const eventId = parseInt(req.params.id)
        const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [eventId])
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' })
        }
        
        res.status(200).json({ message: 'Event deleted successfully', event: result.rows[0] })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

const getUpcomingEvents = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT events.*, locations.name as location_name 
            FROM events 
            JOIN locations ON events.location_id = locations.id 
            WHERE events.date >= CURRENT_DATE 
            ORDER BY events.date ASC, events.time ASC
        `)
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export default {
    getAllEvents,
    getEventById,
    getEventsByLocation,
    createEvent,
    updateEvent,
    deleteEvent,
    getUpcomingEvents
}