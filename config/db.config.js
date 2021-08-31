const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(process.env.URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    console.log('DB connected')

}

module.exports = connectDB