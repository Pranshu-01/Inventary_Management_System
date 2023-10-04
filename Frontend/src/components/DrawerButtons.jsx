import { Box,Button,Typography,styled } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/features/userRedux'

const Container=styled(Box)`
`

const Wrapper=styled(Box)``

const CenterWrapper=styled(Box)`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
`


const Center=styled(Typography)`
    font-size: 20px;
`

const RightWrapper=styled(Box)`
    display: flex;
    flex-direction: column;
`

const RightButton=styled(Button)`
    box-shadow: none;
    width: 80%;
    text-transform: none;
    font-family: 'Lexend', sans-serif;
    padding: 6px 30px;
    border: 0.5px solid #002884;
    font-size: 14px;
    transition: 0.5s ease;
    color:#002884;
    &:hover{
        background-color: #002884;
        color: #ffffff;
    }
`


const DrawerButtons = () => {

    const user=useSelector((state)=>state.user.currentUser);

    const dispatch=useDispatch();

  return (
    <>
        <Container>
            <Wrapper>
            <CenterWrapper>
                <Link to="/generate-qr-code" style={{textDecoration:"none",color:"inherit"}}>
                    {<Center variant='span'>Generate QR Code</Center>}
                </Link>
                <Link to="/scan-qr-code" style={{textDecoration:"none",color:"inherit",marginTop:"10px"}}>
                    <Center variant='span'>Scan QR Code</Center>
                </Link>
            </CenterWrapper>

            <RightWrapper>
                <Link to="/login">
                    {!user && <RightButton disableElevation variant='outlined' style={{marginRight:"20px"}}>Sign in</RightButton>}
                </Link>
                <Link to="register">
                    {!user && <RightButton disableElevation variant='contained' style={{backgroundColor:"#002884",color:"#ffffff",marginTop:"10px"}}>Register</RightButton>}
                </Link>

                <Link onClick={()=>dispatch(logout())}>
                    {user && <RightButton disableElevation variant='contained' style={{backgroundColor:"#002884",color:"#ffffff"}}>Logout</RightButton>}
                </Link>
            </RightWrapper>
            </Wrapper>
        </Container>
    </>
  )
}

export default DrawerButtons