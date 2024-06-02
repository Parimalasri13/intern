import React from "react";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./utils/RequireAuth";
import Home from "./Pages/Home";
import Read from "./Pages/Read";
import SignIn from "./Pages/Login";
// import ForgetPassword from './Pages/ForgetPassword';
import Registration from "./Pages/Registration";
import ResetPasswordForm from "./Pages/ForgetPassword";
import MainLayout from "./layouts/MainLayout";
import HeroPage from "./Pages/Hero";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HeroPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/read" element={<Read />} />
        </Route>
        <Route path="/register" element={<Registration />} />
        <Route path="/forget-password" element={<ResetPasswordForm />} />
        <Route path="/login" element={<SignIn />} />
      </Route>
    </Routes>
  );
}

export default App;
