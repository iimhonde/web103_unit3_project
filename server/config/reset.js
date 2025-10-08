import { pool } from './database.js'
import dotenv from 'dotenv'
import locations from '../data/locations.js'
import events from '../data/events.js'

dotenv.config()

const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(500) NOT NULL,
            capacity INTEGER NOT NULL,
            description TEXT NOT NULL,
            image VARCHAR(500)
        )
    `

    try {
        const res = await pool.query(createTableQuery);
        console.log("🏛️ Locations table created successfully");
    } catch (error) {
        console.error("❌ Error creating locations table:", error);
    }
}

const createEventsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            time VARCHAR(10) NOT NULL,
            location_id INTEGER NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            description TEXT NOT NULL,
            image VARCHAR(500),
            FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
        )
    `

    try {
        const res = await pool.query(createTableQuery);
        console.log("🎭 Events table created successfully");
    } catch (error) {
        console.error("❌ Error creating events table:", error);
    }
}

const seedLocationsTable = async () => {
    await createLocationsTable()

    locations.forEach((location) => {
        const insertQuery = {
            text: 'INSERT INTO locations (id, name, address, capacity, description, image) VALUES ($1, $2, $3, $4, $5, $6)'
        }

        const values = [
            location.id,
            location.name,
            location.address,
            location.capacity,
            location.description,
            location.image
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting location', err)
                return
            }

            console.log(`✅ ${location.name} added successfully`)
        })
    })
}

const seedEventsTable = async () => {
    await createEventsTable()

    // Add a small delay to ensure locations are inserted first
    setTimeout(() => {
        events.forEach((event) => {
            const insertQuery = {
                text: 'INSERT INTO events (id, title, date, time, location_id, price, description, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
            }

            const values = [
                event.id,
                event.title,
                event.date,
                event.time,
                event.location_id,
                event.price,
                event.description,
                event.image
            ]

            pool.query(insertQuery, values, (err, res) => {
                if (err) {
                    console.error('⚠️ error inserting event', err)
                    return
                }

                console.log(`✅ ${event.title} added successfully`)
            })
        })
    }, 1000)
}

const seedDatabase = async () => {
    await seedLocationsTable()
    await seedEventsTable()
}

seedDatabase()
