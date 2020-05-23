const express=require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config();
// DB connection
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true },
    ()=> console.log('connected to db'))
// import routes
const authRoute = require('./routes/auth')
const converterRoute = require('./routes/converter')
app.use(express.json())
app.use(cors())
app.use(cors({exposedHeaders:'auth-token'}));
app.options('*', cors())
app.use('/api/user',authRoute);
app.use('/api/converter',converterRoute)

app.listen(3000,()=>{
  console.log('server running');
})