import React, { useEffect, useState } from 'react'

import axiosInstance from '../../axios.js'
import Typography from '@mui/material/Typography'
import image1 from '../../Utils/Cluj-Napoca.original.jpg'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'


const Login = (props) => {
   const [credentials, setCredentials] = useState({
      username: '',
      password: '',
   })

   const handleInput = (e) => {
      const { value, name } = e.target

      setCredentials({ ...credentials, ...{ [name]: value } })
   }

   useEffect(() => {
      localStorage.removeItem('USER')
      localStorage.removeItem('USER_ID')
   }, [])

   const onSubmit = async (e) => {
      e.preventDefault()
      const response = await axiosInstance.post('/login', credentials)
      console.log(response.data)
      localStorage.setItem('USER', response.data.role)
      localStorage.setItem('USER_ID', response.data.id)

      if (response.data.role === 'ADMIN') {
         props.history.push('/admin')
         window.location.reload()
      } else {
         props.history.push('/user')
         window.location.reload()
      }
   }

   const theme = createTheme();

   const renderLogin = () => {
      return (
         <ThemeProvider theme={theme} >
            <Grid

               container component="main" sx={{backgroundImage: 'url(' + image1 + ')', height: '100vh' }}>
               <CssBaseline />
               <Grid

                  item
                  xs={false}
                  sm={4}
                  md={7}
                  sx={{

                     backgroundRepeat: 'no-repeat',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                  }}
               />
               <Grid style={{ backgroundColor: "rgba(255,255,255,0.9)"}}
                     item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                  <Box
                     sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                     }}
                  >
                     <Avatar sx={{ m: 1, bgcolor: 'lightblue' }}>
                        <LockOutlinedIcon />
                     </Avatar>
                     <Typography component="h1" variant="h5">
                        Sign in
                     </Typography>
                     <Box  component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>


                     <TextField
                        style={{
                           backgroundColor:'white'
                        }}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='username'
                        label='Username'
                        name='username'
                        autoComplete='string'
                        onChange={handleInput}
                        autoFocus
                     />
                     <TextField
                        style={{
                           backgroundColor:'white'
                        }}
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'

                        onChange={handleInput}
                        autoComplete='current-password'
                     />

                     <FormControlLabel

                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                     />

                     <div style={{
                        display:'flex',
                        justifyContent:'center'
                     }}>
                        <Button
                           style={{
                              padding:'8px 30px'
                           }}
                           type="submit"
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                        >
                           Sign In
                        </Button>
                     </div>
                       
                        <Grid container>
                           <Grid item xs>
                              <Link href="#" variant="body2">
                                 Forgot password?
                              </Link>
                           </Grid>
                           <Grid item>
                              <Link href="/register" variant="body2">
                                 {"Don't have an account? Sign Up"}
                              </Link>
                           </Grid>
                        </Grid>
                     </Box>
                  </Box>
               </Grid>
            </Grid>
         </ThemeProvider>
      );
   }

   return <div>{renderLogin()}</div>
}

export default Login
