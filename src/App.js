
import "./App.css";
import Signup from "./components/SignUp/SignUp";

import SignIn from "./components/SignIn/SignIn";
// import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SearchBus from "./components/SearchBus/SearchBus";
import GetBus from "./Pages/GetBus";
import ListBus from "./Pages/ListBus";
import Passenger from "./Pages/Passenger";
import BusSeats from "./Pages/BusSeats";
import AddBus from "./components/AddBus";
import AddRoutes from "./components/AddRoutes";
import EditBus from "./components/EditBus";
import EditRoute from "./components/EditRoute";
import ListRoutes from "./Pages/ListRoutes";
import ListUser from "./Pages/ListUser";
import CustomizedDialogs from "./components/Dialog";
import MasterHome from "./Pages/MasterHome";
import MapDialog from "./components/MapDialog";
import { useState } from "react";
import MapDialog2 from "./components/MapDialog";

import {NotificationManager,NotificationContainer} from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import FinalPage from "./Pages/FinalPage";
import BookingHistory from "./Pages/ListBooking";
import CreateBus from "./Pages/CreateBus";
function App() {
  const [busId,setBusId]=useState("");

  const busIdHandler=(id)=>{
    setBusId(id)
    
  }
  return (
    <>
    {/* <MapDialog2/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/master" element={<MasterHome />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/newbus" element={<CreateBus />}></Route>
          <Route path="/search" element={<SearchBus />}></Route>
          <Route path="/buslist" element={<GetBus />}></Route>
          <Route path="/finalpage" element={<FinalPage />}></Route>
          <Route path="/addbus" element={<CustomizedDialogs><AddBus /></CustomizedDialogs>}></Route>
          <Route path="/map" element={<MapDialog BusId={busId}/>}></Route>
          <Route path="/addroute" element={<AddRoutes />}></Route>
          <Route path="/editbus/:id" element={<EditBus />}></Route>
          <Route path="/busseats" element={<BusSeats />}></Route>
          <Route path="/listbus" element={<ListBus BusId={busIdHandler} />}></Route>
          <Route path="/listuser" element={<ListUser />}></Route>
          <Route path="/listroutes" element={<ListRoutes />}></Route>
          <Route path="/mybookings" element={<BookingHistory />}></Route>
          <Route path="/editroute/:id" element={<EditRoute />}></Route>
        </Routes>
      </BrowserRouter>
      <NotificationContainer/>
    </>
    // <><SearchBus/></>

    /* <Navbar />
  
    // 
    // <SignIn/>
    // <SignUp/> */
  );
}
export default App;
