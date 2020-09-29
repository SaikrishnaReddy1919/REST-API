const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config(); 

//connection
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex : true
    }
).then(() => console.log(`DB CONNECTED TO -> ${process.env.DATABASE}`))
    .catch((err) => {
        console.log(err)
    })


app.use(express.json())
const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)
//port

app.listen(3000, () => console.log("server listening at 3000"))
