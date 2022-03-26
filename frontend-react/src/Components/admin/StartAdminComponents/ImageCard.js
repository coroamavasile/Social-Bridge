import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Collapse } from '@material-ui/core'

export default function ImageCard({ place ,checked}) {

   return (
      <Collapse
         in={{checked}}
         {...(checked ? {timeout:1000} : {})}
      >
      <Card style={{
         backgroundColor:"rgba(0,0,0,0.5)",
         maxWidth:645,
         margin:'20px'
      }}>
         <CardMedia
            component="img"
            height="440"
            image={place.imageUrl}
            alt="green iguana"
         />
         <CardContent>
            <Typography
               style={{
                  fontWeight:'bold',
                  fontSize:'2rem',
                  color:'#fff'
               }}
               gutterBottom
               variant="h5"
               component="div"
            >
               <a style={{color:'inherit',textDecoration:'inherit'}} href={place.url}>
                  {place.title}
               </a>
            </Typography>
            <Typography
               style={{
                  fontSize:'1.1rem',
                  fontWeight:'bold',
                  color:'#ddd'
               }}
               variant="body2"
               color="text.secondary"
            >
               {place.description}
            </Typography>
         </CardContent>

      </Card>
      </Collapse>
   );
}