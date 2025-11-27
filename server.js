const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();
const port = 3000;

// Database
const sequelize = require("./database");

// Models
const Pessoa = require("./models/pessoas.model");
const Produto = require("./models/produtos.model");
const Servico = require("./models/servicos.model");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", exphbs.engine({ defaultLayout: false }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Sincronizar o banco antes de iniciar o servidor
sequelize.sync()
  .then(() => {
    console.log("Banco sincronizado!");
    app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
  })
  .catch(err => console.error("Erro ao sincronizar o banco:", err));

// ===========================================
// ROTAS PRINCIPAIS
// ===========================================

app.get("/", (req, res) => {
  res.render("lobby");
});

// ===========================================
// ROTAS PESSOAS
// ===========================================

app.get("/homePessoas", (req, res) => res.render("homePessoas"));

app.get("/pessoas", async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.render("listarPessoas", { pessoas });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar pessoas");
  }
});

app.get("/pessoas/nova", (req, res) => res.render("cadastrarPessoa"));

app.post("/pessoas", async (req, res) => {
  try {
    const { nome, senha, idade } = req.body;
    await Pessoa.create({ nome, senha, idade });
    res.redirect("/pessoas");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar pessoa");
  }
});

app.get("/pessoas/ver/:id", async (req, res) => {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).send("Pessoa não encontrada");
    res.render("detalharPessoa", { pessoa });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar pessoa");
  }
});

app.get("/pessoas/:id/editar", async (req, res) => {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).send("Pessoa não encontrada");
    res.render("editarPessoa", { pessoa });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar pessoa");
  }
});

app.post("/pessoas/:id/editar", async (req, res) => {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).send("Pessoa não encontrada");
    const { nome, senha, idade } = req.body;
    await pessoa.update({ nome, senha, idade });
    res.redirect("/pessoas");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar pessoa");
  }
});

app.post("/pessoas/excluir/:id", async (req, res) => {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id);
    if (!pessoa) return res.status(404).send("Pessoa não encontrada");
    await pessoa.destroy();
    res.redirect("/pessoas");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir pessoa");
  }
});

// ===========================================
// ROTAS PRODUTOS (Bicicletas)
// ===========================================

app.get("/homeBicicletas", (req, res) => res.render("homeBike"));

app.get("/bicicletas", async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.render("listarBike", { produtos });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar produtos");
  }
});

app.get("/bicicletas/nova", (req, res) => res.render("cadastrarBike"));

app.post("/bicicletas", async (req, res) => {
  try {
    const { nome, descricao, preco, cor } = req.body;
    await Produto.create({ nome, descricao, preco, cor });
    res.redirect("/bicicletas");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar produto");
  }
});

app.get("/bicicletas/ver/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).send("Bicicleta não encontrada");
    res.render("detalharBike", { produto });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar produto");
  }
});

app.get("/bicicletas/:id/editar", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).send("Bicicleta não encontrada");
    res.render("editarBike", { produto });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar produto");
  }
});

app.post("/bicicletas/:id/editar", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).send("Bicicleta não encontrada");
    const { nome, descricao, preco, cor } = req.body;
    await produto.update({ nome, descricao, preco, cor });
    res.redirect("/bicicletas");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar produto");
  }
});

app.post("/bicicletas/excluir/:id", async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).send("Bicicleta não encontrada");
    await produto.destroy();
    res.redirect("/bicicletas");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir produto");
  }
});

// ===========================================
// ROTAS SERVIÇOS
// ===========================================

app.get("/homeServicos", (req, res) => res.render("homeServicos"));

app.get("/servicos", async (req, res) => {
  try {
    const servicos = await Servico.findAll();
    res.render("listarServicos", { servicos });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar serviços");
  }
});

app.get("/servicos/novo", (req, res) => res.render("cadastrarServico"));

app.post("/servicos", async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;
    await Servico.create({ nome, descricao, preco });
    res.redirect("/servicos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar serviço");
  }
});

app.get("/servicos/ver/:id", async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) return res.status(404).send("Serviço não encontrado");
    res.render("detalharServico", { servico });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar serviço");
  }
});

app.get("/servicos/:id/editar", async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) return res.status(404).send("Serviço não encontrado");
    res.render("editarServico", { servico });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar serviço");
  }
});

app.post("/servicos/:id/editar", async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) return res.status(404).send("Serviço não encontrado");
    const { nome, descricao, preco } = req.body;
    await servico.update({ nome, descricao, preco });
    res.redirect("/servicos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar serviço");
  }
});

app.post("/servicos/excluir/:id", async (req, res) => {
  try {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) return res.status(404).send("Serviço não encontrado");
    await servico.destroy();
    res.redirect("/servicos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao excluir serviço");
  }
});
