import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Container } from '@material-ui/core'
import axiosInstance from '../../axios'
import UserEditMenu from '../Menu/UserEditMenu'
import './UserEdit.css'
import FavPinsMenu from '../Menu/FavPinsMenu'
import UserMenu from '../Menu/UserMenu'

const UserEdit = (props) => {
   let clientId = props.match.params.id
   const [client, setClient] = useState({})

   const handleSubmit = async (event) => {
      event.preventDefault()
      console.log(client)
      const response = await axiosInstance.put(`/user/${client.id}`, client)
      console.log(response)
      window.location.reload()
      // props.history.push('/admin/users')
   }

   const search = async () => {
      const response = await axiosInstance.get(`/user/${clientId}`)
      console.log(response.data)
      setClient(response.data)
   }

   const handleInput = (event) => {
      const { value, name } = event.target
      setClient({ ...client, ...{ [name]: value } })
   }

   useEffect(() => {
      search()
      // console.log(client)
   }, [])

   const renderForm = () => {
      // console.log(client)
      return (
         <div
            style={{
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               height: '80vh',
            }}
         >
            <Container
               style={{
                  width: '25%',
                  display: 'flex',
                  justifyContent: 'center',
               }}
            >
               <form onSubmit={handleSubmit}>
                  <TextField
                     style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                     }}
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="name"
                     placeholder={client.name}
                     name="name"
                     onChange={handleInput}
                     autoFocus
                  />

                  <TextField
                     style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                     }}
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="phoneNumber"
                     placeholder={client.phoneNumber}
                     name="phoneNumber"
                     onChange={handleInput}
                     autoFocus
                  />

                  <TextField
                     style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                     }}
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="age"
                     placeholder={client.age}
                     name="age"
                     onChange={handleInput}
                     autoFocus
                  />

                  <TextField
                     style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                     }}
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="name"
                     placeholder={client.email}
                     name="email"
                     onChange={handleInput}
                     autoFocus
                  />

                  <TextField
                     style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                     }}
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="username"
                     placeholder={client.username}
                     name="username"
                     onChange={handleInput}
                     autoFocus
                  />

                  <TextField
                     style={{
                        backgroundColor: 'white',
                        borderRadius: '5px',
                     }}
                     variant="outlined"
                     margin="normal"
                     fullWidth
                     id="password"
                     placeholder={client.password}
                     name="password"
                     onChange={handleInput}
                     autoFocus
                  />

                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px',
                     }}
                  >
                     <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                     >
                        Edit
                     </Button>
                  </div>
               </form>
            </Container>
         </div>
      )
   }
   return (
      <div
         style={{
            height: '100%',
            position: 'absolute',
            left: '0px',
            width: '100%',
            overflow: 'hidden',
         }}
      >
         {localStorage.getItem('USER') === 'ADMIN' ? (
            <UserEditMenu />
         ) : (
            <UserMenu />
         )}
         <div style={{ marginTop: '50px' }}>{renderForm()}</div>
      </div>
   )
}

export default UserEdit
