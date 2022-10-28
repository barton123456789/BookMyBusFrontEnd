import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchBus from '../components/SearchBus/SearchBus';
import { makeStyles } from '@mui/styles';
import {Drawer} from '@mui/material';
import { useState } from 'react';
import { Container, Fab, List, ListItem } from '@mui/material';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #DEDBDA 30%, #F0EFEE 90%)',
    border: 0,
    borderRadius: 4,
    //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    height: 34,
    padding: '0 0',
  },
  ListItem:{
    marginTop:5,
    marginLeft:2

  },
  drawer:{
    width:200,
    marginTop:10
 
  },
  title:{
    background: '#0F3557',
    color:'white'
  }
 
});

const MasterHome = () => {
  const classes = useStyles();
  const[opens,setOpens]=useState(false); 
  return (
    <>
    <Container style={{width:'100%'}} >
      <Drawer open={opens} onClose={()=> setOpens(false)}>
        <Box display="flex" p={4} justifyContent="center" fontWeight={500}  className={classes.title}>
          <Typography variant='h5'>
            <Box mt={4} mb={4} fontWeight="fontWeightBold">
              Hello!! Priyesh
            </Box>
           
          </Typography>
        </Box>
        <List >
          <ListItem button className={classes.ListItem} >
          <Link  to='/listroutes' class="btn btn-style" type="submit  ">
            <Typography variant='h6' align='center'>< AltRouteIcon/> Manage Route</Typography>
                
                </Link>
          </ListItem>
          <ListItem button className={classes.ListItem}>
          <Link  to='/listbus'  class="btn btn-style  btn-style-border" type="submit">
          <Typography variant='h6' align='center'><DirectionsBusFilledIcon/> Manage Buses</Typography>
                </Link>
          </ListItem>
          <ListItem button className={classes.ListItem}>
          <Link  to='/listuser'  class="btn btn-style  btn-style-border" type="submit">
          <Typography variant='h6' align='center'><GroupAddIcon/> Manage Users</Typography>
                </Link>
          </ListItem>
          <ListItem button className={classes.ListItem}>
          <Link  to='/mybookings'  class="btn btn-style  btn-style-border" type="submit">
          <Typography variant='h6' align='center'><GroupAddIcon/> Manage Bookings</Typography>
                </Link>
          </ListItem>
        </List>
      </Drawer>
   
     <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" style={{ background: '#0F3557' }}>
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={()=>setOpens(true )}
           // sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h5'>BookMyBus.com</Typography>
          
          
                {/* <Link  to='/listroutes' class="btn btn-style" type="submit  ">
                  <Fab className={classes.root} variant="extended">Manage Routes</Fab>
                </Link>
                <Link  to='/listbus'  class="btn btn-style  btn-style-border" type="submit">
                  <Fab className={classes.root} variant="extended">Manage Buses</Fab>
                </Link>*/}
                <Link  to='/'  class="btn btn-style  btn-style-border" type="submit">
                  <Fab className={classes.root} variant="extended"><LogoutIcon/>SignOut</Fab>
                </Link> 
                
       
        </Toolbar>
      </AppBar>
    </Box>
    </Container> 
    <SearchBus/>
    
    </>
  )
}

export default MasterHome