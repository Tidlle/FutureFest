const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/techplnt',
{   
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});

const contatoSchema = new mongoose.Schema({
    nome: {type : String},
    email: {type: String, required: true,},
    motivocontato: {type : String},
  });
  
const Contato = mongoose.model('Contato', contatoSchema);

app.post("/contato", async (req, res) => {
    const email = req.body.email;
    const nome = req.body.nome;
    const motivocontato = req.body.motivocontato;

    if (email == null || nome == null || motivocontato == null) {
        return res.status(400).json({ error: "Preencher todos os campos" });
    }

    const contato = new Contato({
        email: email,
        nome: nome,
        motivocontato: motivocontato,
    });

    try {
        const newContato = await contato.save();
        res.json({ error: null, msg: "Contato ok", contatoId: newContato._id });
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get("/sobre", async(req, res)=>{
    res.sendFile(__dirname +"/sobre.html");
});

app.get("/contato", async(req, res)=>{
    res.sendFile(__dirname +"/contato.html");
});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
});

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})  
