import { React, useEffect, useState } from 'react'
import configStyle from '../../configuration/configStyle'
import axiosInstance from '../../axios'
import { Link } from 'react-router-dom'
import Menu from '../Menu/Menu'
import './UsersTable.css'
import { Button, IconButton } from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const UsersTable = (props) => {

   const [clients, setClients] = useState([])

   const search = async () => {
      const response = await axiosInstance.get('/user')
      console.log(response.data)
      setClients(response.data)
   }

   useEffect(() => {
      search()
   }, [])

   const deleteHandler = async (idClient) => {
      console.log(idClient)
      const response = await axiosInstance.delete(`/user/${idClient}`)
      console.log(response)
      window.location.reload()
   }

   const renderClients = () => {
      const clientsList = clients.map((client, index) => (
         <tr
            key={client.id}

         >
            <th style={configStyle.spaceTable}>{index}</th>
            <th style={configStyle.spaceTable}>{client.name}</th>
            <th style={configStyle.spaceTable}>{client.phoneNumber}</th>
            <th style={configStyle.spaceTable}>{client.age}</th>
            <th style={configStyle.spaceTable}>{client.email}</th>
            <th style={configStyle.spaceTable}>{client.username}</th>
            <th style={configStyle.spaceTable}>{client.role}</th>
            <th>
               <IconButton
                  //   onClick={deleteHandler.bind(this, client.id)}
                  onClick={() => {
                     deleteHandler(client.id)
                  }}
                  variant="contained"
                  color="secondary"
               >
                  <DeleteIcon/>
               </IconButton>
            </th>
            <th>
               <IconButton
               variant="contained"
               >
                  <Link to={`/admin/user/edit/${client.id}`} style={{textDecoration:'none',color:'black'}}>
                     <EditIcon/>
                  </Link>
               </IconButton>
            </th>
         </tr>
      ))

      return (
         <table style={style.styledTable}>
            <tr style={style.headerTable}>
               <th style={configStyle.spaceTable}></th>
               <th style={configStyle.spaceTable}>Name</th>
               <th style={configStyle.spaceTable}>Phone</th>
               <th style={configStyle.spaceTable}>Age</th>
               <th style={configStyle.spaceTable}>Email</th>
               <th style={configStyle.spaceTable}>Username</th>
               <th style={configStyle.spaceTable}>Role</th>
               <th style={configStyle.spaceTable}></th>
               <th style={configStyle.spaceTable}></th>
            </tr>
            <tbody style={style.tableRow}>{clientsList}</tbody>
         </table>
      )
   }

   return (
      <div style={{
         height: '100%',
         position: 'absolute',
         left: '0px',
         width: '100%',
      }}>
         <Menu/>
         <div style={style.tablePos}>{renderClients()}</div>
         <div
         style={{
            
            display:'flex',
            justifyContent:'center',
            marginBottom:'30px'
         }}>
            <Button
               style={{
                  marginLeft:'10px',
                  marginRight:'10px',
                  marginBottom:'30px'
               }}
               onClick={event =>  window.location.href='/admin/add/user'}
               variant="contained"
               color="primary"
            >
               Add user
            </Button>

            <Button
               style={{
               marginLeft:'10px',
               marginRight:'10px',
                  marginBottom:'30px'

               }}

               onClick={event =>  window.location.href='/admin/map'}
               variant="contained"
               color="primary"
               >
               Edit pins
            </Button>
         </div>

      </div>
   )
}

export default UsersTable

const style = {
   //    container: { padding: 30, margin: 30 },
   styledTable: {
      margin: '25px 0',
      fontSize: '1.2em',
      fontFamily: 'sans-serif',
      minWidth: '400px',
},
   headerTable: {
      textAlign: 'center',
      padding: '1 20px',
   },
   tableRow: {
      textAlign: 'center',
   },
   tablePos: {
      
      marginTop:'50px',
      display: 'flex',
      justifyContent: 'center',
   },
   space: {
      padding: '0 10px 0 10px',
   }
}
