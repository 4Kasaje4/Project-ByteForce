const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const app = express();

const port = 8000
const dbconfig = mysql.createConnection({
    'host' : 'localhost',
    'user' : 'root',
    'password' : '',
    'database' : 'byteforce'
});
dbconfig.connect();
app.use(bodyparser.json());

app.get('/' , (req,res) => {
    res.send({'test' : 'hello'})
});

app.get('/all_location' , (req,res) =>{
    dbconfig.query('SELECT * FROM location' , (error , result) => {
        return res.json(result);
    })

});

app.get('/user/:user_id', (req,res) =>{
    const user_id = req.params.user_id;
    dbconfig.query("SELECT * FROM user WHERE user_id = ? " , [user_id] , (error , result) => {
        return res.json(result)
    })
})


app.get('/location_like/user/:user_id' , (req,res) =>{
    const user_id = req.params.user_id
    dbconfig.query("SELECT * FROM location_like WHERE user_id = ?" , [user_id] ,(error , result) =>{
        return res.json(result)
    })
})

app.get('/location/:location_id', (req,res) => {
    const location_id = req.params.location_id;
    dbconfig.query("SELECT * FROM review WHERE location_id = ?" , [location_id] , (error,result) => {
        return res.json(result)
    })
})

app.post('/add_user' , (req,res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    dbconfig.query('INSERT INTO user( firstname , lastname , email , username , password ) VALUES (? , ? , ? , ? , ?)' , [firstname , lastname , email ,username ,password] , (error , result) => {
        return res.json({result , message : "add user successfully"})
    })
})

app.post('/signup', (req,res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password
    const u_picture = req.body.u_picture;

    dbconfig.query("INSERT INTO user(firstname, lastname, email , username , password , U_Picture) VALUES ( ? , ? , ? , ? , ? , ?)" , [firstname ,lastname , email ,username , password ,u_picture], (error , result)=> {
        return res.json({result , message : "Signup successfully"})
    } )

})


app.put('/edit_profile/:user_id', (req,res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password
    const u_picture = req.body.u_picture;
    const user_id = req.params.user_id;
    dbconfig.query("UPDATE user SET (firstname  = ? , lastname = ? , email = ? , username = ? , password = ? , U_Picture = ? ) WHERE user_id = ?" , [firstname , lastname , email ,username ,password , u_picture , user_id] , (error , result) => {
        return res.json({result , message : "Edit profile successfully"})
    })
})


app.delete('/delete/:user_id' , (req,res) => {
    const user_id = req.params.user_id;
    dbconfig.query("DELETE FROM user WHERE user_id = ? ", [user_id] ,(error , result) => {
        return res.json({result , message : `Delete  user id  ${user_id } successfully` })
    })
})


app.listen(port, () => {console.log(`Server run on port ${port}`)});