import { ClassNames } from "@emotion/react";
import { LockOutlined } from "@material-ui/icons";
import { AppBar, Avatar, Box, Button, Card, Container, Grid, TextField, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert'
import "./SignIn.css";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(user);

    axios.get(`http://localhost:8080/app/users/${email}`).then(
      (response) => {
        console.log(response.data);

        setUser(response.data);
        localStorage.setItem("user_id",response.data.user_id)
      },
      (error) => {
        console.log(error);

        alert("Incorrect details");
      }
    );
  }; // alert(`username ${email} and password ${password}`)

  useEffect(() => {
    if (user.password !== "" && password !== "") {
      if (password == user.password) {
        swal("Welcome Back", "", "success");
        {
          if (user.role == "Admin") navigate("/master");
          else navigate("/");
        }
      } else {
        swal("Whoops!", "Please verify your credentials!", "error");
      }
    }
  }, [user]);
  return (
    <> <Box sx={{ flexGrow: 1 }}  pb={3}>
    <AppBar position="static" style={{ background: '#0F3557' }}>
      <Toolbar align="right">
      <Typography variant="h5" >BookMyBus.com</Typography>
      </Toolbar>
    </AppBar>
  </Box>
  <Container>
  <Grid container spacing={4}>
  <Grid item sm={5}>
    <div style={{ padding: 30 }} align="center">
      <Card>
      <div class={ClassNames.container}>
        <Box>
        <form onSubmit={submitHandler}>
          <Grid
            container
            spacing={3}
            direction={"column"}
            justify={"center"}
            alignItems={"center"}
          >
             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
            <Grid item xs={12}>
              {/* <label>Email id</label> */}
              <TextField
                margin="normal"
                type="email"
                id="email"
                name="email"
                defaultValue="email"
                autoFocus
                className="text_input"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              {/* <label>Password</label> */}
              <TextField
                margin="normal"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                defaultValue="password"
                className="text_input"
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></TextField>
            </Grid>
            <Button
              type="submit"
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <button type="submit">LOGIN</button> */}
            <br />
            <Grid item xs={12}>
            <label>Not Registerd?</label>
            <Link to="/Register"><Button>Register</Button></Link>
            </Grid>
          </Grid>
        </form>
        </Box>

      </div>
      </Card>
    </div>
    </Grid>
    </Grid>
    </Container>
    </>
  );
}
