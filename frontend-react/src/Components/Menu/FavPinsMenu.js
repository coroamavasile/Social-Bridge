import React from 'react'
import './Menu.css'
import { IconButton } from '@material-ui/core'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'

const FavPinsMenu = () =>{

   return(

      <div>
         <ul>
            <li>
               <IconButton href="/user">
                  <ArrowBackIcon style={{color:'white'}}/>
               </IconButton>
            </li>

            <li> Saved Pins </li>

            <li
               style={{float:'right',marginTop:'3px'}}
            >
               <IconButton href="/login">
                  <LogoutIcon style={{color:'white'}}/>
               </IconButton>
            </li>

         </ul>

      </div>
   )


}
export default FavPinsMenu;
