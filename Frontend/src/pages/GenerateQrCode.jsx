import { Box, InputBase, styled } from '@mui/material';
import React, { useState } from 'react';
import { addItems } from '../services/api';
import { useNavigate } from 'react-router-dom';

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
    font-size: 18px;
    margin-bottom: 10px;
    color:#002884;
    font-weight: 500;
`

const Text = styled(Box)`
    font-size: 14px;
    color: #696969;
`;

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

const Select=styled('select')({
    border: "1px solid lightgray",
	width: "100%",
	padding: "7px 10px",
	borderRadius: "2px",
	margin: "10px 0px",
})

const Option=styled('option')({
})

const GenerateQrCode = () => {

	const navigate=useNavigate();

    const [data,setData]=useState({
        name:'',
        date:{
			received_date:''
		},
		quantity:{
			received_quantity:''
		}
    })

	const handleName=(e)=>{
		setData({...data,name:e.target.value});
	}

    const handleDate=(e)=>{
        setData({...data,date:{received_date:e.target.value}})
    }

	const handleQuantity=(e)=>{
        setData({...data,quantity:{received_quantity:e.target.value}})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
		await addItems(data);
		navigate('/');
    }

	return (
		<>
			<Container>
				<Wrapper>
					<Heading>Generate QR Code</Heading>
					<Form onSubmit={handleSubmit}>
						<Text>Name</Text>
						<Select name='name' onChange={handleName} required>
                            <Option selected disabled hidden>Select (C1-C5)</Option>
                            <Option value="C1">C1</Option>
                            <Option value="C2">C2</Option>
                            <Option value="C3">C3</Option>
                            <Option value="C4">C4</Option>
                            <Option value="C5">C5</Option>
                        </Select>
						<Text>Date</Text>
						<Input type="date" name='date' onChange={handleDate} required/>
						<Text>Quantity</Text>
						<Input type="number" name='quantity' inputProps={{min:"1"}} onChange={handleQuantity} required/>
						<Button>Generate QR</Button>
					</Form>
				</Wrapper>
			</Container>
		</>
	);
};

export default GenerateQrCode;
