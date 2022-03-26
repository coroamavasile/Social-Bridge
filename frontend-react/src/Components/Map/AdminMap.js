import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import RoomIcon from '@mui/icons-material/Room'
import axiosInstance from '../../axios'
import { Link } from 'react-router-dom'
import { IconButton, Tooltip } from '@material-ui/core'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import './Adminmap.css'
import LogoutIcon from '@mui/icons-material/Logout'
import AddIcon from '@mui/icons-material/Add'

export default function App() {
   const [viewport, setViewport] = useState({
      latitude: 46.755808,
      longitude: 23.594112,
      width: '100vw',
      height: '100vh',
      zoom: 10,
   })

   const [pins, setPins] = useState([])
   const [selectedIncident, setSelectedIncident] = useState(null)

   const search = async () => {
      const response = await axiosInstance.get('/pin')
      // console.log(response.data)
      setPins(response.data)
   }

   useEffect(() => {
      const listener = (e) => {
         if (e.key === 'Escape') setSelectedIncident(null)
      }
      window.addEventListener('keydown', listener)
      search()
      return () => {
         window.removeEventListener('keydown', listener)
      }
   }, [])

   const pinColor = (pin) => {
      // console.log(pin)
      if (pin.role === 'BLOOD_DONATION') {
         return {
            fontSize: viewport.zoom * 4,
            color: 'crimson',
            cursor: 'pointer',
         }
      } else if (pin.role === 'MATERIAL_DONATION') {
         return {
            fontSize: viewport.zoom * 4,
            color: '#517dc4',
            cursor: 'pointer',
         }
      }

      return {
         fontSize: viewport.zoom * 4,
         color: '#35a85c',
         cursor: 'pointer',
      }
   }

   const onClickMap = (e) => {
      console.log(e.lngLat)
   }

   const deletePinHandler = async (id) => {
      const response = await axiosInstance.delete(`/pin/${id}`)
      console.log(response.data)
      window.location.reload()
   }

   const handleMarkerClick = (latitude, longitude) => {
      setViewport({ ...viewport, latitude: latitude, longitude: longitude })
   }

   return (
      <div>
         <ReactMapGL
            onClick={onClickMap}
            {...viewport}
            mapboxApiAccessToken={'TOKEN_MAPBOX_API'}
            onViewportChange={(viewport) => {
               setViewport(viewport)
            }}
            transitionDuration="200"
         >
            {pins.map((pin) => (
               <Marker
                  key={pin.id}
                  longitude={pin.longitude}
                  latitude={pin.latitude}
               >
                  <RoomIcon
                     style={pinColor(pin)}
                     onClick={(e) => {
                        e.preventDefault()
                        setSelectedIncident(pin)
                        handleMarkerClick(pin.latitude, pin.longitude)
                     }}
                  />
               </Marker>
            ))}

            {selectedIncident ? (
               <Popup
                  className="popupStyle"
                  latitude={selectedIncident.latitude}
                  longitude={selectedIncident.longitude}
                  onClose={() => {
                     setSelectedIncident(null)
                  }}
               >
                  <div>
                     <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                        {selectedIncident.title}
                     </h2>
                     <pre style={{ fontSize: '15px' }}>
                        <b>Description:</b> {selectedIncident.description}
                     </pre>
                     <pre style={{ fontSize: '15px' }}>
                        <b>Location:</b> {selectedIncident.location}
                     </pre>
                     <pre style={{ fontSize: '15px' }}>
                        <b>Role:</b> {selectedIncident.role}
                     </pre>
                     <pre style={{ fontSize: '15px' }}>
                        <b>Latitude:</b> {selectedIncident.latitude}
                     </pre>
                     <pre style={{ fontSize: '15px' }}>
                        <b>Longitude:</b> {selectedIncident.longitude}
                     </pre>

                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        <Tooltip title="Delete">
                           <IconButton
                              onClick={() => {
                                 deletePinHandler(selectedIncident.id)
                              }}
                              variant="contained"
                              color="secondary"
                           >
                              <DeleteIcon />
                           </IconButton>
                        </Tooltip>

                        <Tooltip title="Edit">
                           <IconButton variant="contained">
                              <Link
                                 to={`/admin/pin/edit/${selectedIncident.id}`}
                              >
                                 <EditIcon />
                              </Link>
                           </IconButton>
                        </Tooltip>
                     </div>
                  </div>
               </Popup>
            ) : null}

            <Tooltip title="Return">
               <IconButton href="/admin">
                  <ArrowBackIcon
                     style={{ color: 'black', fontSize: 'xx-large' }}
                  />
               </IconButton>
            </Tooltip>

            <Tooltip title="Log out">
               <IconButton href="/login" style={{ float: 'right' }}>
                  <LogoutIcon
                     style={{ color: 'black', fontSize: 'xx-large' }}
                  />
               </IconButton>
            </Tooltip>

            <Tooltip title="Add">
               <IconButton
                  href="/admin/add/pin"
                  style={{
                     position: 'relative',
                     bottom: '-850px',
                     right: '-1780px',
                  }}
               >
                  <AddIcon style={{ color: 'black', fontSize: 'xxx-large' }} />
               </IconButton>
            </Tooltip>
         </ReactMapGL>
      </div>
   )
}
