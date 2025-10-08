const EventsAPI = {
    getAllEvents: async () => {
        try {
            const response = await fetch('/api/events')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching events:', error)
            throw error
        }
    },

    getEventById: async (id) => {
        try {
            const response = await fetch(`/api/events/${id}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching event by ID:', error)
            throw error
        }
    },

    getEventsByLocation: async (locationId) => {
        try {
            const response = await fetch(`/api/events/location/${locationId}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching events by location:', error)
            throw error
        }
    },

    getUpcomingEvents: async () => {
        try {
            const response = await fetch('/api/events/upcoming')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching upcoming events:', error)
            throw error
        }
    },

    createEvent: async (eventData) => {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData)
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error creating event:', error)
            throw error
        }
    },

    updateEvent: async (id, eventData) => {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(eventData)
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error updating event:', error)
            throw error
        }
    },

    deleteEvent: async (id) => {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error deleting event:', error)
            throw error
        }
    }
}

export default EventsAPI