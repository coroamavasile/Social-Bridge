import React from 'react'
import { CssBaseline, makeStyles } from '@material-ui/core'
import image from '../../Utils/Cluj-Napoca.jpg'
import Header from './StartAdminComponents/Header'
import Content from './StartAdminComponents/Content'

const useStyles = makeStyles((theme) => ({
   root:{
      minHeight:'100vh',
      backgroundImage:`url(${image})`,
      backgroundRepeat:"no-repeat",
      backgroundSize:'cover'
   }
}))

export default function StartAdmin(){

   const classes = useStyles()

   return (
      <div className={classes.root}
      style={{
         width: '100%',
         height: '100%',
         overflow: 'hidden'}}>
         <div
         style={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
            paddingRight:'20px'
         }}>
            <CssBaseline/>
            <Header/>
            <Content/>
         </div>
      </div>
   )
}