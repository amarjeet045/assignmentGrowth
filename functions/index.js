const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

const axios = require("axios");


  
exports.fetchRequest = functions
  .region("us-central1")
  .https.onRequest((req, res) => {
    const { orderBy } = req.query;
  
  


    if (req.method !== "GET") {
      return res.status(405).json({
        message: "Not allowed"
      });
    }
    
    if(orderBy!=="asc"&& orderBy!=="desc"&&orderBy!==undefined){
        return res.status(200).json({
            message: "url is not allowded"
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

 
    
      
      
    
  
     
  });
