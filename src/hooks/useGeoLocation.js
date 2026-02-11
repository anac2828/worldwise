import { useState } from 'react'

// default value for defaultPosition is null
export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState(defaultPosition)
  const [error, setError] = useState(null)

  function getPosition() {
    // navigator from Window object
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation')

    setIsLoading(true)

    navigator.geolocation.getCurrentPosition(
      // Get position from geolocation
      (pos) => {
        // Update location state
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
        // Reset loading state
        setIsLoading(false)
      },

      // Error handler
      (error) => {
        // Update error state
        setError(error.message)
        // Reset loading state
        setIsLoading(false)
      },
    )
  }
  // Export state and function to get location
  return { isLoading, position, error, getPosition }
}
