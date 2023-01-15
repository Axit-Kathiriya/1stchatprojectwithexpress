//const http = require('http')

const express = require('express')

const fs = require('fs')

const bodyparser = require('body-parser')

const app = express()
//const adminrouts = require('./routes/admin')

app.use(bodyparser.urlencoded({extended:false}))

//app.use(adminrouts)

app.get('/login',(req,res,next)=>{
    res.send(
        `
        <form onsubmit="localStorage.setItem('username',document.getElementById('username').value)" action='/' method='POST'>
        <input type ='text' name ='user' id='username'><button type='submit'>login</button></form>`
    )
    })

 app.get("/",(req,res,next)=>{
  
    fs.readFile("username.txt",(err,data)=>{
        if(err){
            console.log(err)
            data = "no chats are there"
        }
        res.send(`${data}<form action='/' method='post' onsubmit="document.getElementById('username').value = localStorage.getItem('username')" >
        <input type="text" name="message" id="message">
        <input type="hidden" name="username" id="username">
        <button type="submit">Send</button>
        </form>`)
 })

})

    app.post('/',(req,res)=>
    {
    console.log(req.body)
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt",`${req.body.username}:${req.body.message}`,{flag : "a"},
    (err)=>{err ? console.log(err) : res.redirect('/')
})
})
//module.exports = router

app.listen(4000)
