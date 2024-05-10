const express = require('express')
const app = express()
const port = 3000
const mongoose=require('mongoose');
const path=require('path');
const fs=require('fs');
const router=require('./routes/thisRout.js');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('views','./views');
app.set('view engine','ejs');

app.use('/',router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))