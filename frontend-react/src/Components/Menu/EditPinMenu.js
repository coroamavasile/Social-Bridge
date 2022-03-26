import React from 'react'
import './Menu.css'
import { IconButton } from '@material-ui/core'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'

const EditPinMenu = () =>{

   return(

      <div style={{
         height: '100%',
         position: 'absolute',
         left: '0px',
         width: '100%',
         overflow: 'hidden',
      }}>
         <ul>
            <li>
               <IconButton href="http://localhost:3000/admin/map">
                  <ArrowBackIcon style={{color:'white'}}/>
               </IconButton>
            </li>



            <li> Edit Pin </li>


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
export default EditPinMenu;
