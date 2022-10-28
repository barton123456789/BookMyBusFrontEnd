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
import { AppBar, Box, Button, Fab, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function AdminRoutes() {
  const [user, setUser] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  //   function changeRole(role,user_id) {
  //     axios.put(`http://localhost:8080/app/users/change_role?role=${role}&userId=${user_id}`).then(() => {
  //       setRefresh(true);
  //     });
  //   }

  function changeRoleData(user_id) {
    axios.put(`http://localhost:8080/app/users/change_role?userId=${user_id}`).then(() => {
      setRefresh(true);
    });
  }

  React.useEffect(
    (e) => {
      axios.get("http://localhost:8080/app/users/").then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
    },
    [refresh]
  );

  console.log(user);

  return (
    <> <Box sx={{ flexGrow: 1 }}>
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
        <Typography variant="h4" >BookMyBus.com</Typography>
        
          
      </Toolbar>
    </AppBar>
  </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">UserName</TableCell>
            <TableCell align="center">FullName</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Age</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.map((user) => (
            <TableRow
              key={user.user_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {user.user_id}
              </TableCell>
              <TableCell align="center">{user.full_Name}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.age}</TableCell>
              <TableCell align="center">{user.gender}</TableCell>
              <TableCell align="center">{user.role}</TableCell>
              <TableCell align="center">
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => changeRoleData(user.user_id)}
                >
                  Make Admin
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
