import React, { createContext, useReducer, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { NotificationParent } from "./utils/Notification";
import { reducer, initialState } from "./reducer/UserReducer";
import { ProSidebarProvider } from "react-pro-sidebar";
import Errorpage from "./pages/Errorpage";
import LoginPage from "./pages/LoginPage";
import Home1 from "./pages/Home1";
import ResetPassword from "./pages/ResetPassword";
import TestPage from "./pages/TestPage";
export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      {/* <TestPage /> */}
      <NotificationParent timeout={3000} />
      <UserContext.Provider value={{ state, dispatch }}>
        <ProSidebarProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/:route" element={<Home1 />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/error" element={<Errorpage />}></Route>
          </Routes>
        </ProSidebarProvider>
      </UserContext.Provider>
    </>
  );
}

export default App;
