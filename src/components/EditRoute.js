import react, { useEffect, useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { TextField } from "@mui/material"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const initialValue = {
    type: '',
    capacity: '',
    source: '',
    destination: '',
    fare:''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const EditRoute = (props) => {
    const [route, setRoute] = useState(initialValue);
   // const { type, capacity, source, destination,fare } = bus;
  //  let navigate = useNavigate();
    // const {id}=useParams()

    const id=props.id
    const onValueChange = (e) => {
        console.log(route)
        setRoute({...route, [e.target.name]: e.target.value})
    }
    useEffect(()=>{
        axios.get(`http://localhost:8080/app/route/${id}`)
        .then((res)=>{
            setRoute(res.data)
        })
    },[])

    // const addBusDetails = async() => {
    //     await addBus(bus);
    //     navigate('/list');
    // }
    const addRouteDetails = (e) => {
        console.log(route);
        postRoutetoServer(route);
        e.preventDefault();
      };
    
      const postRoutetoServer = (data) => {
        axios.post(`http://localhost:8080/app/route/`, data).then(
          (response) => {
            console.log(response.data);
            console.log("success");
            // alert("sucessfully added");
            NotificationManager.success("Successfully updated",null,1000)
          },
          (error) => {
            console.log(error);
            console.log("error");
          }
        );
      };

    return (
        <Container>
            <Typography variant="h4">Edit Route</Typography>
            <FormControl>
                <TextField  variant="standard" label="Route No" onChange={(e) => onValueChange(e)} name='route_id' value={route.route_id} defaultValue={route.route_id} id="my-input" />
            </FormControl>
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
                <Button variant="contained" color="primary" onClick={() => addRouteDetails()}>Edit Route</Button>
            </FormControl>
        </Container>
    )
}

export default EditRoute;



















// import react, { useEffect, useState } from 'react';
// import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const initialValue = {
//     type: '',
//     capacity: '',
//     source: '',
//     destination: '',
//     fare:''
// }

// const Container = styled(FormGroup)`
//     width: 50%;
//     margin: 5% 0 0 25%;
//     & > div {
//         margin-top: 20px;
// `;

// const AddRoute = () => {
//     const [route, setRoute] = useState(initialValue);
//    // const { type, capacity, source, destination,fare } = bus;
//   //  let navigate = useNavigate();
//     const {id}=useParams()
 
//     const onValueChange = (e) => {
//         setRoute({...route, [e.target.name]: e.target.value})
//     }
//     useEffect(()=>{
//         axios.get(`http://localhost:8080/app/route/${id}`)
//         .then((res)=>{
//             setRoute(res.data)
//         })
//     },[])

//     // const addBusDetails = async() => {
//     //     await addBus(bus);
//     //     navigate('/list');
//     // }
//     const addRouteDetails = (e) => {
//         console.log(route);
//         postRoutetoServer(route);
//         e.preventDefault();
//       };
    
//       const postRoutetoServer = (data) => {
//         axios.post(`http://localhost:8080/app/route/`, data).then(
//           (response) => {
//             console.log(response.data);
//             console.log("success");
//             alert("sucessfully added");
//           },
//           (error) => {
//             console.log(error);
//             console.log("error");
//           }
//         );
//       };

//     return (
//         <Container>
//             <Typography variant="h4">Edit Route</Typography>
//             <FormControl>
//                 <InputLabel htmlFor="my-input">RouteNo</InputLabel>
//                 <Input onChange={(e) => onValueChange(e)} name='type' value={route.route_id} id="my-input" />
//             </FormControl>
//             <FormControl>
//                 <InputLabel htmlFor="my-input">Distance</InputLabel>
//                 <Input onChange={(e) => onValueChange(e)} name='capacity' value={route.distance} id="my-input" />
//             </FormControl>
//             <FormControl>
//                 <InputLabel htmlFor="my-input">Rank</InputLabel>
//                 <Input onChange={(e) => onValueChange(e)} name='source' value={route.rank_no} id="my-input"/>
//             </FormControl>
//             <FormControl>
//                 <InputLabel htmlFor="my-input">Time</InputLabel>
//                 <Input onChange={(e) => onValueChange(e)} name='destination' value={route.time} id="my-input" />
//             </FormControl>
//             <FormControl>
//                 <InputLabel htmlFor="my-input">Location</InputLabel>
//                 <Input onChange={(e) => onValueChange(e)} name='fare' value={route.loc_name} id="my-input" />
//             </FormControl>
//             <FormControl>
//                 <Button variant="contained" color="primary" onClick={() => addRouteDetails()}>Edit Route</Button>
//             </FormControl>
//         </Container>
//     )
// }

// export default AddRoute;