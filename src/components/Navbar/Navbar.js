import { Link } from "react-router-dom";
import React,{useState} from "react";
import './Navbar.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Fab } from "@mui/material";



const Navbar = () => {

  //const [show, setShow]=useState(false);
  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#0F3557' }}>
        <Toolbar align="right">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h5" >BookMyBus.com</Typography>
          <form >
                <Link  to='/signin' class="btn btn-style" type="submit  ">
                  <Fab variant="extended">SignIn</Fab>
                </Link>
                <Link  to='/Register'  class="btn btn-style  btn-style-border" type="submit">
                  <Fab variant="extended">SignUp</Fab>
                </Link>
              </form>
        </Toolbar>
      </AppBar>
    </Box>
      {/* <section className="navbar-bg">
        <nav class="navbar navbar-expand-lg">
          <div class="container">
            <a class="navbar-brand" href="#">
              Busbuddy
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={()=>setShow(!show)}
             >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class={`collapse navbar-collapse ${show ? "show" : " "}`} 
                  >
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">
                    Manage Booking
                  </a>
                </li>
                
              </ul>
              <form>
                <Link  to='/signin' class="btn btn-style" type="submit  ">
                  SignIn
                </Link>
                <Link  to='/Register'  class="btn btn-style  btn-style-border" type="submit">
                  SignUp
                </Link>
              </form>
            </div>
          </div>
        </nav>
      </section> */}
    </>
  );
};

export default Navbar;
