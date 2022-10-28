import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { AppBar, Box, Button, Fab, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Modal from "@mui/material/Modal";
import EditRoute from "../components/EditRoute";
import AddRoutes from "../components/AddRoutes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Row(props) {
  const { primeRoute, otherRoutes } = props;
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const openEditModal = () => {
    setEditOpen(true);
  };
  // const deleteRouteData=props.deleteRouteData

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {primeRoute.route_id}
        </TableCell>
        {/* <TableCell align="center">{primeRoute.distance}</TableCell> */}
        <TableCell align="center">{primeRoute.rank_no}</TableCell>
        {/* <TableCell align="center">{primeRoute.arrival_time}</TableCell> */}
        <TableCell align="center">{primeRoute.loc_name}</TableCell>
        <TableCell align="center">
          {/* <Link to={`/editroute/${primeRoute.route_id}`} state={{ routes: primeRoute }}> */}
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: 10 }}
            // component={Link}
            // to={`/editbus/${bus.bus_id}`}
            onClick={() => openEditModal()}
          >
            <EditIcon />
          </Button>
          {/* </Link> */}
          <Button
            color="secondary"
            variant="contained"
            style={{ marginRight: 10 }}
            onClick={() => props.deleteRouteData(primeRoute.route_primary_id)}
          >
            <DeleteSweepIcon />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ marginLeft: "20%" }}>
              <Typography variant="h6" gutterBottom component="div">
                Upcoming Stops
              </Typography>
              <Table aria-label="purchases">
                <TableBody>
                  {otherRoutes.map((route) => (
                    <TableRow key={route.route_primary_id}>
                      <TableCell align="center" component="th" scope="row">
                        {route.route_id}
                      </TableCell>
                      {/* <TableCell align="center">{route.distance}</TableCell> */}
                      <TableCell align="center">{route.rank_no}</TableCell>
                      {/* <TableCell align="center">{route.arrival_time}</TableCell> */}
                      <TableCell align="center">{route.loc_name}</TableCell>
                      <TableCell align="center">
                        {/* <Link to={`/editroute/${route.route_id}`} state={{ routes: route }}> */}
                        <Button
                          color="primary"
                          variant="contained"
                          style={{ marginRight: 10 }}
                          // component={Link}
                          // to={`/editbus/${bus.bus_id}`}
                          onClick={() => openEditModal()}
                        >
                          <EditIcon />
                        </Button>
                        {/* </Link> */}
                        <Button
                          color="secondary"
                          variant="contained"
                          style={{ marginRight: 10 }}
                          onClick={() =>
                            props.deleteRouteData(route.route_primary_id)
                          }
                        >
                          <DeleteSweepIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(!editOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditRoute id={primeRoute.route_primary_id} />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function BasicTable() {
  const [route, setRoute] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  function getData() {}

  function deleteRouteData(route_primary_id) {
    axios.delete(`http://localhost:8080/app/route/${route_primary_id}`).then(() => {
      setRefresh(true);
    });
  }

  function searchLocation() {}
  React.useEffect(
    (e) => {
      axios.get("http://localhost:8080/app/route/").then((res) => {
        console.log(res.data);
        setRoute(res.data);
      });
    },
    [refresh]
  );

  const sortRoutes = () => {
    let routeMap = [];
    for (let r of route) {
      let exsistingRoute = routeMap.find(
        (rm) => rm.primeRoute.route_id == r.route_id
      );
      if (exsistingRoute) {
        exsistingRoute.otherRoutes.push(r);
      } else {
        routeMap.push({
          primeRoute: r,
          otherRoutes: [],
        });
      }
    }
    console.log(routeMap);
    return routeMap;
  };

  console.log(route);

  const handleAddRoute = () => {
    setAddOpen(true);
  };

  return (
    <>
    <Box sx={{ flexGrow: 1 }} pb={3}>
      <AppBar position="sticky" style={{ background: "#0F3557" }}>
        <Toolbar align="right">
        <Typography variant="h5" >BookMyBus.com</Typography>
        </Toolbar>
       
      </AppBar>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell align="center">RouteId</TableCell>
            {/* <TableCell align="center">Distance</TableCell> */}
            <TableCell align="center">Rank</TableCell>
            {/* <TableCell align="center">Arrival</TableCell> */}
            <TableCell align="center">Source</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {route.map((Route) => ( */}
          {sortRoutes().map(({ primeRoute, otherRoutes }) => (
            <Row
              primeRoute={primeRoute}
              otherRoutes={otherRoutes}
              deleteRouteData={deleteRouteData}
            />
          ))}
        </TableBody>
      </Table>
      <Fab
        color="success"
        variant="extended"
        onClick={handleAddRoute}
        sx={{ marginLeft: "40%" }}
        // component={Link}
        // to={`/editbus/${bus.bus_id}`}
      >
        Create Route
      </Fab>
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(!addOpen)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddRoutes dialogClose={() => setAddOpen(false)} />
        </Box>
      </Modal>
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
// import { Link } from "react-router-dom";

// export default function BasicTable() {
//   const [route, setRoute] = React.useState([]);
//   const [refresh, setRefresh] = React.useState(false);
//   function getData() {}

//   function deleteRouteData(route_id) {
//     axios.delete(`http://localhost:8080/app/route/${route_id}`).then(() => {
//       setRefresh(true);
//     });
//   }

//   function searchLocation(){}
//   React.useEffect(
//     (e) => {
//       axios.get("http://localhost:8080/app/route/").then((res) => {
//         console.log(res.data);
//         setRoute(res.data);
//       });
//     },
//     [refresh]
//   );

//   console.log(route);

//   return (
//     <>
//     <Box sx={{ flexGrow: 1 }}  pb={3}>
//       <AppBar position="static" style={{ background: '#0F3557' }}>
//         <Toolbar align="right">
//         </Toolbar>
//       </AppBar>
//     </Box>
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="center">RouteId</TableCell>
//             <TableCell align="center">Distance</TableCell>
//             <TableCell align="center">Rank</TableCell>
//             <TableCell align="center">time</TableCell>
//             <TableCell align="center">Source</TableCell>
//             <TableCell align="center">Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {route.map((route) => (
//             <TableRow
//               key={route.route_primary_id}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell align="center">{route.route_primary_id}</TableCell>
//               {/* <TableCell align="center" component="th" scope="row">
//                 {bus.type}
//               </TableCell> */}
//               <TableCell align="center">{route.distance}</TableCell>
//               <TableCell align="center">{route.rank_no}</TableCell>
//               <TableCell align="center">{route.time}</TableCell>
//               <TableCell align="center">{route.loc_name}</TableCell>
//               {/* <TableCell align="center"><EditIcon/><DeleteSweepIcon/></TableCell> */}
//               <TableCell align="center">
//                 <Link to={`/editroute/${route.route_primary_id}`} state={{ routes: route }}>
//                   <Button
//                     color="primary"
//                     variant="contained"
//                     style={{ marginRight: 5 }}
//                     // component={Link}
//                     // to={`/editbus/${bus.bus_id}`}
//                   >
//                     <EditIcon />
//                   </Button>
//                 </Link>
//                 <Button
//                   color="secondary"
//                   variant="contained"
//                   style={{ marginRight: 5 }}
//                   onClick={() => deleteRouteData(route.route_primary_id)}
//                 >
//                   <DeleteSweepIcon />
//                 </Button>

//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Link to="/addbus">
//         <Button
//           color="success"
//           variant="contained"

//           // component={Link}
//           // to={`/editbus/${bus.bus_id}`}
//         >
//           Create Route
//         </Button>
//       </Link>
//     </TableContainer>
//     </>
//   );
// }
