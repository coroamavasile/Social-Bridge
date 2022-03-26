import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Container } from '@material-ui/core'
import axiosInstance from '../../axios'
import EditPinMenu from '../Menu/EditPinMenu'

const EditPin = (props) => {
   let clientId = props.match.params.id
   const [client, setClient] = useState({})

   const handleSubmit = async (event) => {
      event.preventDefault()
      console.log(client)
      const response = await axiosInstance.put(`/pin/${client.id}`, client)
      console.log(response)
      props.history.push('/admin/map')
   }

   const search = async () => {
      const response = await axiosInstance.get(`/pin/${clientId}`)
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
                        id="title"
                        label="Title"
                        placeholder={client.title}
                        name="title"
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
                        id="location"
                        label="Location"
                        placeholder={client.location}
                        name="location"
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
                        id="description"
                        label="Description"
                        placeholder={client.description}
                        name="description"
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
                        id="latitude"
                        label="Latitude"
                        placeholder={client.latitude}
                        name="latitude"
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
                        id="longitude"
                        label="Longitude"
                        placeholder={client.longitude}
                        name="longitude"
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
                           Edit
                        </Button>
                     </div>
                  </form>
            </Container>
         </div>
      )
   }
   return (
      <div>
         <EditPinMenu/>
         <div>{renderForm()}</div>
      </div>
   )
}

export default EditPin
