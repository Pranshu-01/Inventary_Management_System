import React, { useState } from 'react'
import {Box,Button,Drawer,IconButton,Typography,styled} from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/features/userRedux'
import { MenuSharp } from '@mui/icons-material'
import DrawerButtons from './DrawerButtons'

const Container=styled(Box)(({theme})=>({
    display: "grid",
    backgroundColor: "#ffffff",
    alignItems: "center",
    gridTemplateColumns:"repeat(3,1fr)",
    height: "55px",
    padding: "10px 50px",
    color: "#002884",
    fontSize: "16.5px",
    [theme.breakpoints.down('lg')]:{
        padding:"10px 20px",
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"
    }
}))
    

const Left=styled(Typography)`
    font-weight: 500;
`

const CenterWrapper=styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
`


const Center=styled(Typography)(({theme})=>({
    margin:"0px 20px",
    [theme.breakpoints.down('lg')]:{
        display:"none"
    }
}))

const RightWrapper=styled(Box)(({theme})=>({
    display:"flex",
    alignItems:"center",
    justifyContent:"flex-end",
    [theme.breakpoints.down('lg')]:{
        display:"none"
    }
}))
    


const RightButton=styled(Button)`
    box-shadow: none;
    text-transform: none;
    font-family: 'Lexend', sans-serif;
    padding: 6px 30px;
    border: 0.5px solid #002884;
    font-size: 14px;
    transition: 0.5s ease;
    color:#002884;
    &:hover{
        background-color: #002674;
        color: #ffffff;
    }
`

const MenuButton=styled(IconButton)(({theme})=>({
    display:"none",
    [theme.breakpoints.down('lg')]:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
}))

const Navbar = () => {

    const user=useSelector((state)=>state.user.currentUser);
    const dispatch=useDispatch();

    const [open,setOpen]=useState(false);

    const openDrawer=()=>{
        setOpen(true);
    }

    const closeDrawer=()=>{
        setOpen(false);
    }

    const DrawerWrapper=styled(Box)`
        background: #ffffff;
        padding: 60px 40px;
    `

  return (
    <>
        <Container>
            <Link to="/" style={{textDecoration:"none",color:"inherit"}}>
                <Left variant='span'>Inventary Management System</Left>
            </Link>

            <CenterWrapper>
                <Link to="/generate-qr-code" style={{textDecoration:"none",color:"inherit"}}>
                    {<Center variant='span'>Generate QR Code</Center>}
                </Link>
                <Link to="/scan-qr-code" style={{textDecoration:"none",color:"inherit"}}>
                    <Center variant='span'>Scan QR Code</Center>
                </Link>
            </CenterWrapper>
            <RightWrapper>
                <Link to="/login">
                    {!user && <RightButton disableElevation variant='outlined' style={{marginRight:"20px"}}>Sign in</RightButton>}
                </Link>
                <Link to="register">
                    {!user && <RightButton disableElevation variant='contained' style={{backgroundColor:"#002884",color:"#ffffff"}}>Register</RightButton>}
                </Link>

                <Link onClick={()=>dispatch(logout())}>
                    {user && <RightButton disableElevation variant='contained' style={{backgroundColor:"#002884",color:"#ffffff"}}>Logout</RightButton>}
                </Link>
            </RightWrapper>
                <MenuButton onClick={openDrawer}>
                    <MenuSharp style={{fontSize:"25px"}}/>
                </MenuButton>

                <Drawer open={open} onClose={closeDrawer} anchor='right'>
                    <Box onClick={closeDrawer}>
                        <DrawerWrapper>
                            <DrawerButtons/>
                        </DrawerWrapper>
                    </Box>
                </Drawer>

        </Container>
    </>
  )
}

export default Navbar