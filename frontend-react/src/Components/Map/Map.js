import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import RoomIcon from '@mui/icons-material/Room'
import axiosInstance from '../../axios'
import { IconButton, Tooltip } from '@material-ui/core'
import StarIcon from '@mui/icons-material/Star'
import LogoutIcon from '@mui/icons-material/Logout'
import './Adminmap.css'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom'

import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'

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
   const [activeUser, setActiveUser] = useState()
   const [showButton, setShowButton] = useState(true)

   function containsObject(obj, list) {
      var i
      for (i = 0; i < list.length; i++) {
         if (list[i].id === obj.id) {
            list[i].role = 'FAVORITE'
            return true
         }
      }

      return false
   }

   const search = async () => {
      const response = await axiosInstance.get('/pin')
      const response2 = await axiosInstance.get(
         `/user/${localStorage.getItem('USER_ID')}`
      )

      let allPins = response.data
      let favPinsArr = response2.data.favPins
      favPinsArr.map((element) => {
         containsObject(element, allPins)
      })
      setPins(allPins)
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

   useEffect(() => {
      searchUser()
   }, [selectedIncident])

   const searchUser = async () => {
      const response = await axiosInstance.get(
         `/user/${localStorage.getItem('USER_ID')}`
      )
      setActiveUser(response.data)
      console.log(response.data)
      if (selectedIncident) {
         const vrb = activeUser.favPins.map((pin) => {
            if (pin.id === selectedIncident.id) return true
         })

         setShowButton(vrb.includes(true))
      }
   }

   const pinColor = (pin) => {
      if (pin.role === 'FAVORITE') {
         return {
            fontSize: viewport.zoom * 4,
            color: '#FFFF00',
            cursor: 'pointer',
         }
      }

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

   const addToFavorite = async (pinId) => {
      const userId = localStorage.getItem('USER_ID')
      const response = await axiosInstance.post(
         `/user/addpin/${userId}/${pinId}`
      )
      // window.location.reload()
      console.log(response.data)
   }

   const deleteHandler = async (id) => {
      const response = await axiosInstance.post(
         `/user/delete/pin/${localStorage.getItem('USER_ID')}/${id}`
      )
      console.log(response)
   }
   const history = useHistory()
   const handleMarkerClick = (latitude, longitude) => {
      setViewport({ ...viewport, latitude: latitude, longitude: longitude })
   }

   const hideEmptyAdd = () => {
      let element = document.getElementById('hideEmptyAdd')
      ReactDOM.findDOMNode(element).style.display = 'none'
   }
   const showFullAdd = () => {
      let element = document.getElementById('showFullAdd')
      ReactDOM.findDOMNode(element).style.display = 'block'
   }
   const showEmptyRemove = () => {
      let element = document.getElementById('showEmptyRemove')
      ReactDOM.findDOMNode(element).style.display = 'block'
   }
   const hideFullRemove = () => {
      let element = document.getElementById('hideFullRemove')
      ReactDOM.findDOMNode(element).style.display = 'none'
   }

   return (
      <div>
         <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={'MAP_BOX_API_KEY'}
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

                     <p
                        style={{
                           display: 'flex',
                           justifyContent: 'center',
                           fontSize: 'small',
                        }}
                     >
                        {selectedIncident.timestamp.toString().substring(0, 10)}
                     </p>
                     <p
                        style={{
                           display: 'flex',
                           justifyContent: 'center',
                           fontSize: 'small',
                        }}
                     >
                        {selectedIncident.timestamp
                           .toString()
                           .substring(11, 16)}
                     </p>

                     <pre style={{ fontSize: '15px' }}>
                        <b>Location:</b> {selectedIncident.location}
                     </pre>
                     <pre style={{ fontSize: '15px' }}>
                        <b>Description:</b> {selectedIncident.description}
                     </pre>
                     <pre style={{ fontSize: '15px' }}>
                        <b>Official link:</b>{' '}
                        <a href="https://www.example.net/base">
                           www.example.net/base
                        </a>
                     </pre>

                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'center',
                        }}
                     >
                        {!showButton ? (
                           <Tooltip title="Add to favorites">
                              <IconButton
                                 onClick={() => {
                                    addToFavorite(selectedIncident.id)
                                    hideEmptyAdd()
                                    showFullAdd()
                                 }}
                              >
                                 <StarBorderIcon
                                    id="hideEmptyAdd"
                                    style={{ display: 'block' }}
                                 />
                                 <StarIcon
                                    id="showFullAdd"
                                    style={{
                                       color: 'orange',
                                       display: 'none',
                                    }}
                                 />
                              </IconButton>
                           </Tooltip>
                        ) : (
                           <Tooltip title="Remove from favorites">
                              <IconButton
                                 onClick={() => {
                                    deleteHandler(selectedIncident.id)
                                    showEmptyRemove()
                                    hideFullRemove()
                                 }}
                              >
                                 <StarIcon
                                    id="hideFullRemove"
                                    style={{
                                       color: 'orange',
                                       display: 'block',
                                    }}
                                 />
                                 <StarBorderIcon
                                    id="showEmptyRemove"
                                    style={{ display: 'none' }}
                                 />
                              </IconButton>
                           </Tooltip>
                        )}
                     </div>
                  </div>
               </Popup>
            ) : null}

            <Tooltip title="Favorite pins list">
               <IconButton href="/user/pins">
                  <StarIcon style={{ color: 'black', fontSize: 'xx-large' }} />
               </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
               <IconButton
                  href={`/admin/user/edit/${localStorage.getItem('USER_ID')}`}
                  style={{
                     position: 'relative',
                     bottom: '-850px',
                     right: '-1780px',
                  }}
               >
                  <EditIcon style={{ color: 'black', fontSize: 'xx-large' }} />
               </IconButton>
            </Tooltip>

            <Tooltip title="Log out">
               <IconButton href="/login" style={{ float: 'right' }}>
                  <LogoutIcon
                     style={{ color: 'black', fontSize: 'xx-large' }}
                  />
               </IconButton>
            </Tooltip>
         </ReactMapGL>
      </div>
   )
}
