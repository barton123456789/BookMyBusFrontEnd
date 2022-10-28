import { ClassNames } from "@emotion/react";
import { LockOutlined } from "@material-ui/icons";
import axios from "axios";
import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import "./SignUp.css";

const SignUp = () => {
  const [user, setUser] = useState({});
  const handleform = (e) => {
    console.log(user);
    postUsertoServer(user);
    e.preventDefault();
  };

  const postUsertoServer = (data) => {
    axios.post(`http://localhost:8080/app/users/`, data).then(
      (response) => {
        console.log(response.data);
        console.log("success");
        swal("Success", "Congratulations!! your account has been sucessfully created.", "success");
      },
      (error) => {
        console.log(error);
        console.log("error");
      }
    );
  };

  return (
    <div>
       <Box sx={{ flexGrow: 1 }}  pb={3}>
      <AppBar position="static" style={{ background: '#0F3557' }}>
        <Toolbar align="right">
        <Typography variant="h4" >BookMyBus.com</Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <form onSubmit={handleform}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography varient="h2" padding={3} textAlign="center">
            {" "}
            SignUp{" "}
          </Typography>
          <TextField
            margin="normal"
            varient="outlined"
            name="text"
            placeholder="Full name"
            id="name"
            onChange={(e) => {
              setUser({ ...user, full_Name: e.target.value });
            }}
          />
          <TextField
            margin="normal"
            variant="outlined"
            name="email"
            type="email"
            placeholder="enter your email"
            id="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <TextField
            margin="normal"
            name="password"
            type="password"
            placeholder="set password"
            id="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <TextField
            margin="normal"
            name=""
            placeholder="set gender"
            id="gender"
            onChange={(e) => {
              setUser({ ...user, gender: e.target.value });
            }}
          />
          <TextField
            margin="normal"
            name="age"
            type="number"
            placeholder="set age"
            id="age"
            onChange={(e) => {
              setUser({ ...user, age: e.target.value });
            }}
          />
          {/* <TextField
            margin="normal"
            name="role"
            placeholder="set role"
            id="role"
            onChange={(e) => {
              setUser({ ...user, role: e.target.value });
            }}
          /> */}
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            {" "}
            Register
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default SignUp;
