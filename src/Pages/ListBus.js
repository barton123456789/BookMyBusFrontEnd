import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddBus from "../components/AddBus";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useEffect } from "react";
import MapDialog2 from "../components/MapDialog";
import CreateBus from "./CreateBus";
import Modal from '@mui/material/Modal';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(10),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(10),
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ListBus(props) {
  const [bus, setBus] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  // function searchLocation(){

  //   let url=""
  //   useEffect(()=>{
  //     const ifameData=document.getElementById("iframeId")
  //     const lat=1.305385;
  //     const lon=30.923029;
  //     url=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
  //   })
  // }

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  function deleteBusData(bus_id) {
    axios.delete(`http://localhost:8080/app/bus/${bus_id}`).then(() => {
      setRefresh(true);
    });
  }

  React.useEffect(
    (e) => {
      axios.get("http://localhost:8080/app/bus/").then((res) => {
        console.log(res.data);
        setBus(res.data);
      });
    },
    [refresh]
  );

  console.log(bus);

  const navigate = useNavigate();

  const busIdHandler = (id) => {
    props.BusId(id);
    navigate("/map");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} pb={3}>
        <AppBar position="static" style={{ background: "#0F3557" }}>
          <Toolbar align="right">
          <Typography variant="h5" style={{color:'white'}} >BookMyBus.com</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">BusId</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">capacity</TableCell>
              <TableCell align="center">Source</TableCell>
              <TableCell align="center">Destination</TableCell>
              <TableCell align="center">Fare</TableCell>
              <TableCell align="center">Action</TableCell>
              <TableCell align="center">Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bus.map((bus) => (
              <TableRow
                key={bus.bus_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{bus.bus_id}</TableCell>
                <TableCell align="center" component="th" scope="row">
                  {bus.type}
                </TableCell>
                <TableCell align="center">{bus.capacity}</TableCell>
                <TableCell align="center">{bus.source}</TableCell>
                <TableCell align="center">{bus.destination}</TableCell>
                <TableCell align="center">{bus.fare}</TableCell>
                {/* <TableCell align="center"><EditIcon/><DeleteSweepIcon/></TableCell> */}
                <TableCell>
                  <Link to={`/editbus/${bus.bus_id}`} state={{ buses: bus }}>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginRight: 20 }}
                      // component={Link}
                      // to={`/editbus/${bus.bus_id}`}
                    >
                      <EditIcon />
                    </Button>
                  </Link>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => deleteBusData(bus.bus_id)}
                  >
                    <DeleteSweepIcon />
                  </Button></TableCell ><TableCell align="center">
                  <MapDialog2 id={bus.bus_id} />
                  {/* <Button
                  color="success"
                  variant="contained"
                  style={{ marginRight: 10 }}
                  onClick={busIdHandler(bus.bus_id)}
                  //  onClick={() => searchLocation()}
                >
                  <LocationOnIcon />
                </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <Link to="/newbus"> */}
        <Button
          color="primary"
          variant="contained"
          onClick={()=>setOpen(true)}
          // component={Link}
          // to={`/editbus/${bus.bus_id}`}
        >
          CreateBus
        </Button>
        <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <CreateBus sx={style} triggerClose={()=>setOpen(false)}/>
        </Modal>
        {/* </Link> */}
        {/* <Button variant="outlined" onClick={handleClickOpen}>
        AddBus
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography variant="h4">Add Bus</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <AddBus />
        </DialogContent>
      </BootstrapDialog> */}
      </TableContainer>
    </>
  );
}






// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import axios from "axios";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
// import { AppBar, Box, Button, Toolbar } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import AddBus from "../components/AddBus";
// import PropTypes from "prop-types";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import Typography from "@mui/material/Typography";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { useEffect } from "react";
// import MapDialog2 from "../components/MapDialog";

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(10),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(10),
//   },
// }));

// const BootstrapDialogTitle = (props) => {
//   const { children, onClose, ...other } = props;

//   return (
//     <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
//       {children}
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{
//             position: "absolute",
//             right: 12,
//             top: 12,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </DialogTitle>
//   );
// };

// BootstrapDialogTitle.propTypes = {
//   children: PropTypes.node,
//   onClose: PropTypes.func.isRequired,
// };

// export default function ListBus(props) {
//   const [bus, setBus] = React.useState([]);
//   const [refresh, setRefresh] = React.useState(false);
//   const [open, setOpen] = React.useState(false);

//   // function searchLocation(){

//   //   let url=""
//   //   useEffect(()=>{
//   //     const ifameData=document.getElementById("iframeId")
//   //     const lat=1.305385;
//   //     const lon=30.923029;
//   //     url=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
//   //   })
//   // }

//   // const handleClickOpen = () => {
//   //   setOpen(true);
//   // };
//   // const handleClose = () => {
//   //   setOpen(false);
//   // };

//   function deleteBusData(bus_id) {
//     axios.delete(`http://localhost:8080/app/bus/${bus_id}`).then(() => {
//       setRefresh(true);
//     });
//   }

//   React.useEffect(
//     (e) => {
//       axios.get("http://localhost:8080/app/bus/").then((res) => {
//         console.log(res.data);
//         setBus(res.data);
//       });
//     },
//     [refresh]
//   );

//   console.log(bus);

//   const navigate = useNavigate();

//   const busIdHandler = (id) => {
//     props.BusId(id);
//     navigate("/map");
//   };

//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }} pb={3}>
//         <AppBar position="static" style={{ background: "#0F3557" }}>
//           <Toolbar align="right">
//           <Typography variant="h5" style={{color:'white'}} >BookMyBus.com</Typography>
//           </Toolbar>
//         </AppBar>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="center">BusId</TableCell>
//               <TableCell align="center">Type</TableCell>
//               <TableCell align="center">capacity</TableCell>
//               <TableCell align="center">Source</TableCell>
//               <TableCell align="center">Destination</TableCell>
//               <TableCell align="center">Fare</TableCell>
//               <TableCell align="center">Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {bus.map((bus) => (
//               <TableRow
//                 key={bus.bus_id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell align="center">{bus.bus_id}</TableCell>
//                 <TableCell align="center" component="th" scope="row">
//                   {bus.type}
//                 </TableCell>
//                 <TableCell align="center">{bus.capacity}</TableCell>
//                 <TableCell align="center">{bus.source}</TableCell>
//                 <TableCell align="center">{bus.destination}</TableCell>
//                 <TableCell align="center">{bus.fare}</TableCell>
//                 {/* <TableCell align="center"><EditIcon/><DeleteSweepIcon/></TableCell> */}
//                 <TableCell>
//                   <Link to={`/editbus/${bus.bus_id}`} state={{ buses: bus }}>
//                     <Button
//                       color="primary"
//                       variant="contained"
//                       style={{ marginRight: 20 }}
//                       // component={Link}
//                       // to={`/editbus/${bus.bus_id}`}
//                     >
//                       <EditIcon />
//                     </Button>
//                   </Link>
//                   <Button
//                     color="secondary"
//                     variant="contained"
//                     onClick={() => deleteBusData(bus.bus_id)}
//                   >
//                     <DeleteSweepIcon />
//                   </Button>
//                   <MapDialog2 id={bus.bus_id} />
//                   {/* <Button
//                   color="success"
//                   variant="contained"
//                   style={{ marginRight: 10 }}
//                   onClick={busIdHandler(bus.bus_id)}
//                   //  onClick={() => searchLocation()}
//                 >
//                   <LocationOnIcon />
//                 </Button> */}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         <Link to="/newbus">
//         <Button
//           color="primary"
//           variant="contained"

//           // component={Link}
//           // to={`/editbus/${bus.bus_id}`}
//         >
//           CreateBus
//         </Button> </Link>
//         {/* <Button variant="outlined" onClick={handleClickOpen}>
//         AddBus
//       </Button>
//       <BootstrapDialog
//         onClose={handleClose}
//         aria-labelledby="customized-dialog-title"
//         open={open}
//       >
//         <BootstrapDialogTitle
//           id="customized-dialog-title"
//           onClose={handleClose}
//         >
//           <Typography variant="h4">Add Bus</Typography>
//         </BootstrapDialogTitle>
//         <DialogContent dividers>
//           <AddBus />
//         </DialogContent>
//       </BootstrapDialog> */}
//       </TableContainer>
//     </>
//   );
// }
