import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import BusList from './BusList';

const GetBus = () => {
    const[busList, setBusList] = useState(JSON.parse(localStorage.getItem('buses')));
    const [date, setDate] = useState(localStorage.getItem("date"));
    

    useEffect(()=>{
        const buses= JSON.parse(localStorage.getItem('buses'));
        if (buses){
            setBusList(buses)
        }
        
        const tempDate = localStorage.getItem("date");
        setDate(tempDate);
        console.log("tempDate from GetBus: " + tempDate);
    },[])


  return (
    <div><div>
    <Box sx={{ flexGrow: 1 }}  pb={3}>
     <AppBar position="static" style={{ background: '#0F3557' }}>
       <Toolbar align="right"><Typography variant="h5">BookMyBus.com</Typography>
       </Toolbar>
     </AppBar>
   </Box>
   </div>
    {
        busList.length>0?
        busList.map((item)=>(<BusList busList={item} date={date} />)):alert('no bus')
    }
    </div>
  )
}

export default GetBus




// import { Box, Button, Paper, Typography } from "@mui/material";
// import React from "react";
// import BookOnlineIcon from "@mui/icons-material/BookOnline";
// import { Link } from "react-router-dom";
// import '.././App.css'

// import WifiIcon from '@mui/icons-material/Wifi';
// import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
// import AcUnitIcon from '@mui/icons-material/AcUnit'
// import SosIcon from "@mui/icons-material/Sos"
// import LightIcon from "@mui/icons-material/Light"

// const BusList = (props) => {

//   const bus=props.busList

//   const busListHandler = () => {
//     localStorage.setItem("bus", JSON.stringify(props.busList));
//   };

//   return (

//     <div className="topbuscontainer">
//       <div className="card pe-2" style={{marginTop:"20px",boxShadow:"5px 10px"}}>
//       <div className="buslistdiv"> 
//         <div className="bussubdiv">
//             <div>
//               {bus.busName}
//             </div>
//             <div>
//               {bus.type}
//             </div>
//             <div className="iconsdiv">
//               <WifiIcon/>
//               <ElectricalServicesIcon/>
//               <LightIcon/>
//               <SosIcon/>
//               {bus.type=="Ac"&&<AcUnitIcon/>}
//             </div>
//         </div>
//         <div className="bussubdiv">
//             <div>
//               {bus.days}
//             </div>
//         </div>
//         <div className="bussubdiv">
//             <div>
//               {bus.source}
//             </div>
//             <div>
//               {bus.destination}
//             </div>
//         </div>
//         <div className="bussubdiv">
//             <div>
//               {bus.capacity} persons
//             </div>
//             <div>
//             ₹{bus.fare} 
//             </div>
//         </div>
//         <div className="bussubdiv">
//           <Link to="/busseats"  style={{textDecoration:"none"}}>
//             <Button variant="contained" onClick={busListHandler}>
//               <BookOnlineIcon />View Seats
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default BusList;






