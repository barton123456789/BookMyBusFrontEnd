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

const initialValue = {
  type: "",
  capacity: "",
  source: "",
  destination: "",
  fare: "",

  days:"",
  bus_name:"",
};

const Container = styled(FormGroup)`
    width: 100%;
    & > div {
        margin-top: 20px;
`;

const AddBus = (props) => {
  const [bus, setBus] = useState(
        {...initialValue,
            route_id:props.route_id,
        }
    );

  const [savedBuses,setSavedBuses]=useState([])
  // const { type, capacity, source, destination,fare } = bus;
  //  let navigate = useNavigate();

  const onValueChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  // const addBusDetails = async() => {
  //     await addBus(bus);
  //     navigate('/list');
  // }
  const addBusDetails = (e) => {
    console.log(bus);
    setSavedBuses([...savedBuses,bus])
    setBus({...initialValue,
      route_id:props.route_id,
    })
    NotificationManager.success("Buses added")
    // postBustoServer(bus);
    e.preventDefault();
  };

  const submitBuses=()=>{

    console.log("All buses details")
    console.log(savedBuses)
    axios.all(savedBuses.map(bus=>postBustoServer(bus)))
    .then(d=>{
      NotificationManager.success("Buses saved Sucessfully!")
    })
    .catch(err=>{
      NotificationManager.error("Buses saved error!")
    })
  }

  const postBustoServer = (data) => {
    console.log("Bus data ")
    console.log(data)
    return axios.post(`http://localhost:8080/app/bus/`, data)
    .then(
      (response) => {
        console.log(response.data);
        console.log("success");
        // alert("sucessfully added");
        NotificationManager.success("Successfully added",null,1000)
        props.triggerClose()
      },
      (error) => {
        console.log(error);
        console.log("error");
      }
    );
  };

  return (
    <Container>
      <Typography variant="h4">Add Bus</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Bus name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="bus_name"
          value={bus.bus_name}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Days</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="days"
          value={bus.days}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">type</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="type"
          value={bus.type}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">capacity</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="capacity"
          value={bus.capacity}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Source</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="source"
          value={bus.source}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">destination</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="destination"
          value={bus.destination}
          id="my-input"
          fullwidth
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">fare</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="fare"
          value={bus.fare}
          id="my-input"
          fullwidth
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={e => addBusDetails(e)}
        >
          Add Bus
        </Button>
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={e => submitBuses(e)}
          disabled={savedBuses.length==0}
        >
          Save Buses
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddBus;





















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
//   type: "",
//   capacity: "",
//   source: "",
//   destination: "",
//   fare: "",
// };

// const Container = styled(FormGroup)`
//     width: 50%;
//     margin: 5% 0 0 25%;
//     & > div {
//         margin-top: 20px;
// `;

// const AddBus = () => {
//   const [bus, setBus] = useState(initialValue);
//   // const { type, capacity, source, destination,fare } = bus;
//   //  let navigate = useNavigate();

//   const onValueChange = (e) => {
//     setBus({ ...bus, [e.target.name]: e.target.value });
//   };

//   // const addBusDetails = async() => {
//   //     await addBus(bus);
//   //     navigate('/list');
//   // }
//   const addBusDetails = (e) => {
//     console.log(bus);
//     postBustoServer(bus);
//     e.preventDefault();
//   };

//   const postBustoServer = (data) => {
//     axios.post(`http://localhost:8080/app/bus/`, data).then(
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
      
//       <FormControl>
//         <InputLabel htmlFor="my-input">type</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="type"
//           value={bus.type}
//           id="my-input"
//         />
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="my-input">capacity</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="capacity"
//           value={bus.capacity}
//           id="my-input"
//         />
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="my-input">Source</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="source"
//           value={bus.source}
//           id="my-input"
//         />
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="my-input">destination</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="destination"
//           value={bus.destination}
//           id="my-input"
//           fullwidth
//         />
//       </FormControl>
//       <FormControl>
//         <InputLabel htmlFor="my-input">fare</InputLabel>
//         <Input
//           onChange={(e) => onValueChange(e)}
//           name="fare"
//           value={bus.fare}
//           id="my-input"
//           fullwidth
//         />
//       </FormControl>
//       <FormControl>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => addBusDetails()}
//         >
//           Add Bus
//         </Button>
//       </FormControl>
//     </Container>
//   );
// };

// export default AddBus;
