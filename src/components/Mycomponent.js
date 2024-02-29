import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export function MyComponent() {
  const [rating, setRating] = useState(0)

  // Catch Rating value
 
  // Optinal callback functions
 


  return (
    <div className='App'>
      <Rating
        iconsCount={3}
        fillColor={"#000"}
      />
    </div>
  )
}