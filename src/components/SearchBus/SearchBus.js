import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GetBus from "../../Pages/GetBus";
import BusList from "../../Pages/BusList";
import { NotificationManager } from "react-notifications";
import { Autocomplete, Fab } from "@mui/material";
import { color, Stack } from "@mui/system";
import { makeStyles } from "@mui/styles";

import "./SearchBus.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const useStyles = makeStyles({
  root: {
   background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
   // background: 'linear-gradient(45deg, #9445D7 30%, #3B6FD8 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 52.8,
    padding: "30px 30px",
    marginLeft: "10px",
    width: "200px",
  },
  switch: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color:"white",

  }
});

export default function SearchBus() {
  const classes = useStyles();
  const [source, setSource] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [date, setDate] = React.useState("");

  const [cities, setCities] = React.useState(["loading"]);

  let navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get("http://localhost:8080/app/loc/")
      .then((resp) => setCities(resp.data.map((c) => c.locName)));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(search);
    console.log(date);

    axios
      .get(
        `http://localhost:8080/app/route/getBusesBySrcAndDest?source=${source}&destination=${destination}`
      )
      .then(
        (response) => {
          console.log(response.data);

          setSearch(response.data);
          localStorage.setItem("buses", JSON.stringify(response.data));
          localStorage.setItem("date", date);

          //setting source and destination
          localStorage.setItem("source", source);
          localStorage.setItem("destination", destination);
          NotificationManager.success(
            `${response.data.length} buses found`,
            null,
            1000
          );
          navigate("/buslist");
        },
        (error) => {
          console.log(error);
          NotificationManager.error("Incorrrect Details", null, 1000);
          // alert("Incorrect details");
        }
      );
  };

  return (
    <div>
      <div className="backdropimg"></div>
      <div className="searchContainer">
        <Stack
          component="form"
          sx={{
            float: "center",
            width: "100%",
            height: 20,
            marginTop: "5%",
            alignItems: "center",
          }}
        >
          <div className="card">
            <div style={{ marginLeft: "30px", marginTop: "30px" }}>
              <Typography variant="h3" color="primary">
                Search Bus Tickets
              </Typography>
            </div>
            <div className="searchdiv">
              <Autocomplete
                sx={{ width: "320px", marginLeft: "10px" }}
                options={cities}
                renderInput={(params) => (
                  <TextField
                    // helperText="Please enter your Source"
                    variant="outlined"
                    // getOptionLabel = {option => option.locName}
                    label="Source"
                    color="success"
                    {...params}
                  />
                )}
                onInputChange={(e, value) => {
                  setSource(value);
                }}
              />
              <Fab variant="extended" className={classes.switch} sx={{ marginLeft: "10px" }}>
              <CompareArrowsIcon /></Fab>
              <Autocomplete
                sx={{ width: "320px", marginLeft: "10px" }}
                options={cities}
                renderInput={(params) => (
                  <TextField
                    // helperText=" Please Enter you Destination"
                    variant="outlined"
                    label="Destination"
                    color="success"
                    {...params}
                  />
                )}
                onInputChange={(e, value) => {
                  setDestination(value);
                }}
              />

              <TextField
                // helperText="Enter your Date of journey"
                type="date"
                variant="outlined"
                placeHolder="dd-mm-yyyy"
                color="success"
                inputProps={{
                  min: "2022-10-27",
                }}
                sx={{ width: "320px", marginLeft: "10px" }}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <br />

              <Fab
                className={classes.root}
                // sx={{ height: "100px", marginLeft: "10px" }}
                variant="extended"
                //color="white"
                onClick={submitHandler}
                // style={{ background: '#0F3557' }}
              >
                Search Buses
              </Fab>
            </div>
          </div>
        </Stack>
      </div>
    </div>
  );
}

// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { Button, Typography } from "@material-ui/core";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import GetBus from "../../Pages/GetBus";
// import BusList from "../../Pages/BusList";
// import { NotificationManager } from 'react-notifications'
// import { Autocomplete, Fab } from "@mui/material";
// import { Stack } from "@mui/system";
// import NavigationIcon from "@mui/icons-material/Navigation";
// import LocationOnIcon from '@mui/icons-material/LocationOn';

// export default function SearchBus() {
//   const [source, setSource] = React.useState("");
//   const [destination, setDestination] = React.useState("");
//   const [search, setSearch] = React.useState("");
//   const [date, setDate] = React.useState("");

//   //   //----
//   const [cities, setCities] = React.useState(["loading"]);
//   // //----
//   let navigate = useNavigate();

//   //   //---------

//   React.useEffect(() => {
//     axios
//       .get("http://localhost:8080/app/loc/")
//       .then((resp) => setCities(resp.data.map((c) => c.locName)));
//   }, []);

//   // //--------
//   const submitHandler = (e) => {
//     e.preventDefault();

//     console.log(search);
//     console.log(date);

//     axios
//       .get(
//         `http://localhost:8080/app/route/getBusesBySrcAndDest?source=${source}&destination=${destination}`
//       )
//       .then(
//         (response) => {
//           console.log(response.data);

//           setSearch(response.data);
//           localStorage.setItem("buses", JSON.stringify(response.data));
//           localStorage.setItem("date", date);
//           //--
//           //NotificationManager.success(`${response.data.length} buses found`,null,1000)
//           //--
//           navigate("/buslist");
//         },
//         (error) => {
//           console.log(error);
//          // NotificationManager.error("Incorrrect Details",null,1000)
//           alert("Incorrect details");
//         }
//       );
//   };

//   return (
//     <div>
//       <Stack
//         component="form"
//         sx={{
//           float: "center",
//           width: "100%",
//           height: 20,
//           marginTop: "5%",
//           alignItems: "center",
//         }}
//       >
//         <form>
//           <Typography variant="h4" color="primary">
//             Search Bus{" "}
//           </Typography>
//           <Autocomplete
//             sx={{ width: "350px" }}
//             options={cities}
//             renderInput={(params) => (

//               <TextField
//                 // helperText="Please enter your Source"
//                 variant="outlined"
//                 id="demo-helper-text-aligned"
//                 label="Source"
//                 color="success"
//                 {...params}
//               />
//             )}
//             onInputChange={(e, value) => {
//               setSource(value);
//             }}
//           />

//           <Autocomplete
//             sx={{ width: "350px" }}
//             options={cities}
//             renderInput={(params) => (
//               <TextField
//                 id="demo-helper-text-aligned"
//                 variant="outlined"
//                 label="Destination"
//                 color="success"
//                 {...params}
//               />
//             )}
//             onInputChange={(e, value) => {
//               setDestination(value);
//             }}
//           />

//           <TextField
//             // helperText="Enter your Date of journey"
//             type="date"
//             variant="outlined"
//             placeHolder="dd-mm-yyyy"
//             color="success"
//             inputProps={{
//               min: "2022-10-15",
//             }}
//             onChange={(e) => {
//               setDate(e.target.value);
//             }}
//           />

//           <Fab
//             sx={{ height: "2.5rem" }}
//             variant="extended"
//             size="medium"
//             aria-label="add"
//             color="primary"
//             style={{
//               backgroundColor: "#A6CE39",
//             }}
//             onClick={submitHandler}
//           >
//             <NavigationIcon sx={{ mr: 1 }} />
//             Search
//           </Fab>
//         </form>
//       </Stack>
//       {/* <BusList setDate={date}/> */}
//     </div>
//   );
// }

// {
//   /* <div>
//       <Box
//         component="form"
//         sx={{
//           float: "center",
//           width: "75%",
//           height: 20,
//           marginTop: "12rem",
//           alignItems: "center",
//         }}
//       >
//         <form>
//           <Typography variant="h4" color="primary">
//             Search Bus{" "}
//           </Typography>
//           <TextField
//             helperText="Please enter your Source"
//             variant="outlined"
//             label="Source"
//             color="success"
//             onChange={(e) => {
//               setSource(e.target.value);
//             }}
//           />

//           <TextField
//             helperText=" Please Enter you Destination"
//             variant="outlined"
//             label="Destination"
//             color="success"
//             onChange={(e) => {
//               setDestination(e.target.value);
//             }}
//           />

//           <TextField
//             helperText="Enter your Date of journey"
//             type="date"
//             variant="outlined"
//             label="dd-mm-yyyy"
//             color="success"
//             inputProps={{
//               min: "2022-10-13",
//             }}
//             onChange={(e) => {
//               setDate(e.target.value);
//             }}
//           />

//           <Button
//             sx={{ height: "1rem" }}
//             variant="contained"
//             color="primary"
//             onClick={submitHandler}
//           >
//             Search
//           </Button>
//         </form>
//       </Box>

//     </div> */
// }

// {
//   /* <div>
//       <Box
//         component="form"
//         sx={{
//           float: "center",
//           width: "75%",
//           height: 20,
//           marginTop: "12rem",
//           alignItems: "center",
//         }}
//       >
//         <form>
//           <Typography variant="h4" color="primary">
//             Search Bus{" "}
//           </Typography>
//           <TextField
//             helperText="Please enter your Source"
//             variant="outlined"
//             label="Source"
//             color="success"
//             onChange={(e) => {
//               setSource(e.target.value);
//             }}
//           />

//           <TextField
//             helperText=" Please Enter you Destination"
//             variant="outlined"
//             label="Destination"
//             color="success"
//             onChange={(e) => {
//               setDestination(e.target.value);
//             }}
//           />

//           <TextField
//             helperText="Enter your Date of journey"
//             type="date"
//             variant="outlined"
//             label="dd-mm-yyyy"
//             color="success"
//             inputProps={{
//               min: "2022-10-13",
//             }}
//             onChange={(e) => {
//               setDate(e.target.value);
//             }}
//           />

//           <Button
//             sx={{ height: "1rem" }}
//             variant="contained"
//             color="primary"
//             onClick={submitHandler}
//           >
//             Search
//           </Button>
//         </form>
//       </Box>

//     </div> */
// }
