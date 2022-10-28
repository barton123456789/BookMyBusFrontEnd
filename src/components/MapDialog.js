import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import axios from 'axios';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MapDialog2(props) {
  const [open, setOpen] = useState(false);
  console.log(props.id)
  let id=props.id
  const [lat,setLat]=useState()
    const [long,setLong]=useState()

    useEffect(() => {
        // const lat=15.436700;
        // const lon=75.643600;
        // getLocation();
            axios.get(`http://localhost:8080/app/loc/getLocationByBus?busId=${id}`).then(
                (response)=>{
                    console.log(response.data)
                    console.log(response.data[0].latitude)
                    setLat(response.data[0].latitude)
                    setLong(response.data[0].longitude)
                    // setUrl(`https://maps.google.com/maps?q=${lat},${long}&hl=es;&output=embed`)
                    
                    // const ifameData = document.getElementById("iframeId")
                    // ifameData.src = `https://maps.google.com/maps?q=${response.data.latitude},${response.data.longitude}&hl=es;&output=embed`
                    // setLocation(response.data)
                }, (error) => {
                    console.log(error)
                })
    })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
//   let url=`https://maps.google.com/maps?q=15.436700,75.643600&hl=es;&output=embed`
let url=`https://maps.google.com/maps?q=${lat},${long}&hl=es;&output=embed`

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <LocationOnIcon/>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        fullWidth='80%'
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <iframe id="iframeId"  src={url}  height="400px" width="100%" ></iframe>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        
          <Button onClick={handleClose} color="primary">
            Thank You
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}




// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// const MapDialog = (props) => {
//     //const [bus, setBus] = React.useState([]);
//     const [location, setLocation] = useState({});
//     let id=props.BusId
    // const [lat,setLat]=useState()
    // const [long,setLong]=useState()
//     // const [url,setUrl]=useState()

    
    // useEffect(() => {
    //     // const lat=15.436700;
    //     // const lon=75.643600;
    //     // getLocation();
    //         axios.get(`http://localhost:8080/app/loc/getLocationByBus?busId=22`).then(
    //             (response)=>{
    //                 console.log(response.data)
    //                 console.log(response.data[0].latitude)
    //                 setLat(response.data[0].latitude)
    //                 setLong(response.data[0].longitude)
    //                 // setUrl(`https://maps.google.com/maps?q=${lat},${long}&hl=es;&output=embed`)
                    
    //                 // const ifameData = document.getElementById("iframeId")
    //                 // ifameData.src = `https://maps.google.com/maps?q=${response.data.latitude},${response.data.longitude}&hl=es;&output=embed`
    //                 // setLocation(response.data)
    //             }, (error) => {
    //                 console.log(error)
    //             })
    // })
//     console.log(lat)
//     //console.log(props.bus_id)

//     let url=`https://maps.google.com/maps?q=${lat},${long}&hl=es;&output=embed`
//     return (
//         <div float='center' style={{ marginTop: "3rem" }} >
//             <iframe id="iframeId"  src={url}  height="400px" width="80%" ></iframe>
//         </div>
//     );
// }
// export default MapDialog