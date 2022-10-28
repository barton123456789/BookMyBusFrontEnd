import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle, ContactPhone } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export default function Passenger(props) {
  const [passenger, setPassenger] = useState({});
 const s=props.seatNo;
  // const [passengerList,setPassengeList]= usestate([]);
  useEffect(() => {


    localStorage.setItem("passenger", JSON.stringify(passenger));
  });

  const onSubmitForm = () => {
    console.log(passenger);
    props.onNewPassenger(passenger);
  };
  return (
    <div>
      <Typography variant="h6" align="center">
      
      <PermIdentityIcon/>
        Passenger Information
     

   
    </Typography>
   
      <Paper elevation={3} style={{ margin: "10px" }}>
        <Grid container spacing={2} style={{ margin: "10px" }}>
          <Typography variant="h6">
            <AccountCircle sx={{ fontSize: 30, marginTop: "10px" }} /> Passenger
            | Seat No {props.seatNo + 1}
          </Typography>
          <Grid item xs={12} style={{ margin: "10px" }}>
            {/* <form onSubmit={oncreateDetail}> */}
            {/* <form> */}
            <TextField
              type="string"
              label="name"
              required
              variant="outlined"
              // onChange={(e)=> setName(e.target.value)}
              style={{ width: 250 }}
              
              onChange={(e) => {
                setPassenger({ ...passenger, passenger_name: e.target.value });
              }}
            />
            {/* </form> */}
          </Grid>
          <Grid item xs={12} style={{ margin: "10px" }}>
            {/* <form > */}
            <TextField
              type="string"
              label="Age"
              required
              variant="outlined"
              onChange={(e) => {
                setPassenger({ ...passenger, age: e.target.value });
                setPassenger({ ...passenger, seat_no: props.seatNo });
              }}
              style={{ width: 250 }}
            />
            {/* </form> */}
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                name="gender"
                onChange={(e) => {
                  setPassenger({ ...passenger, gender: e.target.value });
                }}
              >
                <FormControlLabel
                  key="male"
                  value="male"
                  control={<Radio size="small" />}
                  label="Male"
                />
                <FormControlLabel
                  key="female"
                  value="female"
                  control={<Radio size="small" />}
                  label="Female"
                />
                <FormControlLabel
                  key="other"
                  value="other"
                  control={<Radio size="small" />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* </Grid> */}
          {/* </Paper> */}

          {/* <Paper elevation={3} style={{margin:'10px'}}>
			<Grid container spacing={2} style={{margin:'1px'}}>
					<Typography variant="h6"><ContactPhone sx={{ fontSize: 30, marginTop: '1px' }} /> Contact Informtion</Typography>
						<Grid item xs={12} style={{margin:'10px'}}>
							<form> */}
          <Grid item xs={12} style={{ margin: "10px" }}>
            <TextField
              type="string"
              label="email"
              variant="outlined"
              color="success"
              style={{ width: 300 }}
            />
          </Grid>

          {/* </form> */}
          {/* </Grid> */}

          <Grid item xs={12} style={{ margin: "10px" }}>
            {/* <form> */}
            <TextField
              type="number"
              label="Phone"
              variant="outlined"
              color="success"
              style={{ width: 300 }}
            />
            {/* </form> */}
          </Grid>
          <Grid>
          <Fab color="white" onClick={onSubmitForm} variant="extended" style={{ background: "#0F3557" ,color:"white"}} >Save</Fab>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
