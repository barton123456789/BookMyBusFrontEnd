import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BusList from "./BusList";
import axios from "axios";
import swal from "sweetalert";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Fab,
  Grid,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 20,
    paddingBottom: 20,
  },
}));

const BookingHistory = () => {
  const classes = useStyles();
  const [bookings, setBookings] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user_id")) || 1;
  useEffect(() => {
    axios
      .get(`http://localhost:8080/app/bookings/getBookByUser?user_id=${userId}`)
      .then((resp) => {
        console.log("Bookings of the user");
        console.log(resp.data);
        // console.log(resp.data[0])
        axios
          .all(
            resp.data.map((booking) =>
              axios.get(
                `http://localhost:8080/app/occu/getOccByBook?bookId=${booking.booking_id}`
              )
            )
          )
          .then((respArr) => {
            respArr = respArr.map((r) => r.data);
            console.log(respArr);
            let i = 0;
            let tempBookings = resp.data.map((booking) => ({
              ...booking,
              occupancies: respArr[i++],
            }));
            setBookings(tempBookings);
          });
      });
  }, []);

  const removeOccupant = (occId, bkId) => {
    axios
      .delete(`http://localhost:8080/app/occu/${occId}`)
      .then((resp) =>
        swal("Removed", "Occupant removed from booking", "success")
      );

    let curBooking = bookings.find((b) => b.booking_id == bkId);
    let newOccupancies = curBooking.occupancies.filter(
      (o) => o.occupancyid != occId
    );
    setBookings([
      ...bookings.map((booking) => ({
        ...booking,
        occupancies: newOccupancies,
      })),
    ]);
    if (newOccupancies.length == 0) {
      deleteBooking(bkId);
    }
  };

  const deleteBooking = (bkId) => {
    // check this url
    axios
      .delete(`http://localhost:8080/app/bookings/${bkId}`)
      .then((resp) => swal("Delete", "Booking has been deleted", "success"));

    setBookings(bookings.filter((b) => b.booking_id != bkId));
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }} pb={3}>
        <AppBar position="static" style={{ background: "#0F3557" }}>
          <Toolbar align="right">
            <Typography variant="h5" style={{ color: "white" }}>
              BookMyBus.com
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography variant="h4" align="center">
        Booking History
      </Typography>

      {bookings &&
        bookings.map((booking) => (
          <div>
            {/* {JSON.stringify(booking)} */}

            {booking.occupancies.map((occupant) => (
              <div>
                <Container className={classes.root}>
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item sm={2}>
                        <Box>
                          <CardContent>
                            <Typography variant="h6">Booking ID</Typography>
                            <Typography variant="subtitle1">
                              {occupant.occupancyid}
                            </Typography>
                          </CardContent>
                          <CardContent>
                            <Typography variant="h6">PNR Number</Typography>
                            <Typography variant="subtitle1">
                              {booking.booking_id}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Grid>
                      <Grid item sm={2}>
                        <Box>
                          <CardContent>
                            <Typography variant="h6">No Of Tickets</Typography>
                            <Typography variant="subtitle1">
                              {booking.count}
                            </Typography>
                          </CardContent>
                          <CardContent>
                            <Typography variant="h6">Traveller</Typography>
                            <Typography variant="subtitle1">
                              {occupant.passenger_name}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Grid>
                      <Grid item sm={2}>
                        <Box>
                          <CardContent>
                            <Typography variant="h6">Seat Number</Typography>
                            <Typography variant="subtitle1">
                              {occupant.seat_no}
                            </Typography>
                          </CardContent>
                          <CardContent>
                            <Typography variant="h6">Passenger Age </Typography>
                            <Typography variant="subtitle1">
                              {occupant.passenger_age}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Grid>
                      <Grid item sm={3}>
                        <Box>
                          <CardContent>
                            <Typography variant="h6">Source</Typography>
                            <Typography variant="subtitle1">
                              {booking.trip_source}
                            </Typography>
                          </CardContent>
                          <CardContent>
                            <Typography variant="h5">Destination</Typography>
                            <Typography variant="subtitle1">
                              {booking.trip_destination}
                            </Typography>
                          </CardContent>
                        </Box>
                      </Grid>
                      {/* <Grid item sm={3}>
<Box>
<CardContent>
<Typography variant="h5">Passenger Name</Typography>
<Typography variant="subtitle1">{bus.capacity}</Typography>
</CardContent>
<CardContent>
<Typography variant="h5">Date Of Journey</Typography>
<Typography variant="subtitle1">{dates.journey_date}</Typography>
</CardContent>
</Box>
</Grid> */}

                      <Grid item sm={2}>
                        <Box>
                          <CardActions>
                            <Fab
                              onClick={() =>
                                removeOccupant(
                                  occupant.occupancyid,
                                  booking.booking_id
                                )
                              }
                              variant="extended"
                              style={{ background: "#0F3557", color: "white" }}
                            >
                              Cancel Part Booking
                            </Fab>
                          </CardActions>
                          <CardActions>
                            <Fab
                              onClick={() => deleteBooking(booking.booking_id)}
                              variant="extended"
                              style={{ background: "#0F3557", color: "white" }}
                            >
                              Cancel Booking
                            </Fab>
                          </CardActions>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Container>
                {/* {occupant.passenger_name} */}
                {/* {occupant.passenger_gender} */}
                {/* {occupant.seat_no} */}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default BookingHistory;

// import { AppBar, Box, Toolbar } from '@mui/material';
// import React, { useEffect, useState } from 'react'
// import BusList from './BusList';
// import axios from 'axios'
// import swal from 'sweetalert';

// const BookingHistory = () => {
//     const [bookings,setBookings]=useState([])
//     const userId=JSON.parse(localStorage.getItem('user'))?.id||1
//     useEffect(()=>{
//         axios.get(`http://localhost:8080/app/bookings/getBookByUser?user_id=${userId}`)
//             .then(resp=>{

//                 console.log("Bookings of the user")
//                 console.log(resp.data)
//                 // console.log(resp.data[0])
//                 axios.all(resp.data.map(booking=>
//                     axios.get(`http://localhost:8080/app/occu/getOccByBook?bookId=${booking.booking_id}`)
//                 ))
//                 .then(respArr=>{
//                     respArr=respArr.map(r=>r.data)
//                     console.log(respArr)
//                     let i=0
//                     let tempBookings=resp.data.map(booking=>({
//                         ...booking,
//                         "occupancies":respArr[i++]
//                     }))
//                     setBookings(tempBookings)
//                 })
//             })
//     },[])

//     const removeOccupant=(occId)=>{
//         axios.delete(`http://localhost:8080/app/occu/${occId}`)
//         .then(resp=>swal("Removed","Occupant removed from booking","success"))
//     }

//     const deleteBooking=(bkId)=>{
//         // check this url
//         axios.delete(`http://localhost:8080/app/bookings/${bkId}`)
//         .then(resp=>swal("Delete","Booking has been deleted","success"))
//     }

//     return (
//         <div>
//             Booking History
//             {bookings&&bookings.map(booking=><div>
//                 {JSON.stringify(booking)}
//                 occupants:
//                 {booking.occupancies.map(occupant=><div>
//                     {occupant.passenger_name}
//                     {occupant.passenger_gender}
//                     {occupant.seat_no}
//                     remove occupancy:<button
//                     onClick={()=>removeOccupant(occupant.occupancyid)}>
//                         {occupant.occupancyid}</button>
//                     </div>)}
//                 delete booking:
//                 <button onClick={()=>deleteBooking(booking.booking_id)}>delete</button>
//             </div>)}
//         </div>
//     )
// }

// export default BookingHistory;
