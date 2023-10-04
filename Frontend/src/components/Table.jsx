import { Box, IconButton, Typography, styled, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { deleteItem, getItems } from '../services/api';
import QRCode from 'qrcode.react';
import {Delete, Edit} from '@mui/icons-material';

import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = styled(Box)(({theme})=>({
	padding: "60px 50px",
	[theme.breakpoints.down('lg')]:{
		padding:"60px 20px"
	},
}))


const Wrapper = styled(Box)`
	/* display: flex;
	align-items: center;
	justify-content: center; */
`;

const TableWrapper = styled('table')(({theme})=>({
	border: '1px solid #002884',
	borderRadius: '4px',
	width: '100%',
	padding: '10px 10px',
	
}))
	



const Tr=styled('tr')(({theme})=>({
	textAlign:"center",
	
}))


const Td=styled('td')(({theme})=>({
	textAlign:"center",
	padding:"0px 5px",
	
}))



const AdminWrapper=styled(Box)`
`

const IconButtonWrapper=styled(IconButton)(({theme})=>({
	
}))

const EditIcon=styled(Edit)(({theme})=>({
	color:"black",
	
}))

const DeleteIcon=styled(Delete)(({theme})=>({
	color:"black",
	
}))

const BoxWrapper=styled(Box)`
	border: 1px solid #696969;
	border-radius: 2px;
	padding: 10px;
	margin: 20px 0px;
	/* width: 100%; */
`

const ItemsWrapper=styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 10px;
	
`

const Left=styled(Box)`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-start;
`

const Right=styled(Box)`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`


	

const Table = () => {

	// const [spacing,setSpacing]=useState(30);

	// const tablet = useMediaQuery('(min-width:1058px)');

	const user=useSelector((state)=>state.user.currentUser);

	const Mobile = useMediaQuery('(min-width:1058px)');

	const [data, setData] = useState([]);
    // const qrCodeData = 'https://www.example.com';

	useEffect(() => {
		getAllItems();
	}, []);

	const getAllItems = async () => {
		const response = await getItems();
		setData(response.data);
	};


	  const handleDownloadQRCode = (items) => {
		if(items) {
		  const qrCodeDataURL = document
			.getElementById(`${items._id}`)
			.toDataURL('image/png');
	
		  saveAs(qrCodeDataURL, `${items._id}.png`);
		}
	  };

	  const deleteData=async(id)=>{
		await deleteItem(id);
		getAllItems();
	  }

	  
	return (
		<>
			

			<Container>
				<Wrapper>
					{Mobile ? <TableWrapper cellSpacing={"30"}>
						<Tr style={{ color: '#002884' }}>
							<Td>Name</Td>
							<Td>Date Received/Quantity</Td>
							<Td>Date Dispatched/Quantity</Td>
							<Td>Pending Items</Td>
							<Td>Status</Td>
							<Td>QR Code (Click to download)</Td>
							<Td>Admin Panel</Td>
						</Tr>
						{data.map((items) => {
							return (
								<>
									<Tr>
										<Td>{items.name}</Td>
										<Td>{items.date.received_date.split("-").reverse().join("-")}/{items.quantity.received_quantity}</Td>
                                        {items.quantity.dispatched_quantity
										? 
										<Td>{items.date.dispatched_date.split("-").reverse().join("-")}/{items.quantity.dispatched_quantity}</Td>
										:
										<Td>-----------</Td>
										}
										{
                                            items.quantity.dispatched_quantity
                                            ? 
                                            <Td>{items.quantity.received_quantity-items.quantity.dispatched_quantity}</Td>
                                            : 
                                            <Td>{items.quantity.received_quantity}</Td>
                                        }
										<Td>{items.quantity.received_quantity==items.quantity.dispatched_quantity ? "Dispatched" : "Pending"}</Td>
                                        <Td>
										 {(
                                            <QRCode
                                                // id="qr-gen"
												id={items._id}
                                                value={JSON.stringify({id:items._id,name:items.name,date:items.date,quantity:items.quantity})}
                                                level='M'
                                                size={140}
                                                bgColor="#ffffff"
                                                onClick={()=>handleDownloadQRCode(items)}
                                            />
                                        )}
                                        </Td>
										<Td>
											<AdminWrapper>
												<Link to={`edit/${items._id}`}><IconButtonWrapper><EditIcon/></IconButtonWrapper></Link>
												{
												user 
												?
												<IconButtonWrapper><DeleteIcon onClick={()=>deleteData(items._id)}/></IconButtonWrapper>
												:
												<Link to="/login" style={{textDecoration:"none",color:"inherit"}}><IconButtonWrapper><DeleteIcon/></IconButtonWrapper></Link>
												}
											</AdminWrapper>
										</Td>
									</Tr>
								</>
							);
						})}
					</TableWrapper>
					:
					<TableWrapper cellSpacing={"0"}>
						{
							data.map((items)=>{
								return (
									<>
										<BoxWrapper>
											<ItemsWrapper>
												<Left>Name</Left>
												<Right>{items.name}</Right>
											</ItemsWrapper>
											<ItemsWrapper>
												<Left>Date Received</Left>
												<Right>{items.date.received_date.split("-").reverse().join("-")}</Right>
											</ItemsWrapper>
											<ItemsWrapper>
												<Left>Received Quantity</Left>
												<Right>{items.quantity.received_quantity}</Right>
											</ItemsWrapper>
											<ItemsWrapper>
												<Left>Date Dispatched</Left>
												<Right>
												{
													items.quantity.dispatched_quantity
													? 
													<>{items.date.dispatched_date.split("-").reverse().join("-")}</>
													:
													<>-----------</>
												}
												</Right>
											</ItemsWrapper>
											<ItemsWrapper>
												<Left>Dispatched Quantity</Left>
												<Right>{items.quantity.dispatched_quantity?items.quantity.dispatched_quantity:"-----------"}</Right>
											</ItemsWrapper>

											<ItemsWrapper>
												<Left>Pending Items</Left>
												<Right>
												{
													items.quantity.dispatched_quantity
													? 
													<>{items.quantity.received_quantity-items.quantity.dispatched_quantity}</>
													: 
													<>{items.quantity.received_quantity}</>
                                        		}
												</Right>
											</ItemsWrapper>

											<ItemsWrapper>
												<Left>Status</Left>
												<Right>{items.quantity.received_quantity==items.quantity.dispatched_quantity ? "Dispatched" : "Pending"}</Right>
											</ItemsWrapper>

											<ItemsWrapper>
												<Left>QR Code</Left>
												<Right>
												{(
												<QRCode
													// id="qr-gen"
													id={items._id}
													value={JSON.stringify({id:items._id,name:items.name,date:items.date,quantity:items.quantity})}
													level='M'
													size={70}
													bgColor="#ffffff"
													onClick={()=>handleDownloadQRCode(items)}
												/>
                                        		)}
												</Right>
											</ItemsWrapper>

											<ItemsWrapper>
												<Left>Admin Panel</Left>
												<Right>
													<AdminWrapper>
														<Link to={`edit/${items._id}`}><IconButtonWrapper><EditIcon/></IconButtonWrapper></Link>
														{
														user 
														?
														<IconButtonWrapper><DeleteIcon onClick={()=>deleteData(items._id)}/></IconButtonWrapper>
														:
														<Link to="/login" style={{textDecoration:"none",color:"inherit"}}><IconButtonWrapper><DeleteIcon/></IconButtonWrapper></Link>
														}
													</AdminWrapper>
												</Right>
											</ItemsWrapper>
										</BoxWrapper>
									</>
								)
							})
						}
					</TableWrapper>}
				</Wrapper>
			</Container>
		</>
	);
};

export default Table;
