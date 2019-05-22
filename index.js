const express = require("express");
const gpio = require("rpi-gpio");
const path=require("path")

gpiop= gpio.promise;

var app = express();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/lighton',(req,res)=>{
    gpiop.setup(7, gpio.DIR_OUT)
    .then(() => {
        return gpiop.write(7, true);
    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })
    console.log("ligth is on");
    res.redirect('/');
});

app.get('/lightoff',(req,res)=>{
    gpiop.setup(7, gpio.DIR_OUT)
    .then(() => {
        return gpiop.write(7, false)
    })
    .catch((err) => {
        console.log('Error: ', err.toString())
    })
    console.log("ligth is off");
    res.redirect('/')
})

app.listen(8000,()=>{
    console.log('App is running')
})
