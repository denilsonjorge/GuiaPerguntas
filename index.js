import bodyParser from "body-parser";
import express from "express";
import connection from "./database/database.js";
import Pergunta from "./database/Pergunta.js";
import { Responsta } from "./database/Resposta.js";

// database
connection.authenticate()
.then(()=>console.log("conexao feita com banco de dados"))
.catch(err=>console.log("erro na conexão com banco de dados"))
const app=express()


app.set("view engine","ejs");
app.use(express.static("public"))
// body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    Pergunta.findAll({row:true,order:[
        ["id","DESC"]
    ]}).then(perguntas=>{
        res.render("index",{perguntas});
        console.log(perguntas)
    })
})
app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
})
app.post("/perguntar",(req,res)=>{
    const {titulo,descricao}=req.body
    Pergunta.create({titulo,descricao}).then(()=>res.redirect("/"))
})
app.get("/pergunta/:id",(req,res)=>{
    const id = req.params.id;
    Pergunta.findOne({where:{id}}).then(pergunta=>{
      if(pergunta != undefined){

        Responsta.findAll({where:{perguntaId:pergunta.id},
        order:[["id","DESC"]],
      }).then(respostas=>{
          res.render("pergunta",{pergunta,respostas})
        })


      }else{
        res.redirect("/")
      } 
    })
})
app.post("/responder",(req,res)=>{
  const {corpo,pergunta}=req.body;
  Responsta.create({corpo,perguntaId:pergunta}).then(()=>{
    res.redirect(`/pergunta/${pergunta}`);
  })
})

app.listen(8080,()=>console.log("Servidor rodando na porta 8080"))