import axios from 'axios'
import { loginFailure, loginStart, loginSuccess } from '../redux/features/userRedux';

// const URL="http://localhost:5000/api"
const URL="https://cute-ruby-vulture-cape.cyclic.cloud/api"

export const addItems=(data)=>{
    try{
        return axios.post(`${URL}/items`,data);
    }
    catch(err){
        console.log('Error while calling addItems api');
    }
}

export const getItems=()=>{
    try{
        return axios.get(`${URL}/items`);
    }
    catch(err){
        console.log('Error while calling getItems api');
    }
}

export const getItem=(id)=>{
    try{
        return axios.get(`${URL}/items/${id}`);
    }
    catch(err){
        console.log('Error while calling getItem api');
    }
}

export const updateItem=(id,data)=>{
    try{
        return axios.post(`${URL}/items/${id}`,data);
    }
    catch(err){
        console.log('Error while calling updateItem api');
    }
}

export const deleteItem=(id)=>{
    try{
        return axios.delete(`${URL}/items/${id}`);
    }
    catch(err){
        console.log('Error while calling deleteItem api');
    }
}

export const register=(data)=>{
    try{
        return axios.post(`${URL}/auth/register`,data);
    }
    catch(err){
        console.log(`Error while calling register api`);
    }
}

export const login=async(dispatch,user)=>{
    dispatch(loginStart());
    try{
        const response=await axios.post(`${URL}/auth/login`,user);
        dispatch(loginSuccess(response.data));
    }
    catch(err){
        dispatch(loginFailure());
    }
}