const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
var jwt = require('jsonwebtoken');

router.get('/All',(req,res,next)=> {
    User.find().then(result => {
        res.status(200).json({
            Data: result
        })
    }).catch(err => {
        res.status(500).json({
            error : err
        })
    })
})
router.post('/login',(req,res,next)=> {
    console.log(req.body);
    User.find({username: req.body.username})
    .exec()
    .then(user => {
        console.log(user);  
        if (user.length < 1) {
           return res.status(403).json({
                msg: 'user not found'
            })
        } 
        if (user[0].password !== req.body.password) {
                res.status(401).json({
                    msg: 'invalid password'
                })
            } else {
                let token = jwt.sign({ username:  user[0].username}, 'secret', {expiresIn: '300000'});
                res.status(200).json(
                    token
                );
            }      
        
    }).catch(err => {
        console.log(err);
        res.status(405).json({
            msg: 'error'
        })
    }) 
})

router.get('/username', verifyToken, function(req,res,next){
    return res.status(200).json(decodedToken.username);
  })
  
  var decodedToken='';
  function verifyToken(req,res,next){
    let token = req.query.token;
  
    jwt.verify(token,'secret', function(err, tokendata){
      if(err){
        return res.status(400).json({message:' Unauthorized request'});
      }
      if(tokendata){
        decodedToken = tokendata;
        next();
      }
    })
  }

module.exports = router;