import React from 'react'
import FavPins from '../user/FavPins'

const StartFavorite = (props) => {
   return (
      <div style={{
         height: '100%',
         position: 'absolute',
         left: '0px',
         width: '100%',
         overflow: 'hidden',
      }}>
         <FavPins />
      </div>
   )
}

export default StartFavorite
