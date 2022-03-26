import React from 'react'
import './Menu.css'
import { IconButton } from '@material-ui/core'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LogoutIcon from '@mui/icons-material/Logout'

const UserAddMenu = () =>{

   return(

      <div>
         <ul>
            <li>
               <IconButton href="http://localhost:3000/admin/user">
                  <ArrowBackIcon style={{color:'white'}}/>
               </IconButton>
            </li>



            <li> Add User </li>


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
export default UserAddMenu;
