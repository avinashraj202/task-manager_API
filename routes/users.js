const { json } = require('body-parser');
const express = require('express');
//const Users = require('../models/Users');
const router = express.Router();
const User = require('../models/Users');

//finding all the user

router.get('/', async(req, res) =>{
    try{
        const user = await User.find();
        res.json(user);
    }catch(err){
        res.json({message : err});
    }
});

//finding data by id

router.get('/:userId',async(req, res)=>{
    try{
        const user = await User.findById(req.params.userId);
        res.json(user);
    }catch(err){
        res.json({message : err});
    }
});

//submit post

router.post('/', async(req, res) => {
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        age : req.body.age
    });

    //saving data to database.....
    user.save().then(data => {
        res.json(data);
    })
    .catch(err =>{
        res.json({message : err});
    });
})

//delete by id

router.delete('/:userId', async(req, res) => {
    try{
        const removeUser = await User.remove({_id : req.params.userId});
        res.json(removeUser)
    }catch(err){
        res.json({message : err});
    }
});

//for update one document

router.patch('/:userId',async(req, res) =>{
    try{
        const updateUser = await User.updateOne(
            {_id: req.params.userId},
            {$set: {name: req.body.name}}
        );
        res.json(updateUser);
    }catch{
        res.json({message: err});
    }
});



module.exports = router;