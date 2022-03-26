import React, { useEffect, useState } from 'react'
import configStyle from '../../configuration/configStyle'
import axiosInstance from '../../axios'

import './FavPins.css'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@mui/icons-material/Delete'
import FavPinsMenu from '../Menu/FavPinsMenu'

const FavPins = (props) => {
   const [pins, setPins] = useState([])

   const search = async () => {
      const response = await axiosInstance.get(
         `/user/${localStorage.getItem('USER_ID')}`
      )
      console.log(response.data)
      setPins(response.data.favPins)
   }

   useEffect(() => {
      search()
   }, [])

   const deleteHandler = async (id) => {
      const response = await axiosInstance.post(
         `/user/delete/pin/${localStorage.getItem('USER_ID')}/${id}`
      )
      console.log(response)
      window.location.reload()
   }

   const renderClients = () => {
      const clientsList = pins.map((client, index) => (
         <tr
            key={client.id}

         >
            <th style={configStyle.spaceTable}>{index}</th>
            <th style={configStyle.spaceTable}>{client.title}</th>
            <th style={configStyle.spaceTable}>{client.timestamp}</th>
            <th style={configStyle.spaceTable}>{client.role}</th>
            <th style={configStyle.spaceTable}>{client.longitude}</th>
            <th style={configStyle.spaceTable}>{client.latitude}</th>
            <th style={configStyle.spaceTable}>{client.description}</th>
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
         </tr>
      ))

      return (
         <table style={style.styledTable}>
            <tr style={
               style.headerTable}>
               <th style={configStyle.spaceTable}>Index</th>
               <th style={configStyle.spaceTable}>Title</th>
               <th style={configStyle.spaceTable}>Date</th>
               <th style={configStyle.spaceTable}>Role</th>
               <th style={configStyle.spaceTable}>Longitude</th>
               <th style={configStyle.spaceTable}>Latitude</th>
               <th style={configStyle.spaceTable}>Description</th>
               <th style={configStyle.spaceTable}></th>
            </tr>
            <tbody style={style.tableRow}>{clientsList}</tbody>
         </table>
      )
   }

   return (

      <div>
         <FavPinsMenu/>
         <div style={style.tablePos}>{renderClients()}</div>
      </div>
   )
}

export default FavPins

const style = {
   //    container: { padding: 30, margin: 30 },
   styledTable: {
      borderCollapse: 'collapse',
      margin: '25px 0',
      fontSize: '0.9em',
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
      display: 'flex',  
      justifyContent: 'center',
   },
   space: {
      padding: '0 10px 0 10px',
   },
}
