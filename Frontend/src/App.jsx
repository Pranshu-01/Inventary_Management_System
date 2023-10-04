import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import GenerateQrCode from './pages/GenerateQrCode'
import ScanQrCode from './pages/ScanQrCode'
import Edit from './pages/Edit'
import Login from './pages/Login'
import Register from './pages/Register'
import { useSelector } from 'react-redux'

function App() {

	const user=useSelector((state)=>state.user.currentUser);

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/generate-qr-code" element={<GenerateQrCode/>}/>
          <Route path="scan-qr-code" element={<ScanQrCode/>}/>
          <Route path="/edit/:id" element={!user? <Navigate to="/login"/> : <Edit/>}/>
          <Route path="/login" element={user? <Navigate to="/"/> : <Login/>} />
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
