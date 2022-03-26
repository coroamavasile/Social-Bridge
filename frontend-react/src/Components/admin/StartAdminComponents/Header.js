import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Collapse, IconButton, Toolbar, Tooltip } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import LogoutIcon from '@mui/icons-material/Logout'

const useStyles = makeStyles((theme) => ({
   root:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:'100vh',
   },
   appbar:{
      background:'none'
   },
   appbarWrapper:{
      width:'80%',
      margin: '0 auto'
   },
   appbarTitle:{
      flexGrow:'1'
   },
   icon:{
      color:'white',
      fontSize:'2rem'
   },
   container:{
      textAlign:'center',
      fontSize:'4.5rem'


   },
   title:{
      color:'white',
      fontSize:'3rem',
   },
   goDown:{
     color:"white",
     fontSize:"4 rem",
   },
}))

export default function Header(){

   const classes = useStyles()

   const [checked, setChecked] = useState(false);

   useEffect( () => {
      setChecked(true)
   },[])

   return(
      <div className={classes.root} id = "header">
         <AppBar className={classes.appbar} elevation={0}>
            <Toolbar className={classes.appbarWrapper}>
               <h1 className={classes.appbarTitle}>Social impact app</h1>
               <Tooltip title="Log out">
                  <IconButton href="/login">
                     <LogoutIcon className={classes.icon}/>
                  </IconButton>
               </Tooltip>
            </Toolbar>
         </AppBar>


         <Collapse
            in={checked}
            {...(checked ? {timeout: 1000} : {})}
            collapsedHeight={50}
         >
            <div className={classes.container}>
               <h1 className={classes.title}>Welcome admin</h1>
               <IconButton >
                  <ExpandMoreIcon  className={classes.goDown}/>
               </IconButton>
            </div>
         </Collapse>
      </div>
   )

}