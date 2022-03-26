import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import {
   Container,
   IconButton,
   Tooltip,
   Radio,
   FormControlLabel,
   RadioGroup,
   FormLabel,
   FormControl,
} from '@material-ui/core'
import axiosInstance from '../../axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const AddPin = (props) => {
   const [credentials, setCredentials] = useState({ role: 0 })
   const [selection, setSelection] = useState(0)

   const handleInput = (e) => {
      console.log(credentials)
      const { value, name } = e.target

      setCredentials({ ...credentials, ...{ [name]: value } })
   }

   const onSubmit = async (e) => {
      e.preventDefault()
      credentials.role = selection
      console.log(credentials.role)
      setCredentials({ ...credentials, ...{ timestamp: new Date() } })
      const response = await axiosInstance.post('/pin', credentials)
      console.log(response.data)
      props.history.push('/admin/map')
      // console.log(selection)
   }
   const renderForm = () => {
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
            <Tooltip title="Return">
               <IconButton href="/admin/map" style={{ float: 'left' }}>
                  <ArrowBackIcon
                     style={{ color: 'black', fontSize: 'xx-large' }}
                  />
               </IconButton>
            </Tooltip>

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
                  <form onSubmit={onSubmit}>
                     <div>
                        <h1
                           style={{
                              display: 'flex',
                              justifyContent: 'center',
                              marginTop: '100px',
                              color: 'white',
                           }}
                        >
                           Add a new pin
                        </h1>
                     </div>

                     <TextField
                        style={{
                           backgroundColor: 'white',
                           borderRadius: '5px',
                           marginTop: '20px',
                           marginBottom: '20px',
                        }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        onChange={handleInput}
                        autoFocus
                     />
                     <TextField
                        style={{
                           backgroundColor: 'white',
                           borderRadius: '5px',
                           marginTop: '20px',
                           marginBottom: '20px',
                        }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="location"
                        label="Location"
                        name="location"
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
                        required
                        fullWidth
                        id="description"
                        label="Description"
                        name="description"
                        onChange={handleInput}
                        autoFocus
                     />
                     <TextField
                        style={{
                           backgroundColor: 'white',
                           borderRadius: '5px',
                           marginTop: '20px',
                           marginBottom: '20px',
                        }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="latitude"
                        label="Latitude"
                        name="latitude"
                        onChange={handleInput}
                        autoFocus
                     />
                     <TextField
                        style={{
                           backgroundColor: 'white',
                           borderRadius: '5px',
                           marginTop: '20px',
                           marginBottom: '20px',
                        }}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="longitude"
                        label="Longitude"
                        name="longitude"
                        onChange={handleInput}
                        autoFocus
                     />
                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'center',
                           marginTop: '20px',
                           marginBottom: '20px',
                        }}
                     >
                        {/* <Select
                           style={{
                              backgroundColor: 'white',
                              borderRadius: '5px',
                           }}
                           labelId="role"
                           id="role"
                           value={selection}
                           label="role"
                           name="role"
                           onChange={handleInput}
                        >
                           <p
                              style={{
                                 color: 'black',
                                 fontSize: 'large',
                              }}
                              value={0}
                              onClick={() => {
                                 setSelection(0)
                              }}
                           >
                              BLOOD_DONATION
                           </p>

                           <p
                              style={{
                                 color: 'black',
                                 fontSize: 'large',
                              }}
                              value={1}
                              onClick={() => {
                                 setSelection(1)
                              }}
                           >
                              MATERIAL_DONATION
                           </p>

                           <p
                              style={{
                                 color: 'black',
                                 fontSize: 'large',
                              }}
                              value={2}
                              onClick={() => {
                                 setSelection(2)
                              }}
                           >
                              TOURISM
                           </p>
                        </Select> */}
                        <FormControl component="fieldset">
                           <label style={{ color: 'white' }}>Type</label>
                           <RadioGroup
                              aria-label="gender"
                              defaultValue="BLOOD_DONATION"
                              name="radio-buttons-group"
                           >
                              <FormControlLabel
                                 value="BLOOD_DONATION"
                                 control={<Radio style={{ color: 'white' }} />}
                                 label="Blood donation"
                                 style={{ color: 'white' }}
                                 onClick={() => {
                                    setSelection(0)
                                 }}
                              />
                              <FormControlLabel
                                 value="MATERIAL_DONATION"
                                 control={<Radio style={{ color: 'white' }} />}
                                 label="Material donation"
                                 style={{ color: 'white' }}
                                 onClick={() => {
                                    setSelection(1)
                                 }}
                              />
                              <FormControlLabel
                                 value="TOURISM"
                                 control={<Radio style={{ color: 'white' }} />}
                                 label="Tourism"
                                 style={{ color: 'white' }}
                                 onClick={() => {
                                    setSelection(2)
                                 }}
                              />
                           </RadioGroup>
                        </FormControl>
                     </div>

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
                           style={{ backgroundColor: 'green' }}
                        >
                           Add
                        </Button>
                     </div>
                  </form>
               </Container>
            </div>
         </div>
      )
   }
   return <div>{renderForm()}</div>
}

export default AddPin
const styles = {
   container: {
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      border: '2px solid black',
      boxSizing: 'border-box',
      height: '80%',
      padding: '20px',
      width: '360px',
   },
   positionContainter: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
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
