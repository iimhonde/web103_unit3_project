const LocationsAPI = {
    getAllLocations: async () => {
        try {
            const response = await fetch('/api/locations')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching locations:', error)
            throw error
        }
    },

    getLocationById: async (id) => {
        try {
            const response = await fetch(`/api/locations/${id}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            return data
        } catch (error) {
            console.error('Error fetching location by ID:', error)
            throw error
        }
    }
}

export default LocationsAPI