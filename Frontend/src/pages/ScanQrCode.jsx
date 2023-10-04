import { Box, Button, styled, useMediaQuery } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import QrReader from 'react-qr-reader'
import { getItem, updateItem } from '../services/api'
import { useNavigate } from 'react-router-dom'

const Container=styled(Box)`
	padding: 60px 50px;
    
   
`

const Wrapper=styled(Box)(({theme})=>({
    display: "flex",
    justifyContent: "space-evenly",
    [theme.breakpoints.down('md')]:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column"
    }
}))
    


const Left=styled(Box)(({theme})=>({
    /* flex: 1; */
    width: "35%",
	boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    padding: "30px",
    [theme.breakpoints.down('md')]:{
        width:"100%",
        // marginTop:"60px",
        // flex:"1"
    }
}))
    

const LeftWrapper=styled(Box)`
    display: flex;
    flex-direction: column;
`

const Right=styled(Box)(({theme})=>({
    /* flex: 1; */
    width: "35%",
	boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    padding: "30px",
    [theme.breakpoints.down('md')]:{
        // flex:"1",
        width:"100%",
        marginTop:"60px",
    }
}))

const Heading=styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 10px;
    color:#002884;
    font-weight: 500;
`

const ButtonWrapper=styled(Button)`
    width: 100%;
    margin-top: 12px;
    box-shadow: none;
    text-transform: none;
    font-family: 'Lexend', sans-serif;
    border: 0.5px solid #002884;
    background-color: #002884;
    font-size: 14px;
    transition: 0.5s ease;
    border-radius: 2px;
    color:#ffffff;
    &:hover{
        background-color: #002674;
    }
`

const Error=styled(Box)`
    color:red;
    /* font-size: 14px; */
    margin-bottom: 10px;
    text-align: center;
`

const ScanQrCode = () => {

    const tablet = useMediaQuery('(min-width:769px)');

    const [resultData,setResultData]=useState('');    

    // const [id,setId]=useState();

    const [webResult,setWebResult]=useState('');

    const [legacyMode,setLegacyMode]=useState(true);

    const qrRef=useRef(null);

    const [error,setError]=useState("");

    const [err,setErr]=useState("");

    // const handleScan=async(result)=>{
    //     if(result){
    //         setResultData(result);
    //         const currentDate = new Date();

    //         // Extract year, month, and date
    //         const year = currentDate.getFullYear();
    //         const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it is 0-based
    //         const date = currentDate.getDate().toString().padStart(2, '0');

    //         // Join them in the same format (e.g., "yyyy-mm-dd")
    //         const formattedDate = `${year}-${month}-${date}`;

    //         setData({...JSON.parse(result),date:{...JSON.parse(result).date,dispatched_date:formattedDate},quantity:{...JSON.parse(result).quantity,dispatched_quantity:JSON.parse(result).quantity.received_quantity-1}})

            
    //     }
    // }

    

    const navigate=useNavigate();

    const handleScan=async(result)=>{
        if(result){
            try{
            const id=(JSON.parse(result).id)

            let data={
                name:"",
                date:{},
                quantity:{}
            }

            console.log(id);

            const response=await getItem(id);
            
            if(response.data.quantity.received_quantity==response.data.quantity.dispatched_quantity){
                setError("Item Already Dispatched");
            }

            else{
                setError("");
            const currentDate = new Date();

            // Extract year, month, and date
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it is 0-based
            const date = currentDate.getDate().toString().padStart(2, '0');

            // Join them in the same format (e.g., "yyyy-mm-dd")
            const formattedDate = `${year}-${month}-${date}`;

            // setData({...response.data,date:{...response.data.date,dispatched_date:formattedDate},quantity:{...response.data.quantity,dispatched_quantity:response.data.quantity.received_quantity-1}});

            data=({...response.data,date:{...response.data.date,dispatched_date:formattedDate},quantity:{...response.data.quantity,dispatched_quantity:response.data.quantity.dispatched_quantity ? response.data.quantity.dispatched_quantity+1 : 1  }});

            console.log(data);
            await updateItem(id,data);

            navigate("/");
            }
        }
        catch(err){
            setError("QR Code Not Valid!!!");
        }
    }
    }

    
    const handleError=(error)=>{
        console.log(error);
    }

    const openDialog=()=>{
        qrRef.current.openImageDialog()
    }

    const handleWebScan=async(result)=>{
        if(result){
            try{
            const id=(JSON.parse(result).id)

            let data={
                name:"",
                date:{},
                quantity:{}
            }

            console.log(id);

            const response=await getItem(id);
            
            if(response.data.quantity.received_quantity==response.data.quantity.dispatched_quantity){
                setErr("Item Already Dispatched");
            }

            else{
                setErr("");
            const currentDate = new Date();

            // Extract year, month, and date
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it is 0-based
            const date = currentDate.getDate().toString().padStart(2, '0');

            // Join them in the same format (e.g., "yyyy-mm-dd")
            const formattedDate = `${year}-${month}-${date}`;

            // setData({...response.data,date:{...response.data.date,dispatched_date:formattedDate},quantity:{...response.data.quantity,dispatched_quantity:response.data.quantity.received_quantity-1}});

            data=({...response.data,date:{...response.data.date,dispatched_date:formattedDate},quantity:{...response.data.quantity,dispatched_quantity:response.data.quantity.dispatched_quantity ? response.data.quantity.dispatched_quantity+1 : 1  }});

            console.log(data);
            await updateItem(id,data);

            navigate("/");
            }
            
        }
        catch(err){
            setErr("QR Code Not Valid!!!");
        }
    }  
    }

    const handleWebError=(error)=>{
        console.log(error);
    }

    const handleClick=()=>{
        if(legacyMode===true){
            setLegacyMode(false);
        }
        else{
            setLegacyMode(true);
        }
    }

  return (
    <>
        <Container>
            <Wrapper>
                <Left>
                    <Heading>Upload QR Code</Heading>
                    {error.length>0 && <Error>{error}</Error>}
                    <LeftWrapper>
                        <QrReader
                            ref={qrRef}
                            delay={300}
                            onScan={handleScan}
                            onError={handleError}
                            style={{width:"100%"}}
                            legacyMode={true}
                        />
                        <ButtonWrapper disableElevation disableRipple variant="contained" onClick={openDialog}>Upload</ButtonWrapper>
                    </LeftWrapper>
                    {/* {JSON.stringify(data)} */}
                    {/* {resultData} */}
                </Left>
                <Right>
                <Heading>Scan QR Code</Heading>
                {err.length>0 && <Error>{err}</Error>}

                    <QrReader
                        delay={300}
                        onScan={handleWebScan}
                        onError={handleWebError}
                        style={{width:"100%"}}
                        legacyMode={legacyMode}
                    />
                    <ButtonWrapper disableElevation disableRipple variant="contained" onClick={handleClick}>{legacyMode? (tablet ? "Enable WebCam" : "Enable Camera") : (tablet ? "Disable WebCam" : "Disable Camera")}</ButtonWrapper>
                    {/* {webResult} */}
                </Right>
            </Wrapper>
        </Container>
    </>
  )
}

export default ScanQrCode