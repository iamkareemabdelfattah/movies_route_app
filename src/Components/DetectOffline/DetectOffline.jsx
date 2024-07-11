import React from 'react'

const DetectOffline = () => {
  return (
    <div className="offline position-fixed start-0 bottom-25 bg-opacity-50 bg-danger text-white p-3 z-1 rounded shadow-lg">
      You're offline right now. Check your connection.
    </div>
  )
}

export default DetectOffline
