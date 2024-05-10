const express = require('express')
const mongoose=require('mongoose');
const { type } = require('os');
const path=require('path');
const router=express.Router();
const uri='mongodb+srv://collegedb:collegedb123@cluster0.yubriwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


//schema
const crudSchema=mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim:true,
    },
    age: {
        type: Number,
        required:true,
        min:12, max:80,
    },
    fees: {
        type: mongoose.Decimal128,
        required: true,
        min:100,max:100000
    },
})
//model compile
const crudModel=mongoose.model('cruddata',crudSchema);
//connection run
async function run() {
    try {
        const dboption={
            dbname:'cruddb',
        }
        await mongoose.connect(uri,dboption);
        console.log('connected db');
    } catch(err) {
        console.log(err);
    }
}

run();

//all data read
const getAllData = async () =>{
    try {
        const res= await crudModel.find();
        return res;
    } catch (err) {
        console.log(err);
    }
}

// getAllData().then(data=>{
//     console.log(data);
// })

router.get('/',(req, res)=>{
    getAllData().then(data=>{
        res.render('index' ,{data: data});
    })
})

router.post('/', async (req, res)=>{
    const {name, age, fees}=req.body;
    const createDoc= new crudModel({
        name: name,
        age:age,
        fees: fees,
    })
    try {
        // console.log(name);
        await createDoc.save();
        res.status(200).redirect('/');
    } catch (err) {
        console.log(err);
        res.status(500).send('error to insert');
    }
})

router.get('/edit/:id', async (req, res)=>{
    let id=req.params.id;
    try {
        const result= await crudModel.findById(id);
        // console.log(result);
        res.render('edit',{data: result});
    } catch (err) {
        console.log(err);
    }
   
})

router.post('/update/:id', async (req, res)=>{
const id = req.params.id.trim();
const { name, age, fees } = req.body;

const updateData = async (id) => {
    try {
        const result = await crudModel.findByIdAndUpdate(id, { name: name.trim(), age: age.trim(), fees: fees.trim() });
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

updateData(id); // Call the function to execute the update
})

router.post('/delete/:id',async (req, res)=>{
    let id=req.params.id.trim();
    // console.log(id);
    const deleteDoc = async (id) =>{
        try {
            const del= await crudModel.findByIdAndDelete(id);
            console.log(del);
            res.redirect('/')
        } catch (err) {
            console.log(err);
        }
    }
    deleteDoc(id);
})

module.exports=router;