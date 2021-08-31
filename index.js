require('dotenv').config()

const express = require('express')
const app = express()

const connectDB = require('./config/db.config')
connectDB()

const multer = require('multer')

const path = require('path')

const userRouter = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

app.use("/images", express.static(path.join(__dirname,"public/images")))

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', userRouter)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname)
    } 
})

const upload = multer({storage})
app.post('/api/upload', upload.single("file"), (req,res) => {
    try {
        return res.status(200).json("File Uploaded Successfully")
    } catch (error) {
        console.log(error)
    }
})

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server up and running on ${PORT}`)
})