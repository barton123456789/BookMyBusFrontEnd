import React, { useEffect } from "react";
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
import { useState } from "react";
import { NumbersSharp, SearchOffSharp } from "@mui/icons-material";
import BusSeats from "../Pages/BusSeats";
import axios from "axios";
import swal from "sweetalert";
import CircularProgress from "@mui/material/CircularProgress";
import { Navigate, useNavigate } from "react-router-dom";
import AltRouteIcon from "@mui/icons-material/AltRoute";

function FinalAmount(props) {
  const getPassengerData = props.getPassengerData;
  const [date, setDate] = React.useState("");
  const [totalAmt,setTotal]=React.useState(0)
  const [destDist,setDist]=React.useState(1)
  let navigate = useNavigate();

  const header = {
    mode: "cors",

    headers: {
      "Access-Control-Allow-Origin": "*",

      "Content-Type": "application/json",
    },

    method: "POST",
  };

  let bkDate = new Date()
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    // .reverse()
    .join("-");

  let p = getPassengerData();

  useEffect(()=>{
    let p = getPassengerData();
    console.log("Passnegrr change update called")
    console.log(JSON.stringify(p))
    setTotal(p.bus.fare * p.passengers.length*destDist)
  },[props.passengers])

  useEffect(()=>{
    setTotal(p.bus.fare * p.passengers.length*destDist)
    axios.get("http://localhost:8080/app/route/")
    .then(resp=>{
      console.log(resp.data)
      let route=resp.data.find(r=>r.loc_name==p.bus.destination)
      setDist(route.distance)
      console.log("distance is"+route.distance)
    })
  },[])

  console.log("localStoreage: " + localStorage);
  let source = localStorage.getItem("source");
  let destination = localStorage.getItem("destination");
  let user_id = localStorage.getItem("user_id");
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const bookNowHandler = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "rzp_test_BGQ8p6ZEdsHPR1",
      currency: "INR",
      amount: amount * 100,
      name: "BookMybus.com",
      description: "Thanks for Booking , We Would like to serve you again",
      // image:
      //   "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        swal("Payment Successfull", " ", "success");
        console.log({
          bus_id: p.bus.bus_id,
          count: p.passengers.length,
          total_fare: p.bus.fare * p.passengers.length,
          booking_date: bkDate,
          journey_date: localStorage.getItem("date"),
          booking_status: "confirmed",
          trip_source: p.bus.source,
          trip_destination: p.bus.destination,
          user_id: user_id,
        });
        console.log(p.passengers[0]);
        // console.log(p.passengers[1]);
        axios
          .post("http://localhost:8080/app/bookings/", {
            bus_id: p.bus.bus_id,
            count: p.passengers.length,
            total_fare: p.bus.fare * p.passengers.length,
            booking_date: bkDate,
            journey_date: localStorage.getItem("date"),
            booking_status: "confirmed",
            trip_source: source,
            trip_destination: destination,
            user_id: user_id,
          })
          .then((response) => {
            console.log(response.data);
            if (p && p.passengers)
              p.passengers.forEach((passenger) => {
                console.log(passenger);
                axios
                  .post(
                    "http://localhost:8080/app/occu/",
                    {
                      seat_no: passenger.seat_no,
                      passenger_name: passenger.passenger_name,
                      passenger_age: passenger.age,
                      passenger_gender: passenger.gender,
                      booking_id: response.data.booking_id,
                    },
                    { headers: { "Access-Control-Allow-Origin": "*" } }
                  )
                  .then((response) => {
                    console.log(response.data);

                    {
                      const element = document.querySelector(
                        "#delete-request-error-handling .status"
                      );
                      axios
                        .delete("http://localhost:8080/app/concurrency/389")
                        .then(
                          (response) => (element.innerHTML = "Delete successful")
                        )
                        .catch((error) => {
                          element.parentElement.innerHTML = `Error: ${error.message}`;
                          console.error("There was an error!", error);
                        });
                    }

                    swal(
                      "Congratulations!!",
                      "Your booking has been confirmed. Check the email for details",
                      "success"
                    );
                    navigate("/master");
                  });
              });
            console.log(p.passengers);
            // for (let passenger in p.passengers) {
            //   console.log(passenger);
            //   axios.post("http://localhost:8080/app/occu/", {
            //     seat_no: passenger.seat_no,
            //     passenger_name: passenger.name,
            //     passenger_age: passenger.age,
            //     passenger_gender: passenger.gender,
            //     booking_id:response.data.booking_id,
            //   }, {headers: {"Access-Control-Allow-Origin": "*"} })
            //   .then((response) => {
            //     console.log(response.data);
            //   })
            // }
          });
      },
      prefill: {
        name: "BookMyBus.com",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // let bkDate = new Date()
    //   .toISOString()
    //   .replace(/T.*/, "")
    //   .split("-")
    //   // .reverse()
    //   .join("-");

    // let p = getPassengerData();
    // console.log("localStoreage: " + localStorage);
    // let source = localStorage.getItem("source");
    // let destination = localStorage.getItem("destination");
    // let user_id = localStorage.getItem("user_id");
    // const tempDate = localStorage.getItem("date");
    // setDate(tempDate);
    // console.log("date: " + date);
    // console.log({
    //   bus_id: p.bus.bus_id,
    //   count: p.passengers.length,
    //   total_fare: p.bus.fare * p.passengers.length,
    //   booking_date: bkDate,
    //   journey_date: localStorage.getItem("date"),
    //   booking_status: "confirmed",
    //   trip_source: p.bus.source,
    //   trip_destination: p.bus.destination,
    //   user_id:user_id
    // });
    // console.log(p.passengers[0]);
    // // console.log(p.passengers[1]);
    // axios
    //   .post("http://localhost:8080/app/bookings/", {
    //     bus_id: p.bus.bus_id,
    //     count: p.passengers.length,
    //     total_fare: p.bus.fare * p.passengers.length,
    //     booking_date: bkDate,
    //     journey_date: localStorage.getItem("date"),
    //     booking_status: "confirmed",
    //     trip_source: source,
    //     trip_destination: destination,
    //     user_id: user_id,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     if (p && p.passengers)
    //       p.passengers.forEach((passenger) => {
    //         console.log(passenger);
    //         axios
    //           .post(
    //             "http://localhost:8080/app/occu/",
    //             {
    //               seat_no: passenger.seat_no,
    //               passenger_name: passenger.passenger_name,
    //               passenger_age: passenger.age,
    //               passenger_gender: passenger.gender,
    //               booking_id: response.data.booking_id,
    //             },
    //             { headers: { "Access-Control-Allow-Origin": "*" } }
    //           )
    //           .then((response) => {
    //             console.log(response.data);

    //             {
    //               const element = document.querySelector(
    //                 "#delete-request-error-handling .status"
    //               );
    //               axios
    //                 .delete("http://localhost:8080/app/concurrency/389")
    //                 .then(
    //                   (response) => (element.innerHTML = "Delete successful")
    //                 )
    //                 .catch((error) => {
    //                   element.parentElement.innerHTML = `Error: ${error.message}`;
    //                   console.error("There was an error!", error);
    //                 });
    //             }

    //             swal(
    //               "Congratulations!!",
    //               "Your booking has been confirmed. Check the email for details",
    //               "success"
    //             );
    //             navigate("/master");
    //           });
    //       });
    //     console.log(p.passengers);
    //     // for (let passenger in p.passengers) {
    //     //   console.log(passenger);
    //     //   axios.post("http://localhost:8080/app/occu/", {
    //     //     seat_no: passenger.seat_no,
    //     //     passenger_name: passenger.name,
    //     //     passenger_age: passenger.age,
    //     //     passenger_gender: passenger.gender,
    //     //     booking_id:response.data.booking_id,
    //     //   }, {headers: {"Access-Control-Allow-Origin": "*"} })
    //     //   .then((response) => {
    //     //     console.log(response.data);
    //     //   })
    //     // }
    //   });
  };
  //

  //     // bus_id, src, dest, user_id, journey_date, now(), #passengers, totaol_fare
  //     // call POST API for booking --> response --> booking_id
  //     // var booking_id = response.booking_id
  //     /*
  //         for ( #passengers ){
  //             // age, name, seat_no, gender, booking_id
  //             // call POST API for occupancy
  //         }

  //         // change stats of booking with id = booking_id as Booked
  //     */
  //

  return (
    <>
      <Paper elevation={3} style={{ margin: "10px" }}>
        <Grid container spacing={2} style={{ margin: "1px" }}>
          <BottomNavigation>
            <h3>Total Amount: {totalAmt}</h3>
            <Box m={1} display="flex" justifyContent="right" alignItems="right">
              <Link to="/ticket">
                {/* onClick */}
                <Fab
                  onClick={() =>
                    bookNowHandler(p.bus.fare * p.passengers.length*destDist)
                  }
                  variant="extended"
                  style={{ background: "#0F3557", color: "white" }}
                >
                  Book Now
                </Fab>
              </Link>
            </Box>
          </BottomNavigation>
        </Grid>
      </Paper>
    </>
  );
}

export default FinalAmount









// import React, { useEffect } from "react";
// import {
//   BottomNavigation,
//   BottomNavigationAction,
//   Box,
//   Button,
//   Container,
//   Fab,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Grid,
//   Link,
//   Paper,
//   Radio,
//   RadioGroup,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import { NumbersSharp, SearchOffSharp } from "@mui/icons-material";
// import BusSeats from "../Pages/BusSeats";
// import axios from "axios";
// import swal from "sweetalert";
// import CircularProgress from "@mui/material/CircularProgress";
// import { Navigate, useNavigate } from "react-router-dom";
// import AltRouteIcon from "@mui/icons-material/AltRoute";

// function FinalAmount(props) {
//   const getPassengerData = props.getPassengerData;
//   const [date, setDate] = React.useState("");
//   let navigate = useNavigate();

//   const header = {
//     mode: "cors",

//     headers: {
//       "Access-Control-Allow-Origin": "*",

//       "Content-Type": "application/json",
//     },

//     method: "POST",
//   };

//   let bkDate = new Date()
//     .toISOString()
//     .replace(/T.*/, "")
//     .split("-")
//     // .reverse()
//     .join("-");

//   let p = getPassengerData();
//   console.log("localStoreage: " + localStorage);
//   let source = localStorage.getItem("source");
//   let destination = localStorage.getItem("destination");
//   let user_id = localStorage.getItem("user_id");
  
//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;

//       script.onload = () => {
//         resolve(true);
//       };

//       script.onerror = () => {
//         resolve(false);
//       };

//       document.body.appendChild(script);
//     });
//   };
//   const bookNowHandler = async (amount) => {
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     if (!res) {
//       alert("You are offline... Failed to load Razorpay SDK");
//       return;
//     }

//     const options = {
//       key: "rzp_test_BGQ8p6ZEdsHPR1",
//       currency: "INR",
//       amount: amount * 100,
//       name: "BookMybus.com",
//       description: "Thanks for Booking , We Would like to serve you again",
//       // image:
//       //   "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

//       handler: function (response) {
//         alert(response.razorpay_payment_id);
//         swal("Payment Successfull", " ", "success");
//         console.log({
//           bus_id: p.bus.bus_id,
//           count: p.passengers.length,
//           total_fare: p.bus.fare * p.passengers.length,
//           booking_date: bkDate,
//           journey_date: localStorage.getItem("date"),
//           booking_status: "confirmed",
//           trip_source: p.bus.source,
//           trip_destination: p.bus.destination,
//           user_id: user_id,
//         });
//         console.log(p.passengers[0]);
//         // console.log(p.passengers[1]);
//         axios
//           .post("http://localhost:8080/app/bookings/", {
//             bus_id: p.bus.bus_id,
//             count: p.passengers.length,
//             total_fare: p.bus.fare * p.passengers.length,
//             booking_date: bkDate,
//             journey_date: localStorage.getItem("date"),
//             booking_status: "confirmed",
//             trip_source: source,
//             trip_destination: destination,
//             user_id: user_id,
//           })
//           .then((response) => {
//             console.log(response.data);
//             if (p && p.passengers)
//               p.passengers.forEach((passenger) => {
//                 console.log(passenger);
//                 axios
//                   .post(
//                     "http://localhost:8080/app/occu/",
//                     {
//                       seat_no: passenger.seat_no,
//                       passenger_name: passenger.passenger_name,
//                       passenger_age: passenger.passenger_age,
//                       passenger_gender: passenger.gender,
//                       booking_id: response.data.booking_id,
//                     },
//                     { headers: { "Access-Control-Allow-Origin": "*" } }
//                   )
//                   .then((response) => {
//                     console.log(response.data);

//                     // {
//                     //   const element = document.querySelector(
//                     //     "#delete-request-error-handling .status"
//                     //   );
//                     //   axios
//                     //     .delete("http://localhost:8080/app/concurrency/389")
//                     //     .then(
//                     //       (response) => (element.innerHTML = "Delete successful")
//                     //     )
//                     //     .catch((error) => {
//                     //       element.parentElement.innerHTML = `Error: ${error.message}`;
//                     //       console.error("There was an error!", error);
//                     //     });
//                     // }

//                     swal(
//                       "Congratulations!!",
//                       "Your booking has been confirmed. Check the email for details",
//                       "success"
//                     );
//                     navigate("/master");
//                   });
//               });
//             console.log(p.passengers);
//             // for (let passenger in p.passengers) {
//             //   console.log(passenger);
//             //   axios.post("http://localhost:8080/app/occu/", {
//             //     seat_no: passenger.seat_no,
//             //     passenger_name: passenger.name,
//             //     passenger_age: passenger.age,
//             //     passenger_gender: passenger.gender,
//             //     booking_id:response.data.booking_id,
//             //   }, {headers: {"Access-Control-Allow-Origin": "*"} })
//             //   .then((response) => {
//             //     console.log(response.data);
//             //   })
//             // }
//           });
//       },
//       prefill: {
//         name: "BookMyBus.com",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();

//     // let bkDate = new Date()
//     //   .toISOString()
//     //   .replace(/T.*/, "")
//     //   .split("-")
//     //   // .reverse()
//     //   .join("-");

//     // let p = getPassengerData();
//     // console.log("localStoreage: " + localStorage);
//     // let source = localStorage.getItem("source");
//     // let destination = localStorage.getItem("destination");
//     // let user_id = localStorage.getItem("user_id");
//     // const tempDate = localStorage.getItem("date");
//     // setDate(tempDate);
//     // console.log("date: " + date);
//     // console.log({
//     //   bus_id: p.bus.bus_id,
//     //   count: p.passengers.length,
//     //   total_fare: p.bus.fare * p.passengers.length,
//     //   booking_date: bkDate,
//     //   journey_date: localStorage.getItem("date"),
//     //   booking_status: "confirmed",
//     //   trip_source: p.bus.source,
//     //   trip_destination: p.bus.destination,
//     //   user_id:user_id
//     // });
//     // console.log(p.passengers[0]);
//     // // console.log(p.passengers[1]);
//     // axios
//     //   .post("http://localhost:8080/app/bookings/", {
//     //     bus_id: p.bus.bus_id,
//     //     count: p.passengers.length,
//     //     total_fare: p.bus.fare * p.passengers.length,
//     //     booking_date: bkDate,
//     //     journey_date: localStorage.getItem("date"),
//     //     booking_status: "confirmed",
//     //     trip_source: source,
//     //     trip_destination: destination,
//     //     user_id: user_id,
//     //   })
//     //   .then((response) => {
//     //     console.log(response.data);
//     //     if (p && p.passengers)
//     //       p.passengers.forEach((passenger) => {
//     //         console.log(passenger);
//     //         axios
//     //           .post(
//     //             "http://localhost:8080/app/occu/",
//     //             {
//     //               seat_no: passenger.seat_no,
//     //               passenger_name: passenger.passenger_name,
//     //               passenger_age: passenger.age,
//     //               passenger_gender: passenger.gender,
//     //               booking_id: response.data.booking_id,
//     //             },
//     //             { headers: { "Access-Control-Allow-Origin": "*" } }
//     //           )
//     //           .then((response) => {
//     //             console.log(response.data);

//     //             {
//     //               const element = document.querySelector(
//     //                 "#delete-request-error-handling .status"
//     //               );
//     //               axios
//     //                 .delete("http://localhost:8080/app/concurrency/389")
//     //                 .then(
//     //                   (response) => (element.innerHTML = "Delete successful")
//     //                 )
//     //                 .catch((error) => {
//     //                   element.parentElement.innerHTML = `Error: ${error.message}`;
//     //                   console.error("There was an error!", error);
//     //                 });
//     //             }

//     //             swal(
//     //               "Congratulations!!",
//     //               "Your booking has been confirmed. Check the email for details",
//     //               "success"
//     //             );
//     //             navigate("/master");
//     //           });
//     //       });
//     //     console.log(p.passengers);
//     //     // for (let passenger in p.passengers) {
//     //     //   console.log(passenger);
//     //     //   axios.post("http://localhost:8080/app/occu/", {
//     //     //     seat_no: passenger.seat_no,
//     //     //     passenger_name: passenger.name,
//     //     //     passenger_age: passenger.age,
//     //     //     passenger_gender: passenger.gender,
//     //     //     booking_id:response.data.booking_id,
//     //     //   }, {headers: {"Access-Control-Allow-Origin": "*"} })
//     //     //   .then((response) => {
//     //     //     console.log(response.data);
//     //     //   })
//     //     // }
//     //   });
//   };
//   //

//   //     // bus_id, src, dest, user_id, journey_date, now(), #passengers, totaol_fare
//   //     // call POST API for booking --> response --> booking_id
//   //     // var booking_id = response.booking_id
//   //     /*
//   //         for ( #passengers ){
//   //             // age, name, seat_no, gender, booking_id
//   //             // call POST API for occupancy
//   //         }

//   //         // change stats of booking with id = booking_id as Booked
//   //     */
//   //

//   return (
//     <>
//       <Paper elevation={3} style={{ margin: "10px" }}>
//         <Grid container spacing={2} style={{ margin: "1px" }}>
//           <BottomNavigation>
//             <h3>Total Amount: {2200}</h3>
//             <Box m={1} display="flex" justifyContent="right" alignItems="right">
//               <Link to="/ticket">
//                 {/* onClick */}
//                 <Fab
//                   onClick={() =>
//                     bookNowHandler(p.bus.fare * p.passengers.length)
//                   }
//                   variant="extended"
//                   style={{ background: "#0F3557", color: "white" }}
//                 >
//                   Book Now
//                 </Fab>
//               </Link>
//             </Box>
//           </BottomNavigation>
//         </Grid>
//       </Paper>
//     </>
//   );
// }

// export default FinalAmount;
