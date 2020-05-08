const express=require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
// DB connection
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true },
    ()=> console.log('connected to db'))
// import routes
const authRoute = require('./routes/auth')
const privateRoute = require('./routes/privateRoute')

app.use(express.json())
app.use('/api/user',authRoute);
app.use('/api/private',privateRoute)

app.listen(3000,()=>{
  console.log('server running');
})