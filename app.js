const express = require("express");
const app = express();
const hbs = require("hbs");
const db = require("./db/conn");
app.set("view engine","hbs");
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/",(req,res)=>{
    const {username,mno} = req.body;
    const sql = "INSERT INTO student (name,mno) VALUES (?,?)";
    db.query(sql,[username,mno],(err,result)=>{
        if(err){
            res.status(500).send("error fetching users");
            throw err;
        }
        res.redirect("/dashboard");
    });
})
app.get("/dashboard",(req,res)=>{
    const sql = "select * from student";
    db.query(sql,(err,result)=>{
        if(err){
           return  res.send(err)
        }
        console.log(result);
        res.render("dashboard",{students:result});
        
    })
})
app.get("/delete/:id",(req,res)=>{
    const sql = "delete from student where id=?"
    db.query(sql,[req.params.id],(err,result)=>{
        if(err){
            return  res.send(err)
         }
         console.log(result);
         res.redirect("/dashboard");
    })
})
app.get("/update/:id",(req,res)=>{
    const sql = "select * from student where id=?"
    db.query(sql,[req.params.id],(err,result)=>{
        if(err){
            return res.send(err);
        }
        console.log(result);

        res.render("update",{student:result});
    })
})
app.post("/update",(req,res)=>{
    const id= req.body.id;
    const name=req.body.username;
    const mno = req.body.mno;

    const sql = "update student set name=?,mno=? where id=?";
    db.query(sql,[name,mno,id],(err,result)=>{
        if(err) console.log(err);
        res.redirect("/dashboard");
    })
})

app.listen(3000);