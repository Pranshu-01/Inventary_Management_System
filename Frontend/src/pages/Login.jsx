import { Box, InputBase, styled } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';

const Container = styled(Box)`
	padding: 60px 20px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled(Box)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	/* border:1px solid black; */
	padding: 30px;
	/* box-shadow: 0px 0px 20px 0px #eee; */
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const Heading=styled(Box)`
    font-size: 26px;
    /* margin-bottom: 10px; */
    color:#002884;
    font-weight: 500;
`

const Text=styled(Box)`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 300;
    color:#696969;
    font-size: 16px;
`

const Form = styled('form')`
	width: 100%;
	padding: 20px 40px;
	border-radius: 2px;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

const Input = styled(InputBase)`
	border: 1px solid lightgray;
	width: 100%;
	padding: 0px 10px;
	border-radius: 2px;
	margin: 10px 0px;
`;

const Button = styled('button')({
	background: '#002884',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: '#ffffff',
	width: '100%',
	padding: '10px 10px',
	margin: '20px 0px',
	letterSpacing: '0.5px',
	border: 'none',
	borderRadius: '2px',
	cursor: 'pointer',
	transition:"0.2s ease",
	"&:hover":{
		background: '#002674'
	}
});

const Error=styled(Box)`
    /* width: 100%; */
    color:#fe0000;
    font-size: 10px;
    /* font-weight: 500; */
`

const Login = () => {

    const dispatch=useDispatch();

    const navigate=useNavigate();

    const {error}=useSelector((state)=>state.user);

    const {isFetching}=useSelector((state)=>state.user);

    const [data,setData]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        await login(dispatch,data);
    }

  return (
    <>
        <Container>
            <Wrapper>
			    <Heading>Sign in</Heading>
                <Text>Welcome, login to continue</Text>
                <Form onSubmit={handleSubmit}>
					<Input type='email' name='email' placeholder='Email' onChange={handleChange} required/>
					<Input type='password' name='password' placeholder='Password' onChange={handleChange} required/>
                    {error && <Error>Your email or password was entered incorrectly.</Error>}
                    <Button>{isFetching ? "Signing in..." : "Sign in"}</Button>
                    <Text>Don't have an account? <Link to="/register" style={{marginLeft:"5px",textDecoration:"underline",color:"#002884"}}>Register</Link></Text>
                </Form>
            </Wrapper>
        </Container>
    </>
  )
}

export default Login