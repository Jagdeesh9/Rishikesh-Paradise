const { urlencoded } = require('body-parser');
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const app = express()
const port = 3000

//db setup
mongoose.connect("mongodb://127.0.0.1:27017/Rishikesh_Paradise")
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
//user model
const userModel = mongoose.model("users",userSchema);
const massageModel = mongoose.model("massage",massageSchema);

//static file
app.use(express.static(path.join(__dirname, 'public')));

// Set the 'views' directory
app.set('views', path.join(__dirname, 'views'));


// Set the view engine to EJS
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index')
})

app.post("/book",async (req,res)=>{
  const user = await userModel.create({
       name:req.body.name,
       number:req.body.number,
       email:req.body.email,
   })
   res.send("thanks we will contack you soon");
})

app.post("/massage",async (req,res)=>{
  const massage = await massageModel.create({
       name:req.body.name,
       massage:req.body.massage,
   })
   res.send('successfully submitted');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})