//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = 3000;

//configurando o acesso ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/revac2mia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//criando a model do seu projeto
const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  mensagem: { type: String, required: true },
});

const Contato = mongoose.model("Contato", ContatoSchema);

// Configurando os roteamentos

// Rota para exibir o formulário de contato
app.get("/contato", async (req, res) => {
  res.sendFile(__dirname + "/contato.html");
});

// Rota para processar o envio do formulário
app.post("/contato", async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const mensagem = req.body.mensagem;

  const novoContato = new Contato({
    nome: nome,
    email: email,
    mensagem: mensagem,
  });

  try {
    const contatoSalvo = await novoContato.save();
    res.json({ error: null, msg: "Contato salvo com sucesso", contatoId: contatoSalvo._id });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Rota raiz
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Configurando a porta
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
