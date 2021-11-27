const express =require('express');
const app= express();
const AWS=require('aws-sdk');
const cors = require('cors');

app.use(cors());
app.use(express.json());

var table = "Employee";

AWS.config.update({
    region:'local',
    endpoint:"http://localhost:8000"
});
var docClnt = new AWS.DynamoDB.DocumentClient();

app.post('/employees', (req, res ) =>{
    var empId = Number(req.body.empId);
    const firstName=req.body.firstName;
    const surName=req.body.surName;
    const email=req.body.email;
    const dob=req.body.dob;
    const gender=req.body.gender;
             
         var params ={
             TableName:table,        
             Item:{
                 "empId":empId,
                 "info":{
                     "firstName":firstName,
                      "surName":surName,
                       "email": email,
                       "dob":dob,
                        "gender":gender
                 }
             },
             ConditionExpression:"attribute_not_exists(empId)"
         };
         docClnt.put(params,function(err,data){
             if(err){
                 console.log("Unable to add Employee",firstName,err);
                 res.sendStatus(500);
             }else{
                 console.log("Employee created Successfully ",firstName,"with EmpId ",empId);
                 res.sendStatus(201);
             }
     
         });
     });
     app.get('/employees/:id', (req,res)=>{
        var empId = Number(req.params.id);
        var params ={
            TableName:table,  
            Key:{
                "empId":empId
            }      
        };
        docClnt.get(params,function(err,data){
            if(err){
                console.log("Unable to read Employee",JSON.stringify(err,null,2));
            }else{            
                if(data.Item!=undefined){
                    var info = data.Item.info;
                    var employee = {
                        empId: data.Item.empId,
                        firstName:info.firstName,
                        surName:info.surName,
                        gender:info.gender,
                        email:info.email,
                        dob:info.dob}                
                    res.status(200).json(employee);
                    console.log("successfully Read Employee ",JSON.stringify(data,null,2));
                }
                else{
                    res.sendStatus(404);
                    console.log("There is no employee for given Id");
                }
            }
        })
         

     })
     app.put('/employees/:id' , (req,res) => {
        var empId = Number(req.params.id);
        var params={
            TableName:table,
            Key:{
                "empId":empId
            },
            UpdateExpression: "set info.firstName = :firstName, info.surName = :surName, info.email=:email, info.dob=:dob, info.gender=:gender",
            ExpressionAttributeValues:{
                ':firstName' :req.body.firstName,
                ':surName':req.body.surName,
                ':email' :req.body.email,
                ':dob': req.body.dob,
                ':gender' :req.body.gender
            },
            ReturnValues:"UPDATED_NEW"        
        };
        docClnt.update(params,function(err,data){
            if(err){
                res.sendStatus(400)
                console.log("Unable to update Employee",empId,JSON.stringify(err,null,2))
            }else{
                res.sendStatus(200)
                console.log("Successfully updated",JSON.stringify(data,null,2))
            }
        });

     })
app.delete('/employees/:id', (req,res) => {
    var empId =  Number(req.params.id);
    var params ={
        TableName:table,
        Key:{
            'empId':empId
        }
    }
    docClnt.delete(params,function(err,data){
        if(err){
            res.sendStatus(400)
            console.log("Unable to Delete Employee",JSON.stringify(err,null,2))
        }else{
            res.sendStatus(204);
            console.log("Employee deleted successfully",empId,JSON.stringify(data,null,2))
        }
    })
})


port = 3000;
app.listen(port, ()=>{
    console.log(`Server created successfully at ${port}`)
});