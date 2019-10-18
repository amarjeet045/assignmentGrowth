const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

const axios = require("axios");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/* exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });*/
/*
exports.basicOP = functions.https.onRequest((req,res)=>{
    if(req.method!=='GET'){
        return res.status(500).json({
            message:'not allowed'
        })
    }
    res.status(200).json({
        message:'it worked'
    })
    

})*/

  
exports.fetchRequest = functions
  .region("us-central1")
  .https.onRequest((req, res) => {
    const { orderBy } = req.query;


    if (req.method !== "GET") {
      return res.status(405).json({
        message: "Not allowed"
      });
    }
    
  
  
    return axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(response => {
        response.data.sort((a, b) => {
            return orderBy === "desc" || "" ? b.id - a.id : a.id - b.id;
          });
          return res.status(200).json(response.data);
      })
      .catch(err => {
        return res.status(401).json({
          message:err
        });
      });
    
    
   

   /*
   else{
    return res.status(405).json({
        message: "Not allowed"
      });
   }*/
     
  });
