import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import '../css/LocationEvents.css'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState({})
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchLocationAndEvents = async () => {
            try {
                setLoading(true)
                setError(null)
                
                // Fetch location data
                const locationData = await LocationsAPI.getLocationById(index)
                setLocation(locationData)
                
                // Fetch events for this location
                const eventsData = await EventsAPI.getEventsByLocation(index)
                setEvents(eventsData)
                
            } catch (error) {
                console.error('Error fetching location and events:', error)
                setError('Failed to load location and events data')
            } finally {
                setLoading(false)
            }
        }

        if (index) {
            fetchLocationAndEvents()
        }
    }, [index])

    if (loading) {
        return (
            <div className='location-events'>
                <h2>Loading...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className='location-events'>
                <h2>Error: {error}</h2>
            </div>
        )
    }

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}</p>
                    <p>Capacity: {location.capacity}</p>
                    <p>{location.description}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents