import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Container, IconButton, Tooltip } from '@material-ui/core'
import axiosInstance from '../axios'
import { useHistory } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Register = (props) => {
   const [credentials, setCredentials] = useState({ role: 1 })

   const handleInput = (e) => {
      const { value, name } = e.target

      setCredentials({ ...credentials, ...{ [name]: value } })
   }
   let history = useHistory();
   
    
  

   const onSubmit = async (e) => {
      e.preventDefault()
      const response = await axiosInstance.post('/user', credentials)
      console.log(response.data)
      history.push('/login')
   }

   const renderLogin = () => {
      
      return (

         <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
            <Container style={{width:'25%',
               display:'flex',
               justifyContent:'center'}}>

               <form onSubmit={onSubmit}>

                  <div>
                     <h1  style={{
                        display:'flex',
                        justifyContent:'center',
                        marginTop:'100px'
                     }} >Sign Up</h1>
                     <h3  style={{
                        display:'flex',
                        justifyContent:'center'
                     }}>Let's create your account!</h3>
                  </div>

                  <TextField
                     style={{
                        backgroundColor:'white',
                        borderRadius:'5px'
                     }}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="name"
                     label="Name"
                     name="name"
                     onChange={handleInput}
                     autoFocus
                  />
                  <TextField
                     style={{
                        backgroundColor:'white',
                        borderRadius:'5px'
                     }}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="address"
                     label="Address"
                     name="address"
                     onChange={handleInput}
                     autoFocus
                  />
                  <TextField
                     style={{
                        backgroundColor:'white',
                        borderRadius:'5px'
                     }}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="phoneNumber"
                     label="Phone"
                     name="phoneNumber"
                     onChange={handleInput}
                     autoFocus
                  />
                  <TextField
                     style={{
                        backgroundColor:'white',
                        borderRadius:'5px'
                     }}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="age"
                     label="Age"
                     name="age"
                     onChange={handleInput}
                     autoFocus
                  />
                  <TextField
                     style={{
                        backgroundColor:'white',
                        borderRadius:'5px'
                     }}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email"
                     name="email"
                     onChange={handleInput}
                     autoFocus
                  />
                  <TextField
                     style={{
                        backgroundColor:'white',
                        borderRadius:'5px'
                     }}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     id="username"
                     label="Username"
                     name="username"
                     onChange={handleInput}
                     autoFocus
                  />
                  <TextField
                     style={{
                        backgroundColor:'white',
                        borderRadius:'5px'
                     }}
                     variant="outlined"
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     onChange={handleInput}
                  />

                  <div style={{
                     display:'flex',
                     justifyContent:'center',
                     marginTop:'20px',

                  }}>
                     <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                     >
                        Sign Up
                     </Button>
                  </div>
               </form>
            </Container>
         </div>
      )
   }
   return (

      <div>

         <Tooltip title="Return">
            <IconButton href="/login">
               <ArrowBackIcon
                  style={{color:'black',fontSize:'xx-large'}}
               />
            </IconButton>
         </Tooltip>

         {renderLogin()}
      </div>
   )
}

export default Register

const styles = {
   container: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      border: '2px solid black',
      boxSizing: 'border-box',
      height: '800px',
      padding: '20px',
      width: '360px',
   },
   positionContainter: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      paddingTop: 100,
      paddingBottom: 50,
   },
   title: {
      color: 'rgb(0, 0, 0)',
      fontFamily: 'sansSerif',
      fontSize: '36px',
      fontWeight: 600,
      marginTop: '30px',
   },
   subtitle: {
      color: 'rgb(0, 0, 0)',
      fontFamily: 'sansSerif',
      fontSize: '20px',
      fontWeight: 600,
      marginTop: '10px',
   },
}
