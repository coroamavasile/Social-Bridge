import React from 'react'
import { makeStyles } from '@material-ui/core'
import ImageCard from './ImageCard'
import useWindowPosition from './hook/useWindowPosition'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'


const useStyles = makeStyles((theme) => ({

   root:{
      height:'100vh',
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
   },
   charts:{
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
   }
}))

const places = [
   {
      title:"Edit users",
      description:"Add, delete or update user data and credentials",
      imageUrl: process.env.PUBLIC_URL + '/Cluj-Napoca.jpg',
      time:1500,
      url:"/admin/user"
   },
   {
      title:"Edit pins",
      description:"Add, delete or update pins ",
      imageUrl: process.env.PUBLIC_URL + '/Cluj-Napoca.original.jpg',
      time:1500,
      url:"/admin/map"
   },
]

const chart_data = [
   {name:'01-11-2021',users:338},
   {name:'02-11-2021',users:982},
   {name:'03-11-2021',users:627},
   {name:'04-11-2021',users:798},
   {name:'05-11-2021',users:718},
   {name:'06-11-2021',users:873},
   {name:'07-11-2021',users:194},
   {name:'08-11-2021',users:214},
   {name:'09-11-2021',users:905},
   {name:'10-11-2021',users:429},
   {name:'11-11-2021',users:214},
   {name:'12-11-2021',users:66},
   {name:'13-11-2021',users:887},
   {name:'14-11-2021',users:117},
   {name:'15-11-2021',users:101},
   {name:'16-11-2021',users:361},
   {name:'17-11-2021',users:428},
   {name:'18-11-2021',users:659},
   {name:'19-11-2021',users:309},
   {name:'20-11-2021',users:134},
   {name:'21-11-2021',users:982},
   {name:'22-11-2021',users:104},
   {name:'23-11-2021',users:152},
   {name:'24-11-2021',users:383},
   {name:'25-11-2021',users:472},
   {name:'26-11-2021',users:541},
   {name:'27-11-2021',users:629},
   {name:'28-11-2021',users:718},
   {name:'29-11-2021',users:724},
   {name:'30-11-2021',users:995},


]

const pir_chart_data = [
   {name:'Blood donation',users:123},
   {name:'Material donation',users:234},
   {name:'Tourism',users:345},
   {name:'Other',users:456},
]

const COLORS = ['#e53838', '#00C49F', '#13e2ea', '#FF8042'];
const COLORS2 = ['#6acce1', '#5692a1'];

export default function(){

   const classes = useStyles();
   const checked = useWindowPosition('header');

   return(
      <div>

         <div
            style={{backgroundColor:"rgba(0,0,0,0.6)",
            width:'100vw'}}
            className={classes.charts}>
               <PieChart width={600} height={600}>
                  <Pie
                     dataKey="users"
                     isAnimationActive={false}
                     data={pir_chart_data}
                     cx={350}
                     cy={250}
                     outerRadius={150}
                     fill="#8884d8"
                     label
                  >
                     {chart_data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                  </Pie>
                  <Tooltip style={{backgroundColor:'white'}} />
               </PieChart>


            <BarChart
               width={1300}
               height={500}
               data={chart_data}
               margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
               }}
               barSize={40}
            >
               <XAxis
                  dataKey="name"
                  scale="point"
                  padding={{ left: 25, right: 25 }}
               />
               <YAxis />
               <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }}/>
               <CartesianGrid strokeDasharray="3 3" />
               <Bar dataKey="users" fill="#8884d8" background={{ fill: "#efeaea" }} >
                  {chart_data.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                  ))}
               </Bar>
            </BarChart>

         </div>
         <div className={classes.root}>
            <ImageCard place={places[0]} checked={checked}/>
            <ImageCard place={places[1]} checked={checked}/>
         </div>
      </div>
   )
}