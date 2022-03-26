import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Container } from '@material-ui/core'
import axiosInstance from '../../axios'
import UserAddMenu from '../Menu/UserAddMenu'

const AddUser = (props) => {
   const [client, setClient] = useState({ role: 1 })

   const handleSubmit = async (event) => {
      event.preventDefault()
      console.log(client)
      const response = await axiosInstance.post('/api/user', client)
      console.log(response)
      props.history.push('/admin/users')
   }

   const handleInput = (event) => {
      const { value, name } = event.target
      setClient({ ...client, ...{ [name]: value } })
   }

   const renderForm = () => {
      // console.log(client)
      return (
         <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}}>
            <Container style={{width:'25%',
               display:'flex',
               justifyContent:'center'}}>
                  <form onSubmit={handleSubmit}>
                     <TextField
                        style={{
                           backgroundColor:'white',
                           borderRadius:'5px'
                        }}
                        variant="outlined"
                        margin="normal"
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
                        fullWidth
                        id="name"
                        label="email"
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
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        onChange={handleInput}
                        autoFocus
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
                           Add User
                        </Button>
                     </div>

                  </form>
            </Container>
         </div>
      )
   }
   return (
      <div>
         <UserAddMenu/>
         <div>{renderForm()}</div>
      </div>
   )
}

export default AddUser
