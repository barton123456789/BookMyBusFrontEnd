import react, { useState } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { TextField } from "@material-ui/core";
import AddBus from "./AddBus";

const initialValue = {
  route_id: "",
  // route_primary_id:"",
  distance: "",
  rank_no: "",
  time: "",
  loc_name: "",
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddRoutes = (props) => {
  const [route, setRoute] = useState(initialValue);
  let [savedRoutes,setRoutes]=useState([])
  let [isRoutesSaved,setRoutesSaved]=useState(false)
  // const { type, capacity, source, destination,fare } = bus;
  //  let navigate = useNavigate();

  const onValueChange = (e) => {
    setRoute({ ...route, [e.target.name]: e.target.value });
  };

  // const addBusDetails = async() => {
  //     await addBus(bus);
  //     navigate('/list');
  // }
  const addRouteDetails = (e) => {
    // console.log(route);
    // postRoutetoServer(route);
    // e.preventDefault();
    console.log("Current route added is")
    console.log(route)
    setRoutes([...savedRoutes,route])
    setRoute({...initialValue,route_id:route.route_id})
    NotificationManager.success("Route Saved")
    console.log(savedRoutes)
  };

  const postRoutetoServer = (data) => {
    return axios.post(`http://localhost:8080/app/route/`, data)
    // .then(
    //   (response) => {
    //     console.log(response.data);
    //     console.log("success");
    //     // alert("sucessfully added");
    //     NotificationManager.success("Successfully added",null,1000)
    //   },
    //   (error) => {
    //     console.log(error);
    //     console.log("error");
    //   }
    // );
  };

  const postBusInfo=()=>{
    axios.post("put bus route here")
    .then(d=>NotificationManager.success("Bus added"))
    .catch(err=>NotificationManager.error("Bus Add Failed!"))
  }

  const submitRoutes=()=>{
    console.log("All saved Routes ")
    console.log(savedRoutes)
    axios.all(savedRoutes.map(route=>postRoutetoServer(route)))
      .then(d=>{
        setRoutesSaved(true);
        NotificationManager.success("Routes Saved  Sucessfully!")
      })
      .catch(err=>{
        NotificationManager.error("Routes saved Error")
      })
  }

  return (
    // <Container>
    //   <Typography variant="h4">Add Route</Typography>
    //   <FormControl>
    //     <InputLabel htmlFor="my-input">Distance</InputLabel>
    //     <Input
    //       onChange={(e) => onValueChange(e)}
    //       name="distance"
    //       value={route.distance}
    //       id="my-input"
    //     />
    //   </FormControl>
    //   <FormControl>
    //     <InputLabel htmlFor="my-input">Rank</InputLabel>
    //     <Input
    //       onChange={(e) => onValueChange(e)}
    //       name="rank"
    //       value={route.rank}
    //       id="my-input"
    //     />
    //   </FormControl>
    //   <FormControl>
    //     <InputLabel htmlFor="my-input">Time</InputLabel>
    //     <Input
    //       onChange={(e) => onValueChange(e)}
    //       name="time"
    //       value={route.time}
    //       id="my-input"
    //     />
    //   </FormControl>
    //   <FormControl>
    //     <InputLabel htmlFor="my-input">Source</InputLabel>
    //     <Input
    //       onChange={(e) => onValueChange(e)}
    //       name="source"
    //       value={route.source}
    //       id="my-input"
    //     />
    //   </FormControl>
     
    //   {/* <FormControl>
    //     <InputLabel htmlFor="my-input">fare</InputLabel>
    //     <Input
    //       onChange={(e) => onValueChange(e)}
    //       name="fare"
    //       value={bus.fare}
    //       id="my-input"
    //     />
    //   </FormControl> */}
    //   <FormControl>
    //     <Button
    //       variant="contained"
    //       color="primary"
    //       onClick={() => addRouteDetails()}
    //     >
    //       Add Routes
    //     </Button>
    //   </FormControl>
    // </Container>

    <>
    {!isRoutesSaved&&
      <Container>
      <Typography variant="h4">Add Route</Typography>
      <FormControl>
          <TextField  disabled={savedRoutes.length>0}variant="standard" label="Route Id" onChange={(e) => onValueChange(e)} name='route_id' value={route.route_id} id="my-input" />
      </FormControl>
      {/* <FormControl>
          <TextField  variant="standard" label="Route primary Id" onChange={(e) => onValueChange(e)} name='route_primary_id' value={route.route_primary_id}  id="my-input" />
      </FormControl> */}
      <FormControl>
          {/* <InputLabel htmlFor="my-input">Distance</InputLabel> */}
          <TextField variant="standard" label="Distance" onChange={(e) => onValueChange(e)} name='distance' value={route.distance} id="my-input" />
      </FormControl>
      <FormControl>
          {/* <InputLabel htmlFor="my-input">Rank</InputLabel> */}
          <TextField variant="standard" label="Rank" onChange={(e) => onValueChange(e)} name='rank_no' value={route.rank_no} id="my-input"/>
      </FormControl>
      <FormControl>
          {/* <InputLabel htmlFor="my-input">Time</InputLabel> */}
          <TextField variant="standard" label="Time" onChange={(e) => onValueChange(e)} name='time' value={route.time} id="my-input" />
      </FormControl>
      <FormControl>
          {/* <InputLabel htmlFor="my-input">Location</InputLabel> */}
          <TextField variant="standard" label="Location" onChange={(e) => onValueChange(e)} name='loc_name' value={route.loc_name} id="my-input" />
      </FormControl>
      <FormControl>
          <Button variant="contained" color="primary" onClick={() => addRouteDetails()}>Add Route</Button>
      </FormControl>
      <FormControl>
          <Button disabled={savedRoutes.length==0} variant="contained" color="primary" onClick={() => submitRoutes()}>Save Route</Button>
      </FormControl>
      </Container>
    }
    {isRoutesSaved&&
      <Container>
        <AddBus 
          triggerClose={()=>props.dialogClose()}
          route_id={savedRoutes[0].route_id}
          // route_primary_id={savedRoutes[0].route_primary_id}
        />
      </Container>
    }
    </>
    
  );
};

export default AddRoutes;






























// import react, { useState } from "react";
// import {
//   FormGroup,
//   FormControl,
//   InputLabel,
//   Input,
//   Button,
//   styled,
//   Typography,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const initialValue = {
//   route_id: "",
//   distance: "",
//   rank: "",
//   time: "",
//   source: "",
// };

// const Container = styled(FormGroup)`
//     width: 50%;
//     margin: 5% 0 0 25%;
//     & > div {
//         margin-top: 20px;
// `;

// const AddRoutes = () => {
//   const [route, setRoute] = useState(initialValue);
//   // const { type, capacity, source, destination,fare } = bus;
//   //  let navigate = useNavigate();

//   const onValueChange = (e) => {
//     setRoute({ ...route, [e.target.name]: e.target.value });
//   };

//   // const addBusDetails = async() => {
//   //     await addBus(bus);
//   //     navigate('/list');
//   // }
//   const addRouteDetails = (e) => {
//     console.log(route);
//     postRoutetoServer(route);
//     e.preventDefault();
//   };

//   const postRoutetoServer = (data) => {
//     axios.post(`http://localhost:8080/app/route/`, data).then(
//       (response) => {
//         console.log(response.data);
//         console.log("success");
//         alert("sucessfully added");
//       },
//       (error) => {
//         console.log(error);
//         console.log("error");
//       }
//     );
//   };

//   return (
//     <Container>
//       <Typography variant="h4">Add Route</Typography>
//       <FormControl>
//         <InputLabel htmlFor="my-input">Distance</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="distance"
//           value={route.distance}
//           id="my-input"
//         />
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="my-input">Rank</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="rank"
//           value={route.rank}
//           id="my-input"
//         />
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="my-input">Time</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="time"
//           value={route.time}
//           id="my-input"
//         />
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="my-input">Source</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="source"
//           value={route.source}
//           id="my-input"
//         />
//       </FormControl>
     
//       {/* <FormControl>
//         <InputLabel htmlFor="my-input">fare</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="fare"
//           value={bus.fare}
//           id="my-input"
//         />
//       </FormControl> */}
//       <FormControl>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => addRouteDetails()}
//         >
//           Add Routes
//         </Button>
//       </FormControl>
//     </Container>
//   );
// };

// export default AddRoutes;
