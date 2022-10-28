import React from "react";
import Navbar from "../components/Navbar/Navbar";
import SignIn from "../components/SignIn/SignIn";
const Login = () => {
  return (
    <>
      <section className="navbar-bg">
        <nav class="navbar navbar-expand-lg">
          <div class="container">
            <a class="navbar-brand" href="#">
              Busbuddy
            </a>
          </div>
        </nav>
      </section>
      <SignIn />
    </>
  );
};

export default Login;
