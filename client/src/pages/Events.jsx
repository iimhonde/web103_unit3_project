import React, { useState, useEffect } from 'react'
import EventsAPI from '../services/EventsAPI'
import '../css/Events.css'

const Events = () => {
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true)
                setError(null)
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            } catch (error) {
                console.error('Error fetching events:', error)
                setError('Failed to load events')
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        })
    }

    const formatPrice = (price) => {
        return `$${parseFloat(price).toFixed(2)}`
    }

    if (loading) {
        return (
            <div className='events-container'>
                <h2>Loading Events...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className='events-container'>
                <h2>Error: {error}</h2>
            </div>
        )
    }

    return (
        <div className='events-container'>
            <h2>All Events</h2>
            <div className='events-list'>
                {events.length > 0 ? (
                    events.map(event => (
                        <div key={event.id} className='event-card'>
                            {event.image && (
                                <img src={event.image} alt={event.title} style={{width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1rem'}} />
                            )}
                            <h3>{event.title}</h3>
                            <p><strong>Date:</strong> {formatDate(event.date)}</p>
                            <p><strong>Time:</strong> {event.time}</p>
                            <p><strong>Location:</strong> {event.location_name}</p>
                            <p><strong>Price:</strong> {formatPrice(event.price)}</p>
                            <p>{event.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No events available</p>
                )}
            </div>
        </div>
    )
}

export default Events