const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')


//Register
router.post('/register', async (req,res) => {
    try {
        const {username,email,password} = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await new User({username, email, password : hashedPassword})
        
        const user = await newUser.save()

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({
            message : error.message,
        })
    }
})

//Login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("Invalid Credentials");
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("Invalid Credentials")
  
      return res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
      // console.log(err.message)
    }
  });

module.exports = router