const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const saltRounds = 10;

const app = express();
const  PORT = 3002;

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE"],
    credentials: true,
  
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60 *60*24,
    }
}))

app.listen(3002, ()=>{
    console.log("listen");
})

app.post('/api/signup', (req,res)=> {

    const username = req.body.username;
    const name = req.body.name;
    const pass = req.body.pass;
    const department = req.body.department;

    bcrypt.hash(pass,saltRounds,(err,hash)=>{

        if(err){
            console.log(err)
        }
        db.query("INSERT INTO client (username,name, pass, department) VALUES (?,?,?,?)",[username,name, hash, department], (err,result,data)=>{
            if(err) {
            console.log(err)
            return res.json("Error")
            } 
            console.log(result)
            return res.json(data);
         }); 
    })
       })


    app.post('/api/login', (req,res)=> {
        const username = req.body.username;
        const pass = req.body.pass;
        db.query("SELECT * FROM  client WHERE username= ?",username, (err,data)=>{
           if(err) {
           console.log(err)
           return res.json("Error")
           }
           if(data.length >0){
            console.log(data)
            bcrypt.compare(pass,data[0].pass,(error,response)=>{
                if(error) return res.json({message:"Password compare error"});
                if(response){
                    const username = data[0].username;
                    const token = jwt.sign({username},"jwt-secret-key",{expiresIn:"1d"});
                    res.cookie('token',token)
                    res.send(data)
                }
                else{
                    res.json({message: "Wrong username/password"});
                }
            })
           }
           else{
            res.send({message: "user doesnt exist"})
           }
        });   })

    const verifyUser = (req,res,next)=>{
        const token = req.cookies.token;
        if(!token){
            return res.json({message:"not auth"})
        }
        else{
            jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
                if(err){
                    return res.json({message:"not auth"})
                }
                else{
                    req.username =decoded.username;
                    next()
                }
                
            })
        }
    }
    
    app.get('/',verifyUser,(req,res)=>{
        const username = req.username
        db.query("SELECT * FROM  client WHERE username= ?",username, (err,data)=>{
            if(err) {
            console.log(err)
            return res.json("Error")
            }
            if(data){
             return res.send(data)
              
             
         };   })
        })
        app.post('/complaint',verifyUser,(req,res)=>{
            const username = req.username
            const complaint = req.body.complaint
            const complaint_type = req.body.complaint_type
            const complaint_id = req.body.complaint_id
            db.query("INSERT INTO complaints (username,complaint,complaint_type,complaint_id) VALUES (?,?,?,?)",[username,complaint,complaint_type,complaint_id], (err,data)=>{
                if(err) {
                console.log(err)
                return res.json("Error")
                }
                else{
                 console.log(data)
                 return res.send(data)
                  
                 
             };   })
            })

    app.get('/complaint_data',verifyUser,(req,res)=>{
        const username = req.username
        db.query("SELECT * FROM  complaints WHERE username= ?",username, (err,data)=>{
            if(err) {
            console.log(err)
            return res.json("Error")
            }
            if(data){
             return res.send(data)
              
             
         };   })
        })
    
        app.get('/singlecomplaint_data/:complaint_id',verifyUser,(req,res)=>{
            const complaint_id = req.params.complaint_id
            db.query("SELECT * FROM  complaints WHERE complaint_id= ?",[complaint_id], (err,data)=>{
                if(err) {
                console.log(err)
                return res.json("Error")
                }
                else{
                 return res.send(data)
                  
                 
             };   })
            }) 
            
            app.delete('/singlecomplaint_delete/:complaint_id',verifyUser,(req,res)=>{
                const complaint_id = req.params.complaint_id
                db.query("DELETE FROM complaints WHERE complaint_id= ?",[complaint_id], (err,data)=>{
                    if(err) {
                    console.log(err)
                    return res.json("Error")
                    }
                    if(data){
                     return res.send({message:"deleted"})
                      
                     
                 };   })
                }) 
    app.get('/logout',(req,res)=>{
        res.clearCookie('token',{path:'/'});
        res.status(200).send("user logout")
    })
   
