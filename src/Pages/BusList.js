import { AppBar, Box, Button, Card, CardActions, CardContent, Container, Fab, Grid, Paper, Toolbar, Typography } from "@mui/material";
import React from "react";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import { Link } from "react-router-dom";
import WifiIcon from '@mui/icons-material/Wifi';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SosIcon from '@mui/icons-material/Sos';
import LightIcon from '@mui/icons-material/Light';
import { makeStyles } from "@mui/styles";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const useStyles = makeStyles((theme)=>({
  root:{

    paddingTop:20,
    paddingBottom:20
    
  },
}));
//const source=localStorage.getItem('source')
//const destination=localStorage.getItem('destination')

const BusList = (props) => {
  const classes = useStyles();
  const busListHandler = () => {
    localStorage.setItem("bus", JSON.stringify(props.busList));
    

  };
  
  <h2> Available Buses</h2>;
  return (
    <>

    <Container className={classes.root}>
      
        
          <Card>
          <Grid container spacing={3}>
            
          <Grid item sm={3}>
          <Box>
            <CardContent>
              <Typography variant="h6">Bus No</Typography>
              <Typography variant="subtitle1">{props.busList.bus_id}</Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h6">Amenities</Typography>
              <Typography variant="subtitle1"><WifiIcon/><ElectricalServicesIcon/>< LightIcon/><AcUnitIcon/><SosIcon/></Typography>
            </CardContent>
           
            </Box>
            </Grid>
            <Grid item sm={3}>
          <Box>
            <CardContent>
              <Typography variant="h6">Source</Typography>
              <Typography variant="subtitle1"><LocationOnIcon/>{props.busList.source}</Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h6">Destination</Typography>
              <Typography variant="subtitle1"><LocationOnIcon/>{props.busList.destination}</Typography>
            </CardContent>
           
            </Box>
            </Grid>
            <Grid item sm={3}>
          <Box>
            <CardContent>
              <Typography variant="h6">Departure</Typography>
              <Typography variant="subtitle1">9:00 AM</Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h5">Arrival</Typography>
              <Typography variant="subtitle1">10:00 PM</Typography>
            </CardContent>
           
            </Box>
            </Grid>
            <Grid item sm={3}>
          <Box>
            <CardContent>
              <Typography variant="h5">Available Seats</Typography>
              <Typography variant="subtitle1">{props.busList.capacity}</Typography>
            </CardContent>
            <CardContent>
              <Typography variant="h5">Date Of Journey</Typography>
              <Typography variant="subtitle1">{props.date}</Typography>
            </CardContent>
           
            </Box>
            </Grid>
          
         
         
            </Grid>
            <Box >
            <CardActions>
            <Link to="/busseats">
                <Fab onClick={busListHandler} variant="extended" color="primary">
                  View Seats
                </Fab>
              </Link>
            </CardActions>
            </Box>
        
          </Card>
    
      
    </Container>
      {/* <div>
     
        <Paper elevation={8} padding={10}  >
          <Box
            display="flex"
            
            flexDirection="row"
            sx={{ width: "80%", float: "center", bgcolor: "primary.light" }}
          >
            <Box sx={{ width: "40%", float: "left" }} display="inline">
              <Typography variant="body1" display="inline">
                Bus Number
              </Typography>
              <br/>
              <Typography variant="body1" display="inline">
                {props.busList.bus_id}
              </Typography>
            </Box>
            <Box sx={{ width: "40%" }} display="inline">
              <Typography variant="body1" display="inline">
                Source
              </Typography>

              <Typography variant="body1">{props.busList.source}</Typography>
            </Box>
            <Box sx={{ width: "40%" }}>
              <Typography variant="body1" display="inline">
                {"Destination: "}
              </Typography>
              <Typography variant="body1" display="inline">
                {props.busList.destination}
              </Typography>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body1" display="inline">
                Capacity
              </Typography>
              <Typography variant="body1">{props.busList.capacity}</Typography>
            </Box>
            <Box sx={{ width: "40%" }}>
              <Typography variant="body1" display="inline">
                Date of journey
              </Typography>
              <Typography variant="body1">{props.date}</Typography>
            </Box>
            
            <Box sx={{ width: "40%" }}>
              <Link to="/busseats">
                <Button onClick={busListHandler}>
                  <BookOnlineIcon />
                </Button>
              </Link>
            </Box>
          </Box>
        </Paper>
      </div> */}
    </>
  );
};

export default BusList;






// import { Box, Button, Paper, Typography } from "@mui/material";
// import React from "react";
// import BookOnlineIcon from "@mui/icons-material/BookOnline";
// import { Link } from "react-router-dom";
// //import '.././App.css'

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
//               View Seats
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default BusList;








