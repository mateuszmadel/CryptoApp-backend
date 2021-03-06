const express=require('express');
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const coinsData = require('./middlewares/coinsData')
dotenv.config();
// DB connection
mongoose.set('useUnifiedTopology', true);
mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true,useCreateIndex: true },
    ()=> console.log('Connected to db'))

// import routes
const authRoute = require('./routes/auth')
const converterRoute = require('./routes/converter')
const purchasesRoute = require('./routes/purchases')
const listRoute = require('./routes/list')
const notificationsRoute=require('./routes/notifications')
const serverTestRoute=require('./routes/serverTest')

app.use(express.json())
app.use(cors())
app.use(cors({exposedHeaders:'auth-token'}));
app.options('*', cors())

//use routes
app.use('/api/server-test',serverTestRoute)
app.use('/api/user',authRoute);
app.use('/api/converter',converterRoute)
app.use('/api/purchases',purchasesRoute)
app.use('/api/list',listRoute)
app.use('/api/notifications',notificationsRoute)

app.listen(8080,()=>{
  console.log('Server running');
})

//updating prices every 60s
function getData( fn, delay ) {
  fn();
  setInterval( fn, delay );
}
getData(async function(){
  global.data=await coinsData();
  console.log("Coins data updated")
},60000)