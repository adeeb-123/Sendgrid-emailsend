const express = require("express")
const app = express()
const hbs = require("hbs")


const sgMail = require('@sendgrid/mail')
const api_key = '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'

sgMail.setApiKey(api_key)
const port = process.env.PORT || 3000

// Static Files
app.use(express.json())
app.use(express.urlencoded({extended:false}));


app.use(express.static('public'))
// app.use(express.static(__dirname + 'public/index'))

// Set Views
app.set('views' , '../views')
app.set("view engine" , "hbs")
app.set("views" , "../templates/views")
hbs.registerPartials("../templates/partials")


app.get("/" , (req,res)=>{
    res.render("index")
})
app.get("/index" , (req,res)=>{
    res.render("index")
})

app.get("/register" , (req,res)=>{
    res.render("register")
})

app.get("/login" , (req,res)=>{
    res.render("login")
})

// create a new user in our database
app.post("/register" , async (req,res)=>{
    try {

        const password = req.body.password
        const cpassword = req.body.confPass

        if (password === cpassword) {
            const message = {
                to: req.body.email,
                from : "adeebsiddiqui77@gmail.com",
                subject : "Your Registered Details",
                html: `<h2>Your Account Details</h2>
                <h3>Name : ${req.body.fname} ${req.body.lname}</h3>
                <h3>Email : ${req.body.email}</h3>
                <h3>Phone Number: ${req.body.phone}</h3>`
            };
            sgMail.send(message).then(()=>{
                console.log("Email sent successfully")
            }).catch((err)=>{
                console.log(err)
            })
            res.render("index")
        } else {
            res.send("password are not matching")
        }

    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port , ()=>{
    console.log(`server is running at port ${port}`)
})