import react, { useEffect, useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

const AddBus = () => {
    const [bus, setBus] = useState(initialValue);
   // const { type, capacity, source, destination,fare } = bus;
  //  let navigate = useNavigate();
    const {id}=useParams()
 
    const onValueChange = (e) => {
        setBus({...bus, [e.target.name]: e.target.value})
    }
    useEffect(()=>{
        axios.get(`http://localhost:8080/app/bus/${id}`)
        .then((res)=>{
            setBus(res.data)
        })
    },[])

    // const addBusDetails = async() => {
    //     await addBus(bus);
    //     navigate('/list');
    // }
    const addBusDetails = (e) => {
        console.log(bus);
        postBustoServer(bus);
        e.preventDefault();
      };
    
      const postBustoServer = (data) => {
        axios.post(`http://localhost:8080/app/bus/`, data).then(
          (response) => {
            console.log(response.data);
            console.log("success");
            alert("sucessfully added");
          },
          (error) => {
            console.log(error);
            console.log("error");
          }
        );
      };

    return (
        <Container>
            <Typography variant="h4">Edit Bus</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">type</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='type' value={bus.type} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">capacity</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='capacity' value={bus.capacity} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Source</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='source' value={bus.source} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">destination</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='destination' value={bus.destination} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">fare</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='fare' value={bus.fare} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addBusDetails()}>Edit Bus</Button>
            </FormControl>
        </Container>
    )
}

export default AddBus;