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
const PORT = 3002;

app.use(express.json())

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,

}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    }
}))

app.listen(3002, () => {
    console.log("listen");
})

app.post('/api/signup', (req, res) => {

    const username = req.body.username;
    const name = req.body.name;
    const pass = req.body.pass;
    const department = req.body.department;

    bcrypt.hash(pass, saltRounds, (err, hash) => {

        if (err) {
            console.log(err)
        }
        db.query("INSERT INTO client (username,name, pass, department) VALUES (?,?,?,?)", [username, name, hash, department], (err, result, data) => {
            if (err) {
                console.log(err)
                return res.json("Error")
            }
            console.log(result)
            return res.json(data);
        });
    })
})


app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const pass = req.body.pass;
    db.query("SELECT * FROM  client WHERE username= ?", username, (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        if (data.length > 0) {
            console.log(data)
            bcrypt.compare(pass, data[0].pass, (error, response) => {
                if (error) return res.json({ message: "Password compare error" });
                if (response) {
                    const username = data[0].username;
                    const token = jwt.sign({ username }, "jwt-secret-key", { expiresIn: "1d" });
                    res.cookie('token', token)
                    res.send(data)
                }
                else {
                    res.json({ message: "Wrong username/password" });
                }
            })
        }
        else {
            res.send({ message: "user doesnt exist" })
        }
    });
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ message: "not auth" })
        
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ message: "not auth" })
            }
            else {
                req.username = decoded.username;
                next()
            }

        })
    }
}

app.get('/', verifyUser, (req, res) => {
    const username = req.username
    db.query("SELECT * FROM  client WHERE username= ?", username, (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        if (data) {
            return res.send(data)

        };
    })
})
app.post('/complaint', verifyUser, (req, res) => {
    const username = req.username
    const complaint = req.body.complaint
    const complaint_type = req.body.complaint_type
    const complaint_id = req.body.complaint_id
    db.query("INSERT INTO complaints (username,complaint,complaint_type,complaint_id) VALUES (?,?,?,?)", [username, complaint, complaint_type, complaint_id], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        else {
            console.log(data)
            return res.send(data)


        };
    })
})

app.get('/complaint_data', verifyUser, (req, res) => {
    const username = req.username
    db.query("SELECT * FROM  complaints WHERE username= ?", username, (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        if (data) {
            return res.send(data)


        };
    })
})

app.get('/singlecomplaint_data/:complaint_id', (req, res) => {
    const complaint_id = req.params.complaint_id
    db.query("SELECT * FROM  complaints WHERE complaint_id= ?", [complaint_id], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        else {
            return res.send(data)


        };
    })
})


app.put('/newcomplaint/:complaint_id', verifyUser, (req, res) => {
    const complaint_id = req.params.complaint_id
    const newcomplaint = req.body.newcomplaint
    db.query("UPDATE complaints SET complaint=? WHERE complaint_id= ?", [newcomplaint, complaint_id], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        if (data) {
            return res.send({ message: "updated" })


        };
    })
})

app.get('/allcomplaint_data', verifyUser, (req, res) => {
    db.query("SELECT * FROM  complaints", (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        if (data) {
            return res.send(data)


        };
    })
})

app.get('/tablejoin/:complaint_id', (req, res) => {
    const complaint_id= req.params.complaint_id
    db.query("SELECT client.department, client.name,client.role,complaints.complaint_id FROM client INNER JOIN complaints ON complaints.username=client.username WHERE complaint_id=?",[complaint_id] ,(err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        if (data) {
            return res.send(data)


        };
    })
})

app.get('/feedbackjoin', (req, res) => {
    db.query("SELECT complaints.username, complaints.complaint ,feedback.feedbacks,feedback.feedback_date,feedback.rate,complaints.complaint_id FROM complaints INNER JOIN feedback ON complaints.complaint_id=feedback.complaint_id",(err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        if (data) {
            return res.send(data)


        };
    })
})

app.post('/assigned/:complaint_id', (req, res) => {
    const complaint_id = req.params.complaint_id
    const assigned_to = req.body.assignedto
    db.query("INSERT INTO assigned (complaint_id,assigned_to) VALUES (?,?)", [complaint_id,assigned_to], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        if (data) {
            console.log("assigned")
            return res.send({ message: "assigned" })


        };
    })
})
app.put('/assignedstate/:complaint_id', (req, res) => {
    const complaint_id = req.params.complaint_id
    const newstate = req.body.newstate
    const complete_date = req.body.date
    console.log(newstate)
    db.query("UPDATE complaints SET state=?,complete_date=? WHERE complaint_id=?", [newstate,complete_date,complaint_id], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        if (data) {
            console.log(data)
            return res.send({ message: "assigned" })


        };
    })
})
app.post('/feedback/:complaint_id', verifyUser, (req, res) => {
    const feedbacks = req.body.feedbacks
    const complaint_id = req.params.complaint_id
    const rate = req.body.rate
    db.query("INSERT INTO feedback (complaint_id,feedbacks,rate) VALUES (?,?,?)", [complaint_id,feedbacks,rate], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        else {
            console.log(data)
            return res.send({message:"sumbited"})


        };
    })
})

app.get('/assignCheck/:complaint_id', (req, res) => {
    const complaint_id = req.params.complaint_id

    db.query("SELECT * FROM assigned WHERE complaint_id=?", [complaint_id], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        else {
          
            return res.send(data)


        };
    })
})

app.get('/feedbackdata/:complaint_id', (req, res) => {
    const complaint_id = req.params.complaint_id
    db.query("SELECT * FROM feedback WHERE complaint_id=?", [complaint_id], (err, data) => {
        if (err) {
            console.log(err)
            return res.json("Error")
        }
        if(data.length>0){
            return res.send(data)
        }
        else{
            return res.send({message:"Nodata"})
        }
    })
})


app.get('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.status(200).send("user logout")
})

