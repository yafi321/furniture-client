import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import FurnitureList from './pages/FurnitureList'
import SignUp from "./pages/SignUp"
import { Route,Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import LoginUser from "./pages/LoginUser"
import CheckOut from './pages/CheckOut'
import OneFurniture from './pages/OneFurniture'
import Cart from './pages/Cart'
import AddFurniture from './pages/AddFurniture'


function App() {

  return (
    <>
    <NavBar></NavBar>
    {/* <FurnitureList/> */}
    {/* <OneFurniture/> */}

    <Routes>
    
      <Route path="list" element={<FurnitureList/>}/>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="login" element={<LoginUser/>}/>
      <Route path="checkout" element={<CheckOut/>}/>
      <Route path="cart" element={<Cart/>}/>
      <Route path="addfurniture" element={<AddFurniture/>}/>
      <Route path="*" element={<FurnitureList/>}/>

    </Routes>
    </>
  )
}

export default App
