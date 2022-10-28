import { ClassNames } from "@emotion/react";
import { LockOutlined } from "@material-ui/icons";
import axios from "axios";
import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import { FolderOpenOutlined } from "@mui/icons-material";
import Autocomplete from '@mui/material/Autocomplete';

const CreateBus = (props) => {
  const [routes,setRoutes]=useState(["loading routes"])
  const [formData,setData]=useState({
    source:'',
    destination:'',
    bus_name:'',
    type:'',
    capacity:''
  })
  // const triggerClose=props.triggerClose

  const handleform = (e) => {
    console.log(formData);
    postBustoServer(formData);
    e.preventDefault();
  };

  const checkRouteCode=(routeCode)=>{
    return routes.find(r=>r.route_code==routeCode)
  }

  const routeFilter=(route)=>{
    
  }

  const postBustoServer = (data) => {
    axios.post(`http://localhost:8080/app/bus/`, data).then(
      (response) => {
        console.log(response.data);
        console.log("success");
        props.triggerClose()
        //swal("Success", "Congratulations!! your account has been sucessfully created.", "success");
      },
      (error) => {
        console.log(error);
        console.log("error");
      }
    );
  };

  useEffect(()=>{
    axios.get('http://localhost:8080/app/route/routecodes/')
    .then(res=>{
      console.log(res.data)
      setRoutes(res.data)
    })
  },[])

  return (
    <div>
       {/* <Box sx={{ flexGrow: 1 }}  pb={3}>
      <AppBar position="static" style={{ background: '#0F3557' }}>
        <Toolbar align="right">
        <Typography variant="h4" >BookMyBus.com</Typography>
        </Toolbar>
      </AppBar>
    </Box> */}
      <form onSubmit={handleform}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          padding={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
            bgcolor: 'background.paper',
          }}
        >
          <Typography varient="h2" padding={3} textAlign="center">
            {" "}
            New Bus{" "}
          </Typography>
          <TextField
            margin="normal"
            varient="outlined"
            name="text"
            placeholder="name"
            id="busName"
            onChange={(e) => {
                setData({ ...formData, busName: e.target.value });
            }}
            value={formData.busName}
          />
          <Autocomplete
              disablePortal
              id="routeCodeBox"
              options={routes.map(r=>r.route_code)}
              sx={{ width:"225px"}}
              margin="normal"
              renderInput={(params) => <TextField
                margin="normal"
                name="routeCode"
                placeholder="Enter RouteCode"
                id="routeCode"
                onChange={(e) => {
                    setData({ ...formData,
                      route_code: e.target.value 
                    });
                }}
                onBlur={(e)=>{
                  let r=e.target.value;
                  setData({ ...formData,
                    route_code:r,
                    source:r.split(' -> ')[0],
                    destination:r.split(' -> ').pop()
                  });
                }}
                {...params}
              />}
            />
          <TextField
            margin="normal"
            variant="outlined"
            name="text"
            placeholder="source"
            id="source"
            value={formData.source}
            // onChange={(e) => {
            //     setData({ ...formData, source: e.target.value });
            // }}
          />
          <TextField
          margin="normal"
          variant="outlined"
          name="text"
          placeholder="destination"
          id="destination"
          value={formData.destination}
          // onChange={(e) => {
          //   setData({ ...formData, destination: e.target.value });
          // }}
        />
          <TextField
            margin="normal"
            name="type"
            placeholder="Type"
            id="type"
            onChange={(e) => {
              setData({ ...formData, type: e.target.value });
            }}
            value={formData.type}
          />
          <TextField
            margin="normal"
            name="capacity"
            type="number"
            placeholder="set capacity"
            id="capacity"
            value={formData.capacity}
            onChange={(e) => {
                setData({ ...formData, capacity: e.target.value });
            }}
          /> 
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            {" "}
            Create Bus
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CreateBus;









// import { ClassNames } from "@emotion/react";
// import { LockOutlined } from "@material-ui/icons";
// import axios from "axios";
// import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import swal from 'sweetalert'
// import { FolderOpenOutlined } from "@mui/icons-material";

// const CreateBus = () => {
//   const [old, setOld]= useState({});
//   const handleform = (e) => {
//     console.log(old);
//     postBustoServer(old);
//     e.preventDefault();
//   };

//   const postBustoServer = (data) => {
//     axios.post(`http://localhost:8080/app/bus/`, data).then(
//       (response) => {
//         console.log(response.data);
//         console.log("success");
//         //swal("Success", "Congratulations!! your account has been sucessfully created.", "success");
//       },
//       (error) => {
//         console.log(error);
//         console.log("error");
//       }
//     );
//   };

//   return (
//     <div>
//        <Box sx={{ flexGrow: 1 }}  pb={3}>
//       <AppBar position="static" style={{ background: '#0F3557' }}>
//         <Toolbar align="right">
//         <Typography variant="h4" >BookMyBus.com</Typography>
//         </Toolbar>
//       </AppBar>
//     </Box>
//       <form onSubmit={handleform}>
//         <Box
//           display="flex"
//           flexDirection={"column"}
//           maxWidth={400}
//           alignItems="center"
//           justifyContent={"center"}
//           margin="auto"
//           marginTop={5}
//           padding={5}
//           borderRadius={5}
//           boxShadow={"5px 5px 10px #ccc"}
//           sx={{
//             ":hover": {
//               boxShadow: "10px 10px 20px #ccc",
//             },
//           }}
//         >
//           <Typography varient="h2" padding={3} textAlign="center">
//             {" "}
//             New Bus{" "}
//           </Typography>
//           <TextField
//             margin="normal"
//             varient="outlined"
//             name="text"
//             placeholder="name"
//             id="bus_name"
//             onChange={(e) => {
//                 setOld({ ...FolderOpenOutlined, bus_name: e.target.value });
//             }}
//           />
//           <TextField
//             margin="normal"
//             variant="outlined"
//             name="text"
        
//             placeholder="source"
//             id="source"
//             onChange={(e) => {
//                 setOld({ ...old, source: e.target.value });
//             }}
//           />
//           <TextField
//           margin="normal"
//           variant="outlined"
//           name="text"
      
//           placeholder="destination"
//           id="destination"
//           onChange={(e) => {
//             setOld({ ...old, destination: e.target.value });
//           }}
//         />
//           <TextField
//             margin="normal"
//             name="type"
//             placeholder="Type"
//             id="type"
//             onChange={(e) => {
//               setOld({ ...old, type: e.target.value });
//             }}
//           />
//           <TextField
//             margin="normal"
//             name="capacity"
//             type="number"
//             placeholder="set capacity"
//             id="capacity"
//             onChange={(e) => {
//                 setOld({ ...old, capacity: e.target.value });
//             }}
//           />
//            <TextField
//             margin="normal"
//             name="routeId"
//             placeholder="Enter Routeid"
//             id="RouteId"
//             onChange={(e) => {
//                 setOld({ ...old, route_id: e.target.value });
//             }}
//           /> 
//           <Button
//             sx={{ marginTop: 3, borderRadius: 3 }}
//             variant="contained"
//             color="warning"
//             type="submit"
//           >
//             {" "}
//             Create Bus
//           </Button>
//         </Box>
//       </form>
//     </div>
//   );
// };

// export default CreateBus;
