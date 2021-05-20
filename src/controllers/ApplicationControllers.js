import Application from '../models/Application'
require("dotenv").config();
//const { application } = require('express');
//var express = require('express');
//var router = express.Router();
//var mongoose = require('mongoose');
//var app = express();

//GET Form page
const formPage = (req, res) => {
    res.render('form');
   }

   //post Form page
   const applicationForm = async(req,res,next) => {     
    var newApplication = new Application(req.body);
    console.log("Data>>>>>",newApplication)
    newApplication.save()
    .then(data => {
      console.log(data)
      res.render('form', {message: "Application submitted"})
    })
    .catch(err => {
       console.log(err)
       res.status(400).send("Unable to save to database")
    });
    
 };  
  //updating
    const updateForm = async(req,res,next) => {
    Application.findByIdAndUpdate(req.params.id, req.body)
       .then(application => {
          console.log(application)
          res.send("Updated successfully");
       })
       .catch(err => {
          console.log(err)
          res.status(400).send("Unable to update database")
       });
    }; 
    
    
     //deleting
    const removeForm = async(req, res) => {
    Application.findByIdAndRemove(req.params.id, function(err, response){
            if(err) res.json({message: "Error in deleting record id " + req.params.id});
            else res.json({message: "Person with id " + req.params.id + " removed."});
         });
        };
        
   export{formPage, applicationForm, updateForm, removeForm}