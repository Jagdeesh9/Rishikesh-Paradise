require('dotenv').config()
const { urlencoded } = require('body-parser');
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const app = express()
const PORT =80;
// console.log(process.env)

//db setup
mongoose.connect(process.env.MONGO_URL)
.then((res)=>console.log('connected'))
.catch((err)=>console.log(err));  


//url encoder
app.use(express.urlencoded({extended:false}));//extrac data from url

const userSchema = new mongoose.Schema({
  name:{
      type:String
  },
  number:{
      type:Number
  },
  email:{
      type:String,
      unique:true
  },
})

const massageSchema = new mongoose.Schema({
  name:{
      type:String
  },
  massage:{
      type:String,
  },
})

const bookingSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  booking:{
    type:String,
  },
  email:{
    type:String,
  },
  number:{
    type:Number,
  },
  total:{
    type:Number,
  },
  checkIn:{
    type:Date,
  },
  checkOut:{
    type:Date,
  }
})

const fileSchema = new mongoose.Schema({
  file:{
    type:String,
  },
  description:{
    type: String,
  },
})

//models
const userModel = mongoose.model("users",userSchema);
const massageModel = mongoose.model("massage",massageSchema);
const bookingModel = mongoose.model("booking",bookingSchema);
const fileModel = mongoose.model("file", fileSchema);

//static file
app.use(express.static(path.join(__dirname, 'public')));

// Set the 'views' directory
app.set('views', path.join(__dirname, 'views'));


// Set the view engine to EJS
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})
app.get('/about', (req, res) => {
  res.render('about')
})
app.get('/services', (req, res) => {
  res.render('services')
})
app.get('/booking', (req, res) => {
  res.render('booking')
})
app.get('/gallary', (req, res) => {
  res.render('gallary');
})



app.post("/book",async (req,res)=>{
  const user = await userModel.create({
       name:req.body.name,
       number:req.body.number,
       email:req.body.email,
   })
   res.render('book');
})

app.post("/massage",async (req,res)=>{
  const massage = await massageModel.create({
       name:req.body.name,
       massage:req.body.massage,
   })
   res.render('massage');
})

app.post("/register",async (req,res)=>{
  console.log(req.body);
  const booking = await bookingModel.create({
    name:req.body.name,
    booking:req.body.booking,
    total:req.body.total,
    checkIn:req.body.checkIn,
    checkOut:req.body.checkOut,
    number:req.body.number,
    email:req.body.email,
  })
  res.render('book');
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})