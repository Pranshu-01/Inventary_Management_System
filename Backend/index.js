const express=require('express');
const app=express();
const port=5000;
const itemRoute=require('./routes/item');
const authRoute=require('./routes/auth');

const cors=require('cors');
app.use(cors({
    origin:"*"
}))

const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const dotenv=require('dotenv');
dotenv.config();

const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Database Connected Successfully')
})
.catch((err)=>{
    console.log(err);
})

app.use('/api/items',itemRoute);
app.use('/api/auth',authRoute);

app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
})