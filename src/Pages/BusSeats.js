import { useEffect, useState } from "react";
import { IconButton, Drawer, Typography } from "@mui/material";
import SeatIcon from "../Assets/SeatIcon";
import SteerWheel from "../Assets/SteerWheel.png";
import FinalAmount from "../components/FinalAmount";
import React from "react";
import Passenger from "./Passenger.js";
import axios from "axios";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Stack from "@mui/material/Stack";
import "../components/SearchBus/SearchBus.css";
import "bootstrap/dist/css/bootstrap.min.css";
import siteBckImg from "../Assets/siteBckImg.jpg";
import swal from "sweetalert";
export default function BusSeats() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [seatData, setSeatData] = useState(Array(24).fill(""));
  const [passenger, setPassenger] = useState([]);
  const [bus, setBus] = useState(JSON.parse(localStorage.getItem("bus")));
  // const [source, setSource] = useState(JSON.parse(localStorage.getItem("source")));
  // const [destination, setDestination] = useState(JSON.parse(localStorage.getItem("destination")));
  // hold the passenger data here.....lifting the state
  const [passengerData, setPassengerData] = useState([]);
  // let [conSeatList.current, setConList] = useState([]);
  let conSeatList = React.useRef([]);
  const timeOut = 60000;
  const userId = localStorage.getItem("user_id");
  console.log(userId);
  const onSeatSelected = (seatNo) => {
    let seatDetails = [...seatData];
    if (seatDetails[seatNo] === "") {
      console.log("Post payload");
      console.log({
        user_id: userId,
        bus_id: bus.bus_id,
        seat_no: seatNo,
        status: "progress",
        time: getCurTime(),
      });
      axios
        .post("http://localhost:8080/app/concurrency/", {
          user_id: userId,
          bus_id: bus.bus_id,
          seat_no: seatNo,
          status: "progress",
          time: getCurTime(),
          // comment below line !
          concurrency_id: seatNo,
          // schedule:'schedule'
        })
        .then(
          (response) => {
            console.log(response.data.conId);
            console.log("success");
            conSeatList.current.push({
              seatNo: seatNo,
              // check attrib
              conId: response.data.concurrency_id,
              timerId: setTimeout(() => {
                console.log("Expired");
                deleteConcurreny(seatNo, seatDetails);
              }, timeOut),
            });
            console.log(conSeatList.current);
          },
          (error) => {
            console.log(error);
            console.log("error");
          }
        );
      seatDetails[seatNo] = "green";
    } else {
      console.log(conSeatList.current);
      const conObj = conSeatList.current.find((c) => seatNo == c.seatNo);
      const conId = conObj.conId;
      clearTimeout(conObj.timerId);
      console.log(conId);
      axios
        .delete(`http://localhost:8080/app/concurrency/${conId}`)
        .then((response) => {
          // element.innerHTML = "Delete successful";
          // setConList([...conSeatList.current.filter((c) => seatNo != c.seatNo)]);
          conSeatList.current = conSeatList.current.filter(
            (c) => seatNo != c.seatNo
          );
        })
        .catch((error) => {
          // element.parentElement.innerHTML = `Error: ${error.message}`;
          console.error("There was an error!", error);
        });
      seatDetails[seatNo] = "";
      // seatDetails = deleteConcurreny(seatNo, seatDetails);
    }
    setSeatData(seatDetails);
    console.log(bus, "bus");
  };
  const deleteConcurreny = (seatNo, seatDetails) => {
    // const element = document.querySelector(
    // "#delete-request-error-handling .status"
    // );
    console.log("seat list just before");
    console.log(conSeatList.current);
    let conObj = conSeatList.current.find((c) => c.seatNo == seatNo);
    console.log(conObj);
    if (conObj) {
      console.log("In here");
      // const conId = conSeatList.current.find((c) => seatNo == c.seatNo).conId;
      const conId = conObj.conId;
      console.log(conId);
      clearTimeout(conObj.timerId);
      axios
        .delete(`http://localhost:8080/app/concurrency/${conId}`)
        .then((response) => {
          // element.innerHTML = "Delete successful";
          // setConList([...conSeatList.current.filter((c) => seatNo != c.seatNo)]);
          conSeatList.current = conSeatList.current.filter(
            (c) => seatNo != c.seatNo
          );
        })
        .catch((error) => {
          // element.parentElement.innerHTML = `Error: ${error.message}`;
          console.error("There was an error!", error);
        });
      seatDetails[seatNo] = "";
    }
    return seatDetails;
  };
  const getCurTime = () => {
    return new Date().toLocaleTimeString().split(" ")[0];
  };
  const handleAddPassenger = (passenger) => {
    setPassengerData([...passengerData, passenger]);
    console.log(passengerData);
    console.log("added!");
  };
  // const [disableSeats,setDisableSeats]=useState([])
  const disableSeats = (seatNoList) => {
    console.log(seatNoList);
    let seatDetails = [...seatData];
    seatNoList?.forEach((seatNo) => {
      seatDetails[seatNo] = "red";
      console.log(seatNo);
    });
    setSeatData(seatDetails);
  };
  useEffect(() => {
    const bus = JSON.parse(localStorage.getItem("bus"));
    if (bus) {
      setBus(bus);
    }
  }, []);
  const submitHandler = () => {
    setPassenger(JSON.parse(localStorage.getItem("passenger")));
    console.log(passenger);
  };
  const fetchDisabledSeats = async () => {
    console.log({
      params: {
        bus: bus.bus_id,
        date: localStorage.getItem("date"),
        src: localStorage.getItem("source"),
        dest: localStorage.getItem("destination"),
      },
    });
    let resp = await axios
      .get(
        `http://localhost:8080/app/bookings/getByBusIdAndDateAndSrcAndDest`,
        {
          params: {
            bus: bus.bus_id,
            date: localStorage.getItem("date"),
            src: localStorage.getItem("source"),
            dest: localStorage.getItem("destination"),
          },
        }
      )
      .then((resp) => {
        console.log("disabled seats " + resp.data);
        disableSeats(resp.data);
        // console.log(disableSeats)
      });
  };
  // backend call, create disabledSeatsList and call disableSeats(disabledSeatsList)
  useEffect(() => {
    // let disabledSeatLists = [19, 22];
    // let content=<div>From {bus.source} To {bus.destination}</div>
    // window.changeNavContent(content)
    fetchDisabledSeats();
    // journeydate, busid --> list of unavaliable seats
    // disableSeats(disabledSeatLists);
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }} pb={3}>
        <AppBar position="static" style={{ background: "#0F3557" }}>
          <Toolbar align="right">
            <Typography variant="h5">BookMyBus.com</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div
        class="bg_image"
        // style={{
        // backgroundImage: `url(${siteBckImg})`,
        // backgroundSize: "cover",
        // }}
      >
        <div
          style={{
            width: "300px",
            marginLeft: "10%",
            //marginTop:"0.5%",
            // backgroundColor:"grey",
            borderRadius: "30px",
            //paddingBottom:"8px",
            paddingTop: "25px",
            border: "1px solid grey",
          }}
          className="glassdiv"
        >
          <Stack>
            <Box>
              <img
                src={SteerWheel}
                style={{ height: "40px", width: "40px", marginLeft: "68%" }}
              />
            </Box>
            <Box sx={{ marginLeft: "15%" }}>
              {seatData.map((seat, index) => (
                <IconButton
                  sx={{ marginRight: index % 3 == 0 ? "10%" : "0%" }}
                  name={index + 1}
                  key={index + 1}
                  onClick={() => {
                    onSeatSelected(index);
                  }}
                >
                  <SeatIcon fill={seat} />
                </IconButton>
              ))}
            </Box>
          </Stack>
        </div>
        <br />
        <Button
          onClick={() => setDrawerOpen(true)}
          variant="contained"
          //className="btn btn-primary col-md-12"
          style={{
            height: "40px",
            width: "300px",
            marginTop: "1px",
            marginLeft: "10%",
            background: "#0F3557",
          }}
        >
          Proceed to Book
        </Button>
        {/* <div className="legenddiv">
<div className="card pt-3 ps-5 pe-5 pb-3">
<div className="pb-3">
Seat Legend
</div>
<div className="pb-3">
<SeatIcon fill={""} /> Available
</div>
<div className="pb-3">
<SeatIcon fill={"red"} /> Booked
</div>
<div className="pb-3">
<SeatIcon fill={"green"} /> Selected
</div>
</div>
</div> */}
        {/* <button onClick={submitHandler}>Book</button> */}
        {drawerOpen && (
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box sx={{ width: "400px" }}>
              {seatData.map((seat, index) => {
                if (seat === "green") {
                  return (
                    <Passenger
                      seatNo={index}
                      key={index}
                      onNewPassenger={(passenger) =>
                        handleAddPassenger(passenger)
                      }
                    ></Passenger>
                  );
                }
              })}
            </Box>
            <FinalAmount
              getPassengerData={() => ({
                bus: bus,
                passengers: passengerData,
              })}
              passengers={passengerData}
            />
          </Drawer>
        )}
      </div>
    </>
  );
}
// import { useEffect, useState } from "react";
// import { IconButton, Drawer, Button } from "@mui/material";
// import SeatIcon from "../Assets/SeatIcon";
// import FinalAmount from "../components/FinalAmount";
// import React from 'react'
// import Passenger from "./Passenger.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
// //import {} from "@fortawesome/free-solid-svg-icons";
// export default function BusSeats() {
// const [drawerOpen, setDrawerOpen] = useState(false);
// const [seatData, setSeatData] = useState(Array(24).fill(""));
// const [passenger, setPassenger] = useState([]);
// const [bus, setBus] = useState(JSON.parse(localStorage.getItem("bus")));
// // hold the passenger data here.....lifting the state
// const [passengerData, setPassengerData] = useState([]);
// const onSeatSelected = (seatNo) => {
// let seatDetails = [...seatData];
// if (seatDetails[seatNo] === "") seatDetails[seatNo] = "green";
// else seatDetails[seatNo] = "";
// setSeatData(seatDetails);
// console.log(bus, "bus");
// };
// const handleAddPassenger = (passenger) => {
// setPassengerData([...passengerData, passenger]);
// console.log(passengerData);
// console.log("added!");
// };
// const disableSeats = (seatNoList) => {
// let seatDetails = [...seatData];
// seatNoList?.forEach((seatNo) => {
// seatDetails[seatNo] = "red";
// });
// setSeatData(seatDetails);
// };
// useEffect(() => {
// const bus = JSON.parse(localStorage.getItem("bus"));
// if (bus) {
// setBus(bus);
// }
// }, []);
// const submitHandler = () => {
// setPassenger(JSON.parse(localStorage.getItem("passenger")));
// console.log(passenger);
// };
// const fetchDisabledSeats=async ()=>{
// console.log({params:{
// bus:bus.bus_id,
// date:localStorage.getItem('date'),
// }})
// let resp=await axios.get('http://localhost:8080/app/bookings/bus/date?bus=24&date=2022-12-22',
// {params:{
// bus:bus.bus_id,
// date:localStorage.getItem('date'),
// }}).then(resp=>{
// disableSeats(resp.data)
// })
// }
// // backend call, create disabledSeatsList and call disableSeats(disabledSeatsList)
// useEffect(()=>{
// // let disabledSeatLists = [19, 22];
// fetchDisabledSeats()
// // journeydate, busid --> list of unavaliable seats
// // disableSeats(disabledSeatLists);
// },[]);
// return (
// <div>
// {seatData.map((seat, index) => (
// <IconButton
// name={index + 1}
// key={index + 1}
// onClick={() => {
// onSeatSelected(index);
// }}
// >
// <SeatIcon fill={seat} />
// </IconButton>
// ))}
// <br />
// <button onClick={() => setDrawerOpen(true)}>Proceed to Book</button>
// {/* <button onClick={submitHandler}>Book</button> */}
// {drawerOpen && (
// <Drawer
// anchor="right"
// open={drawerOpen}
// onClose={() => setDrawerOpen(false)}
// >
// <div style={{ width: "400px" }}>
// {seatData.map((seat, index) => {
// if (seat === "green") {
// return (
// <Passenger
// seatNo={index}
// key={index}
// onNewPassenger={(passenger) =>
// handleAddPassenger(passenger)
// }
// ></Passenger>
// );
// }
// })}
// </div>
// <FinalAmount
// getPassengerData={() => ({
// bus: bus,
// passengers: passengerData,
// })}
// />
// </Drawer>
// )}
// </div>
// );
// }
// export default function BusSeats() {
// const [drawerOpen, setDrawerOpen] = useState(false);
// const [seatData, setSeatData] = useState(Array(24).fill(""));
// const [passenger, setPassenger] = useState([]);
// const [bus, setBus] = useState(JSON.parse(localStorage.getItem("bus")));
// // hold the passenger data here.....lifting the state
// const [passengerData, setPassengerData] = useState([]);
// const onSeatSelected = (seatNo) => {
// let seatDetails = [...seatData];
// if (seatDetails[seatNo] === "") seatDetails[seatNo] = "green";
// else seatDetails[seatNo] = "";
// setSeatData(seatDetails);
// console.log(bus, "bus");
// };
// const handleAddPassenger = (passenger) => {
// setPassengerData([...passengerData, passenger]);
// console.log(passengerData);
// console.log("added!");
// };
// const disableSeats = (seatNoList) => {
// let seatDetails = [...seatData];
// seatNoList.forEach((seatNo) => {
// seatDetails[seatNo] = "red";
// });
// setSeatData(seatDetails);
// };
// useEffect(() => {
// const bus = JSON.parse(localStorage.getItem("bus"));
// if (bus) {
// setBus(bus);
// }
// }, []);
// const submitHandler = () => {
// setPassenger(JSON.parse(localStorage.getItem("passenger")));
// console.log(passenger);
// };
// // backend call, create disabledSeatsList and call disableSeats(disabledSeatsList)
// useEffect(() => {
// let disabledSeatLists = [19, 22];
// // journeydate, busid --> list of unavaliable seats
// disableSeats(disabledSeatLists);
// });
// return (
// <div>
// {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-steering-wheel" /> */}
// {seatData.map((seat, index) => (
// <IconButton
// name={index + 1}
// key={index + 1}
// onClick={() => {
// onSeatSelected(index);
// }}
// >
// <SeatIcon fill={seat} />
// </IconButton>
// ))}
// <br />
// <button onClick={() => setDrawerOpen(true)}>Proceed to Book</button>
// {/* <button onClick={submitHandler}>Book</button> */}
// {drawerOpen && (
// <Drawer
// anchor="right"
// open={drawerOpen}
// onClose={() => setDrawerOpen(false)}
// >
// <div style={{ width: "400px" }}>
// {seatData.map((seat, index) => {
// if (seat === "green") {
// return (
// <Passenger
// seatNo={index}
// key={index}
// onNewPassenger={(passenger) =>
// handleAddPassenger(passenger)
// }
// ></Passenger>
// );
// }
// })}
// </div>
// <FinalAmount
// getPassengerData={() => ({
// bus: bus,
// passengers: passengerData,
// })}
// />
// </Drawer>
// )}
// </div>
// );
// }

// import { useEffect, useState } from "react";
// import { IconButton, Drawer, Typography } from "@mui/material";
// import SeatIcon from "../Assets/SeatIcon";
// import SteerWheel from "../Assets/SteerWheel.png";
// import FinalAmount from "../components/FinalAmount";
// import React from "react";
// import Passenger from "./Passenger.js";
// import axios from "axios";
// import { AppBar, Box, Button, Toolbar } from "@mui/material";
// import Stack from "@mui/material/Stack";
// import "../components/SearchBus/SearchBus.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import siteBckImg from "../Assets/siteBckImg.jpg";
// import swal from "sweetalert";
// export default function BusSeats() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [seatData, setSeatData] = useState(Array(48).fill(""));
//   const [passenger, setPassenger] = useState([]);
//   const [bus, setBus] = useState(JSON.parse(localStorage.getItem("bus")));
//   // const [source, setSource] = useState(JSON.parse(localStorage.getItem("source")));
//   // const [destination, setDestination] = useState(JSON.parse(localStorage.getItem("destination")));
//   // hold the passenger data here.....lifting the state
//   const [passengerData, setPassengerData] = useState([]);
//   let [conSeatList, setConList] = useState([]);
//   const userId = localStorage.getItem("user_id");
//   console.log(userId);
//   const onSeatSelected = (seatNo) => {
//     let seatDetails = [...seatData];
//     if (seatDetails[seatNo] === "") {
//       console.log("Post payload");
//       console.log({
//         user_id: userId,
//         bus_id: bus.bus_id,
//         seat_no: seatNo,
//         status: "progress",
//         time: getCurTime(),
//       });
//       axios
//         .post("http://localhost:8080/app/concurrency/", {
//           user_id: userId,
//           bus_id: bus.bus_id,
//           seat_no: seatNo,
//           status: "progress",
//           time: getCurTime(),
//           // comment below line !

//           // schedule:'schedule'
//         })
//         .then(
//           (response) => {
//             console.log(response.data.conId);
//             console.log("success");
//             setConList([
//               ...conSeatList,
//               {
//                 seatNo: seatNo,
//                 // check attrib
//                 conId: response.data.concurrency_id,
//               },
//             ]);
//             console.log(conSeatList);
//           },
//           (error) => {
//             console.log(error);
//             console.log("error");
//           }
//         );
//       seatDetails[seatNo] = "green";
//     } else {
//       const element = document.querySelector(
//         "#delete-request-error-handling .status"
//       );
//       console.log(conSeatList);
//       const conId = conSeatList.find((c) => seatNo == c.seatNo).conId;
//       console.log(conId);
//       axios
//         .delete(`http://localhost:8080/app/concurrency/${conId}`)
//         .then((response) => {
//           element.innerHTML = "Delete successful";
//           setConList([...conSeatList.filter((c) => seatNo != c.seatNo)]);
//         })
//         .catch((error) => {
//           element.parentElement.innerHTML = `Error: ${error.message}`;
//           console.error("There was an error!", error);
//         });
//       seatDetails[seatNo] = "";
//     }
//     setSeatData(seatDetails);
//     console.log(bus, "bus");
//   };
//   const getCurTime = () => {
//     return new Date().toLocaleTimeString().split(" ")[0];
//   };
//   const handleAddPassenger = (passenger) => {
//     setPassengerData([...passengerData, passenger]);
//     console.log(passengerData);
//     console.log("added!");
//   };
//   // const [disableSeats,setDisableSeats]=useState([])
//   const disableSeats = (seatNoList) => {
//     console.log(seatNoList);
//     let seatDetails = [...seatData];
//     seatNoList?.forEach((seatNo) => {
//       seatDetails[seatNo - 1] = "red";
//       console.log(seatNo);
//     });
//     setSeatData(seatDetails);
//   };
//   useEffect(() => {
//     const bus = JSON.parse(localStorage.getItem("bus"));
//     if (bus) {
//       setBus(bus);
//     }
//   }, []);
//   const submitHandler = () => {
//     setPassenger(JSON.parse(localStorage.getItem("passenger")));
//     console.log(passenger);
//   };
//   const fetchDisabledSeats = async () => {
//     console.log({
//       params: {
//         bus: bus.bus_id,
//         date: localStorage.getItem("date"),
//         src: localStorage.getItem("source"),
//         dest: localStorage.getItem("destination"),
//       },
//     });
//     let resp = await axios
//       .get(
//         `http://localhost:8080/app/bookings/getByBusIdAndDateAndSrcAndDest`,
//         {
//           params: {
//             bus: bus.bus_id,
//             date: localStorage.getItem("date"),
//             src: localStorage.getItem("source"),
//             dest: localStorage.getItem("destination"),
//           },
//         }
//       )
//       .then((resp) => {
//         console.log("disabled seats " + resp.data);
//         disableSeats(resp.data);
//         // console.log(disableSeats)
//       });
//   };
//   // backend call, create disabledSeatsList and call disableSeats(disabledSeatsList)
//   useEffect(() => {
//     // let disabledSeatLists = [19, 22];
//     // let content=<div>From {bus.source} To {bus.destination}</div>
//     // window.changeNavContent(content)
//     fetchDisabledSeats();
//     // journeydate, busid --> list of unavaliable seats
//     // disableSeats(disabledSeatLists);
//   }, []);
//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }} pb={3}>
//         <AppBar position="static" style={{ background: "#0F3557" }}>
//           <Toolbar align="right">
//             <Typography variant="h4">BookMyBus.com</Typography>
//           </Toolbar>
//         </AppBar>
//       </Box>
//       <div
//         class="bg_image"
//         // style={{
//         // backgroundImage: `url(${siteBckImg})`,
//         // backgroundSize: "cover",
//         // }}
//       >
//         <div
//           style={{
//             width: "300px",
//             marginLeft: "10%",
//             //marginTop:"0.5%",
//             // backgroundColor:"grey",
//             borderRadius: "30px",
//             //paddingBottom:"8px",
//             paddingTop: "25px",
//             border: "1px solid grey",
//           }}
//           className="glassdiv"
//         >
//           <Stack>
//             <Box>
//               <img
//                 src={SteerWheel}
//                 style={{ height: "40px", width: "40px", marginLeft: "68%" }}
//               />
//             </Box>
//             <Box sx={{ marginLeft: "15%" }}>
//               {seatData.map((seat, index) => (
//                 <IconButton
//                   sx={{ marginRight: index % 3 == 0 ? "10%" : "0%" }}
//                   name={index + 1}
//                   key={index + 1}
//                   onClick={() => {
//                     onSeatSelected(index);
//                   }}
//                 >
//                   <SeatIcon fill={seat} />
//                 </IconButton>
//               ))}
//             </Box>
//           </Stack>
//         </div>
//         <br />
//         <Button
//           onClick={() => setDrawerOpen(true)}
//           variant="contained"
//           //className="btn btn-primary col-md-12"
//           style={{
//             height: "40px",
//             width: "300px",
//             marginTop: "1px",
//             marginLeft: "10%",
//             background: "#0F3557",
//           }}
//         >
//           Proceed to Book
//         </Button>
//         {/* <div className="legenddiv">
// <div className="card pt-3 ps-5 pe-5 pb-3">
// <div className="pb-3">
// Seat Legend
// </div>
// <div className="pb-3">
// <SeatIcon fill={""} /> Available
// </div>
// <div className="pb-3">
// <SeatIcon fill={"red"} /> Booked
// </div>
// <div className="pb-3">
// <SeatIcon fill={"green"} /> Selected
// </div>
// </div>
// </div> */}
//         {/* <button onClick={submitHandler}>Book</button> */}
//         {drawerOpen && (
//           <Drawer
//             anchor="right"
//             open={drawerOpen}
//             onClose={() => setDrawerOpen(false)}
//           >
//             <Box sx={{ width: "400px" }}>
//               {seatData.map((seat, index) => {
//                 if (seat === "green") {
//                   return (
//                     <Passenger
//                       seatNo={index}
//                       key={index}
//                       onNewPassenger={(passenger) =>
//                         handleAddPassenger(passenger)
//                       }
//                     ></Passenger>
//                   );
//                 }
//               })}
//             </Box>
//             <FinalAmount
//               getPassengerData={() => ({
//                 bus: bus,
//                 passengers: passengerData,
//               })}
//             />
//           </Drawer>
//         )}
//       </div>
//     </>
//   );
// }
// // import { useEffect, useState } from "react";
// // import { IconButton, Drawer, Button } from "@mui/material";
// // import SeatIcon from "../Assets/SeatIcon";
// // import FinalAmount from "../components/FinalAmount";
// // import React from 'react'
// // import Passenger from "./Passenger.js";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import axios from "axios";
// // //import {} from "@fortawesome/free-solid-svg-icons";
// // export default function BusSeats() {
// // const [drawerOpen, setDrawerOpen] = useState(false);
// // const [seatData, setSeatData] = useState(Array(24).fill(""));
// // const [passenger, setPassenger] = useState([]);
// // const [bus, setBus] = useState(JSON.parse(localStorage.getItem("bus")));
// // // hold the passenger data here.....lifting the state
// // const [passengerData, setPassengerData] = useState([]);
// // const onSeatSelected = (seatNo) => {
// // let seatDetails = [...seatData];
// // if (seatDetails[seatNo] === "") seatDetails[seatNo] = "green";
// // else seatDetails[seatNo] = "";
// // setSeatData(seatDetails);
// // console.log(bus, "bus");
// // };
// // const handleAddPassenger = (passenger) => {
// // setPassengerData([...passengerData, passenger]);
// // console.log(passengerData);
// // console.log("added!");
// // };
// // const disableSeats = (seatNoList) => {
// // let seatDetails = [...seatData];
// // seatNoList?.forEach((seatNo) => {
// // seatDetails[seatNo] = "red";
// // });
// // setSeatData(seatDetails);
// // };
// // useEffect(() => {
// // const bus = JSON.parse(localStorage.getItem("bus"));
// // if (bus) {
// // setBus(bus);
// // }
// // }, []);
// // const submitHandler = () => {
// // setPassenger(JSON.parse(localStorage.getItem("passenger")));
// // console.log(passenger);
// // };
// // const fetchDisabledSeats=async ()=>{
// // console.log({params:{
// // bus:bus.bus_id,
// // date:localStorage.getItem('date'),
// // }})
// // let resp=await axios.get('http://localhost:8080/app/bookings/bus/date?bus=24&date=2022-12-22',
// // {params:{
// // bus:bus.bus_id,
// // date:localStorage.getItem('date'),
// // }}).then(resp=>{
// // disableSeats(resp.data)
// // })
// // }
// // // backend call, create disabledSeatsList and call disableSeats(disabledSeatsList)
// // useEffect(()=>{
// // // let disabledSeatLists = [19, 22];
// // fetchDisabledSeats()
// // // journeydate, busid --> list of unavaliable seats
// // // disableSeats(disabledSeatLists);
// // },[]);
// // return (
// // <div>
// // {seatData.map((seat, index) => (
// // <IconButton
// // name={index + 1}
// // key={index + 1}
// // onClick={() => {
// // onSeatSelected(index);
// // }}
// // >
// // <SeatIcon fill={seat} />
// // </IconButton>
// // ))}
// // <br />
// // <button onClick={() => setDrawerOpen(true)}>Proceed to Book</button>
// // {/* <button onClick={submitHandler}>Book</button> */}
// // {drawerOpen && (
// // <Drawer
// // anchor="right"
// // open={drawerOpen}
// // onClose={() => setDrawerOpen(false)}
// // >
// // <div style={{ width: "400px" }}>
// // {seatData.map((seat, index) => {
// // if (seat === "green") {
// // return (
// // <Passenger
// // seatNo={index}
// // key={index}
// // onNewPassenger={(passenger) =>
// // handleAddPassenger(passenger)
// // }
// // ></Passenger>
// // );
// // }
// // })}
// // </div>
// // <FinalAmount
// // getPassengerData={() => ({
// // bus: bus,
// // passengers: passengerData,
// // })}
// // />
// // </Drawer>
// // )}
// // </div>
// // );
// // }
// // export default function BusSeats() {
// // const [drawerOpen, setDrawerOpen] = useState(false);
// // const [seatData, setSeatData] = useState(Array(24).fill(""));
// // const [passenger, setPassenger] = useState([]);
// // const [bus, setBus] = useState(JSON.parse(localStorage.getItem("bus")));
// // // hold the passenger data here.....lifting the state
// // const [passengerData, setPassengerData] = useState([]);
// // const onSeatSelected = (seatNo) => {
// // let seatDetails = [...seatData];
// // if (seatDetails[seatNo] === "") seatDetails[seatNo] = "green";
// // else seatDetails[seatNo] = "";
// // setSeatData(seatDetails);
// // console.log(bus, "bus");
// // };
// // const handleAddPassenger = (passenger) => {
// // setPassengerData([...passengerData, passenger]);
// // console.log(passengerData);
// // console.log("added!");
// // };
// // const disableSeats = (seatNoList) => {
// // let seatDetails = [...seatData];
// // seatNoList.forEach((seatNo) => {
// // seatDetails[seatNo] = "red";
// // });
// // setSeatData(seatDetails);
// // };
// // useEffect(() => {
// // const bus = JSON.parse(localStorage.getItem("bus"));
// // if (bus) {
// // setBus(bus);
// // }
// // }, []);
// // const submitHandler = () => {
// // setPassenger(JSON.parse(localStorage.getItem("passenger")));
// // console.log(passenger);
// // };
// // // backend call, create disabledSeatsList and call disableSeats(disabledSeatsList)
// // useEffect(() => {
// // let disabledSeatLists = [19, 22];
// // // journeydate, busid --> list of unavaliable seats
// // disableSeats(disabledSeatLists);
// // });
// // return (
// // <div>
// // {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-steering-wheel" /> */}
// // {seatData.map((seat, index) => (
// // <IconButton
// // name={index + 1}
// // key={index + 1}
// // onClick={() => {
// // onSeatSelected(index);
// // }}
// // >
// // <SeatIcon fill={seat} />
// // </IconButton>
// // ))}
// // <br />
// // <button onClick={() => setDrawerOpen(true)}>Proceed to Book</button>
// // {/* <button onClick={submitHandler}>Book</button> */}
// // {drawerOpen && (
// // <Drawer
// // anchor="right"
// // open={drawerOpen}
// // onClose={() => setDrawerOpen(false)}
// // >
// // <div style={{ width: "400px" }}>
// // {seatData.map((seat, index) => {
// // if (seat === "green") {
// // return (
// // <Passenger
// // seatNo={index}
// // key={index}
// // onNewPassenger={(passenger) =>
// // handleAddPassenger(passenger)
// // }
// // ></Passenger>
// // );
// // }
// // })}
// // </div>
// // <FinalAmount
// // getPassengerData={() => ({
// // bus: bus,
// // passengers: passengerData,
// // })}
// // />
// // </Drawer>
// // )}
// // </div>
// // );
// // }

// // import { useEffect, useState } from "react";
// // import { IconButton, Drawer, Typography } from "@mui/material";
// // import SeatIcon from "../Assets/SeatIcon";
// // import SteerWheel from "../Assets/SteerWheel.png";
// // import FinalAmount from "../components/FinalAmount";
// // import React from "react";
// // import Passenger from "./Passenger.js";
// // import axios from "axios";
// // import { AppBar, Box, Button, Toolbar } from "@mui/material";
// // import Stack from "@mui/material/Stack";
// // import "../components/SearchBus/SearchBus.css";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import siteBckImg from "../Assets/siteBckImg.jpg";
// // import swal from "sweetalert";
// // export default function BusSeats() {
// //   const [drawerOpen, setDrawerOpen] = useState(false);
// //   const [seatData, setSeatData] = useState(Array(48).fill(""));
// //   const [passenger, setPassenger] = useState([]);
// //   const [bus, setBus] = useState(JSON.parse(localStorage.getItem("bus")));
// //   // const [source, setSource] = useState(JSON.parse(localStorage.getItem("source")));
// //   // const [destination, setDestination] = useState(JSON.parse(localStorage.getItem("destination")));
// //   // hold the passenger data here.....lifting the state
// //   const [passengerData, setPassengerData] = useState([]);
// //   let [conSeatList, setConList] = useState([]);
// //   const userId = localStorage.getItem("user_id");
// //   localStorage.setItem("user_id",1);
// //   console.log(userId);
// //   const onSeatSelected = (seatNo) => {
// //     let seatDetails = [...seatData];
// //     if (seatDetails[seatNo] === "") {
// //       console.log("Post payload");

// //       console.log({
// //         user_id: userId,
// //         bus_id: bus.bus_id,
// //         seat_no: seatNo,
// //         status: "progress",
// //         time: getCurTime(),
// //       });
// //       axios
// //         .post("http://localhost:8080/app/concurrency/", {
// //           user_id: userId,
// //           bus_id: bus.bus_id,
// //           seat_no: seatNo,
// //           status: "progress",
// //           time: getCurTime(),
// //           // comment below line !

// //           // schedule:'schedule'
// //         })
// //         .then(
// //           (response) => {
// //             console.log(response.data.conId);
// //             console.log("success");
// //             setConList([
// //               ...conSeatList,
// //               {
// //                 seatNo: seatNo,
// //                 // check attrib
// //                 conId: response.data.concurrency_id,
// //               },
// //             ]);
// //             console.log(conSeatList);
// //           },
// //           (error) => {
// //             console.log(error);
// //             console.log("error");
// //           }
// //         );
// //       seatDetails[seatNo] = "green";
// //     } else {
// //       const element = document.querySelector(
// //         "#delete-request-error-handling .status"
// //       );
// //       console.log(conSeatList);
// //       const conId = conSeatList.find((c) => seatNo == c.seatNo).conId;
// //       console.log(conId);
// //       axios
// //         .delete(`http://localhost:8080/app/concurrency/${conId}`)
// //         .then((response) => {
// //           element.innerHTML = "Delete successful";
// //           setConList([...conSeatList.filter((c) => seatNo != c.seatNo)]);
// //         })
// //         .catch((error) => {
// //           element.parentElement.innerHTML = `Error: ${error.message}`;
// //           console.error("There was an error!", error);
// //         });
// //       seatDetails[seatNo] = "";
// //     }
// //     setSeatData(seatDetails);
// //     console.log(bus, "bus");
// //   };
// //   const getCurTime = () => {
// //     return new Date().toLocaleTimeString().split(" ")[0];
// //   };
// //   const handleAddPassenger = (passenger) => {
// //     setPassengerData([...passengerData, passenger]);
// //     console.log(passengerData);
// //     console.log("added!");
// //   };
// //   // const [disableSeats,setDisableSeats]=useState([])
// //   const disableSeats = (seatNoList) => {
// //     console.log(seatNoList);
// //     let seatDetails = [...seatData];
// //     seatNoList?.forEach((seatNo) => {
// //       seatDetails[seatNo - 1] = "red";
// //       console.log(seatNo);
// //     });
// //     setSeatData(seatDetails);
// //   };
// //   useEffect(() => {
// //     const bus = JSON.parse(localStorage.getItem("bus"));
// //     if (bus) {
// //       setBus(bus);
// //     }
// //   }, []);
// //   const submitHandler = () => {
// //     setPassenger(JSON.parse(localStorage.getItem("passenger")));
// //     console.log(passenger);
// //   };
// //   const fetchDisabledSeats = async () => {
// //     console.log({
// //       params: {
// //         bus: bus.bus_id,
// //         date: localStorage.getItem("date"),
// //         src: localStorage.getItem("source"),
// //         dest: localStorage.getItem("destination"),
// //       },
// //     });
// //     let resp = await axios
// //       .get(
// //         `http://localhost:8080/app/bookings/getByBusIdAndDateAndSrcAndDest`,
// //         {
// //           params: {
// //             bus: bus.bus_id,
// //             date: localStorage.getItem("date"),
// //             src: localStorage.getItem("source"),
// //             dest: localStorage.getItem("destination"),
// //           },
// //         }
// //       )
// //       .then((resp) => {
// //         console.log("disabled seats " + resp.data);
// //         disableSeats(resp.data);
// //         // console.log(disableSeats)
// //       });
// //   };
// //   // backend call, create disabledSeatsList and call disableSeats(disabledSeatsList)
// //   useEffect(() => {
// //     // let disabledSeatLists = [19, 22];
// //     // let content=<div>From {bus.source} To {bus.destination}</div>
// //     // window.changeNavContent(content)
// //     fetchDisabledSeats();
// //     // journeydate, busid --> list of unavaliable seats
// //     // disableSeats(disabledSeatLists);
// //   }, []);
// //   return (
// //     <>
// //       <Box sx={{ flexGrow: 1 }} pb={3}>
// //         <AppBar position="static" style={{ background: "#0F3557" }}>
// //           <Toolbar align="right">
// //             <Typography variant="h4">BookMyBus.com</Typography>
// //           </Toolbar>
// //         </AppBar>
// //       </Box>
// //       <div
// //         class="bg_image"
// //         // style={{
// //         // backgroundImage: `url(${siteBckImg})`,
// //         // backgroundSize: "cover",
// //         // }}
// //       >
// //         <div
// //           style={{
// //             width: "300px",
// //             marginLeft: "10%",
// //             //marginTop:"0.5%",
// //             // backgroundColor:"grey",
// //             borderRadius: "30px",
// //             //paddingBottom:"8px",
// //             paddingTop: "25px",
// //             border: "1px solid grey",
// //           }}
// //           className="glassdiv"
// //         >
// //           <Stack>
// //             <Box>
// //               <img
// //                 src={SteerWheel}
// //                 style={{ height: "40px", width: "40px", marginLeft: "68%" }}
// //               />
// //             </Box>
// //             <Box sx={{ marginLeft: "15%" }}>
// //               {seatData.map((seat, index) => (
// //                 <IconButton
// //                   sx={{ marginRight: index % 3 == 0 ? "10%" : "0%" }}
// //                   name={index + 1}
// //                   key={index + 1}
// //                   onClick={() => {
// //                     onSeatSelected(index);
// //                   }}
// //                 >
// //                   <SeatIcon fill={seat} />
// //                 </IconButton>
// //               ))}
// //             </Box>
// //           </Stack>
// //         </div>
// //         <br />
// //         <Button
// //           onClick={() => setDrawerOpen(true)}
// //           variant="contained"
// //           //className="btn btn-primary col-md-12"
// //           style={{
// //             height: "40px",
// //             width: "300px",
// //             marginTop: "1px",
// //             marginLeft: "10%",
// //             background: "#0F3557",
// //           }}
// //         >
// //           Proceed to Book
// //         </Button>
// //         {/* <div className="legenddiv">
// // <div className="card pt-3 ps-5 pe-5 pb-3">
// // <div className="pb-3">
// // Seat Legend
// // </div>
// // <div className="pb-3">
// // <SeatIcon fill={""} /> Available
// // </div>
// // <div className="pb-3">
// // <SeatIcon fill={"red"} /> Booked
// // </div>
// // <div className="pb-3">
// // <SeatIcon fill={"green"} /> Selected
// // </div>
// // </div>
// // </div> */}
// //         {/* <button onClick={submitHandler}>Book</button> */}
// //         {drawerOpen && (
// //           <Drawer
// //             anchor="right"
// //             open={drawerOpen}
// //             onClose={() => setDrawerOpen(false)}
// //           >
// //             <Box sx={{ width: "400px" }}>
// //               {seatData.map((seat, index) => {
// //                 if (seat === "green") {
// //                   return (
// //                     <Passenger
// //                       seatNo={index}
// //                       key={index}
// //                       onNewPassenger={(passenger) =>
// //                         handleAddPassenger(passenger)
// //                       }
// //                     ></Passenger>
// //                   );
// //                 }
// //               })}
// //             </Box>
// //             <FinalAmount
// //               getPassengerData={() => ({
// //                 bus: bus,
// //                 passengers: passengerData,
// //               })}
// //             />
// //           </Drawer>
// //         )}
// //       </div>
// //     </>
// //   );
// // }
// // // import { useEffect, useState } from "react";
// // // import { IconButton, Drawer, Button } from "@mui/material";
// // // import SeatIcon from "../Assets/SeatIcon";
// // // import FinalAmount from "../components/FinalAmount";
// // // import React from 'react'
// // // import Passenger from "./Passenger.js";
// // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // import axios from "axios";
// // // //import {} from "@fortawesome/free-solid-svg-icons";
// // // export default function BusSeats() {
// // // const [drawerOpen, setDrawerOpen] = useState(false);
// // // const [seatData, setSeatData] = useState(Array(24).fill(""));
// // // const [passenger, setPassenger] = useState([]);
// // // const [bus, setBus] = useState(JSON.parse(localStorage.getItem("bus")));
// // // // hold the passenger data here.....lifting the state
// // // const [passengerData, setPassengerData] = useState([]);
// // // const onSeatSelected = (seatNo) => {
// // // let seatDetails = [...seatData];
// // // if (seatDetails[seatNo] === "") seatDetails[seatNo] = "green";
// // // else seatDetails[seatNo] = "";
// // // setSeatData(seatDetails);
// // // console.log(bus, "bus");
// // // };
// // // const handleAddPassenger = (passenger) => {
// // // setPassengerData([...passengerData, passenger]);
// // // console.log(passengerData);
// // // console.log("added!");
// // // };
// // // const disableSeats = (seatNoList) => {
// // // let seatDetails = [...seatData];
// // // seatNoList?.forEach((seatNo) => {
// // // seatDetails[seatNo] = "red";
// // // });
// // // setSeatData(seatDetails);
// // // };
// // // useEffect(() => {
// // // const bus = JSON.parse(localStorage.getItem("bus"));
// // // if (bus) {
// // // setBus(bus);
// // // }
// // // }, []);
// // // const submitHandler = () => {
// // // setPassenger(JSON.parse(localStorage.getItem("passenger")));
// // // console.log(passenger);
// // // };
// // // const fetchDisabledSeats=async ()=>{
// // // console.log({params:{
// // // bus:bus.bus_id,
// // // date:localStorage.getItem('date'),
// // // }})
// // // let resp=await axios.get('http://localhost:8080/app/bookings/bus/date?bus=24&date=2022-12-22',
// // // {params:{
// // // bus:bus.bus_id,
// // // date:localStorage.getItem('date'),
// // // }}).then(resp=>{
// // // disableSeats(resp.data)
// // // })
// // // }
// // // // backend call, create disabledSeatsList and call disableSeats(disabledSeatsList)
// // // useEffect(()=>{
// // // // let disabledSeatLists = [19, 22];
// // // fetchDisabledSeats()
// // // // journeydate, busid --> list of unavaliable seats
// // // // disableSeats(disabledSeatLists);
// // // },[]);
// // // return (
// // // <div>
// // // {seatData.map((seat, index) => (
// // // <IconButton
// // // name={index + 1}
// // // key={index + 1}
// // // onClick={() => {
// // // onSeatSelected(index);
// // // }}
// // // >
// // // <SeatIcon fill={seat} />
// // // </IconButton>
// // // ))}
// // // <br />
// // // <button onClick={() => setDrawerOpen(true)}>Proceed to Book</button>
// // // {/* <button onClick={submitHandler}>Book</button> */}
// // // {drawerOpen && (
// // // <Drawer
// // // anchor="right"
// // // open={drawerOpen}
// // // onClose={() => setDrawerOpen(false)}
// // // >
// // // <div style={{ width: "400px" }}>
// // // {seatData.map((seat, index) => {
// // // if (seat === "green") {
// // // return (
// // // <Passenger
// // // seatNo={index}
// // // key={index}
// // // onNewPassenger={(passenger) =>
// // // handleAddPassenger(passenger)
// // // }
// // // ></Passenger>
// // // );
// // // }
// // // })}
// // // </div>
// // // <FinalAmount
// // // getPassengerData={() => ({
// // // bus: bus,
// // // passengers: passengerData,
// // // })}
// // // />
// // // </Drawer>
// // // )}
// // // </div>
// // // );
// // // }
// // // export default function BusSeats() {
// // // const [drawerOpen, setDrawerOpen] = useState(false);
// // // const [seatData, setSeatData] = useState(Array(24).fill(""));
// // // const [passenger, setPassenger] = useState([]);
// // // const [bus, setBus] = useState(JSON.parse(localStorage.getItem("bus")));
// // // // hold the passenger data here.....lifting the state
// // // const [passengerData, setPassengerData] = useState([]);
// // // const onSeatSelected = (seatNo) => {
// // // let seatDetails = [...seatData];
// // // if (seatDetails[seatNo] === "") seatDetails[seatNo] = "green";
// // // else seatDetails[seatNo] = "";
// // // setSeatData(seatDetails);
// // // console.log(bus, "bus");
// // // };
// // // const handleAddPassenger = (passenger) => {
// // // setPassengerData([...passengerData, passenger]);
// // // console.log(passengerData);
// // // console.log("added!");
// // // };
// // // const disableSeats = (seatNoList) => {
// // // let seatDetails = [...seatData];
// // // seatNoList.forEach((seatNo) => {
// // // seatDetails[seatNo] = "red";
// // // });
// // // setSeatData(seatDetails);
// // // };
// // // useEffect(() => {
// // // const bus = JSON.parse(localStorage.getItem("bus"));
// // // if (bus) {
// // // setBus(bus);
// // // }
// // // }, []);
// // // const submitHandler = () => {
// // // setPassenger(JSON.parse(localStorage.getItem("passenger")));
// // // console.log(passenger);
// // // };
// // // // backend call, create disabledSeatsList and call disableSeats(disabledSeatsList)
// // // useEffect(() => {
// // // let disabledSeatLists = [19, 22];
// // // // journeydate, busid --> list of unavaliable seats
// // // disableSeats(disabledSeatLists);
// // // });
// // // return (
// // // <div>
// // // {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-steering-wheel" /> */}
// // // {seatData.map((seat, index) => (
// // // <IconButton
// // // name={index + 1}
// // // key={index + 1}
// // // onClick={() => {
// // // onSeatSelected(index);
// // // }}
// // // >
// // // <SeatIcon fill={seat} />
// // // </IconButton>
// // // ))}
// // // <br />
// // // <button onClick={() => setDrawerOpen(true)}>Proceed to Book</button>
// // // {/* <button onClick={submitHandler}>Book</button> */}
// // // {drawerOpen && (
// // // <Drawer
// // // anchor="right"
// // // open={drawerOpen}
// // // onClose={() => setDrawerOpen(false)}
// // // >
// // // <div style={{ width: "400px" }}>
// // // {seatData.map((seat, index) => {
// // // if (seat === "green") {
// // // return (
// // // <Passenger
// // // seatNo={index}
// // // key={index}
// // // onNewPassenger={(passenger) =>
// // // handleAddPassenger(passenger)
// // // }
// // // ></Passenger>
// // // );
// // // }
// // // })}
// // // </div>
// // // <FinalAmount
// // // getPassengerData={() => ({
// // // bus: bus,
// // // passengers: passengerData,
// // // })}
// // // />
// // // </Drawer>
// // // )}
// // // </div>
// // // );
// // // }
