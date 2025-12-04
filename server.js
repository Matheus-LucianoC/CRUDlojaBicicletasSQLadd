// server.js (trecho principal - adapte conforme sua estrutura)
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser'); // opcional
const sequelize = require('./database'); // nosso arquivo
const Pessoa = require('./models/pessoa');
const Produto = require('./models/Produto');
const Servico = require('./models/Servico');
const Evento = require('./models/Evento');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');

/* ----------------------
   Rotas PESSOAS (exemplos)
   ---------------------- */

app.get('/', (req, res) => res.render('lobby'));

app.get('/homePessoas', (req, res) => {
    res.render('homePessoas');
});


app.get('/pessoas', async (req, res) => {
  const pessoas = await Pessoa.findAll({
    order: [['id', 'ASC']],
    raw: true
});
  res.render('listarPessoas', { pessoas });
});


app.get('/pessoas/nova', (req, res) => res.render('cadastrarPessoa'));


app.post('/pessoas', async (req, res) => {
  const { pessoa, senha, idade } = req.body;
  await Pessoa.create({ pessoa, senha, idade });
  res.redirect('/pessoas'); // redirect evita reenvio de formulário
});


app.get('/pessoas/ver/:id', async (req, res) => {
  const pessoa = await Pessoa.findByPk(req.params.id, { raw: true });
  if (!pessoa) return res.status(404).send('Pessoa não encontrada');
  res.render('detalharPessoa', { pessoa });
});


app.get('/pessoas/:id/editar', async (req, res) => {
  const pessoa = await Pessoa.findByPk(req.params.id, { raw: true });

  if (!pessoa) return res.status(404).send('Pessoa não encontrada');

  res.render('editarPessoa', { pessoa });
});


app.post('/pessoas/:id/editar', async (req, res) => {
  const pessoa = await Pessoa.findByPk(req.params.id);
  if (!pessoa) return res.status(404).send('Pessoa não encontrada');

  pessoa.pessoa = req.body.pessoa;
  pessoa.senha = req.body.senha;
  pessoa.idade = req.body.idade;

  await pessoa.save();
  res.redirect('/pessoas');
});


app.post('/pessoas/excluir/:id', async (req, res) => {
  const pessoa = await Pessoa.findByPk(req.params.id);
  if (!pessoa) return res.status(404).send('Pessoa não encontrada');
  await pessoa.destroy();
  res.redirect('/pessoas');
});

/* ----------------------
   Rotas PRODUTOS/BICICLETAS
   ---------------------- */

// página inicial das bikes
app.get('/homeBicicletas', (req, res) => {
    res.render('homeBike');
});

// listar bicicletas
app.get('/bicicletas', async (req, res) => {
    const produtos = await Produto.findAll({
        order: [['id', 'ASC']],
        raw: true
    });
    res.render('listarBike', { produtos });
});

// formulário nova bicicleta
app.get('/bicicletas/nova', (req, res) => res.render('cadastrarBike'));

// criar bicicleta
app.post('/bicicletas', async (req, res) => {
    const { nome, descricao, preco, cor,  } = req.body;
    await Produto.create({ nome, preco, cor, descricao });
    res.redirect('/bicicletas');
});

// ver detalhes
app.get('/bicicletas/ver/:id', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id, { raw: true });
    if (!produto) return res.status(404).send('Bicicleta não encontrada');
    res.render('detalharBike', { produto });
});

// editar - formulário
app.get('/bicicletas/:id/editar', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id, { raw: true });
    if (!produto) return res.status(404).send('Bicicleta não encontrada');
    res.render('editarBike', { produto });
});

// salvar edição
app.post('/bicicletas/:id/editar', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).send('Bicicleta não encontrada');

    produto.nome = req.body.nome;
    produto.descricao = req.body.descricao;
    produto.preco = req.body.preco;
    produto.cor = req.body.cor;

    await produto.save();
    res.redirect('/bicicletas');
});

// excluir
app.post('/bicicletas/excluir/:id', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).send('Bicicleta não encontrada');

    await produto.destroy();
    res.redirect('/bicicletas');
});


/* ----------------------
   Rotas SERVIÇOS
   ---------------------- */

// página inicial dos serviços
app.get('/homeServicos', (req, res) => {
    res.render('homeServicos');
});

// listar serviços
app.get('/servicos', async (req, res) => {
    const servicos = await Servico.findAll({
        order: [['id', 'ASC']],
        raw: true
    });
    res.render('listarServicos', { servicos });
});

// formulário novo serviço
app.get('/servicos/novo', (req, res) => res.render('cadastrarServico'));

// criar serviço
app.post('/servicos', async (req, res) => {
    const { nome, descricao, preco } = req.body;
    await Servico.create({ nome, descricao, preco });
    res.redirect('/servicos');
});

// ver detalhes
app.get('/servicos/ver/:id', async (req, res) => {
    const servico = await Servico.findByPk(req.params.id, { raw: true });
    if (!servico) return res.status(404).send('Serviço não encontrado');
    res.render('detalharServico', { servico });
});

// editar form
app.get('/servicos/:id/editar', async (req, res) => {
    const servico = await Servico.findByPk(req.params.id, { raw: true });
    if (!servico) return res.status(404).send('Serviço não encontrado');
    res.render('editarServico', { servico });
});

// salvar edição
app.post('/servicos/:id/editar', async (req, res) => {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) return res.status(404).send('Serviço não encontrado');

    servico.nome = req.body.nome;
    servico.descricao = req.body.descricao;
    servico.preco = req.body.preco;

    await servico.save();
    res.redirect('/servicos');
});

// excluir
app.post('/servicos/excluir/:id', async (req, res) => {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) return res.status(404).send('Serviço não encontrado');

    await servico.destroy();
    res.redirect('/servicos');
});

/* ----------------------
   Rotas Eventos
   ---------------------- */


app.get('/homeEvento', (req, res) => {
    res.render('homeEvento');
});

// listar serviços
app.get('/eventos', async (req, res) => {
    const eventos = await Evento.findAll({
        order: [['id', 'ASC']],
        raw: true
    });
    res.render('listarEventos', { eventos });
});

// formulário novo serviço
app.get('/eventos/novo', (req, res) => res.render('cadastrarEvento'));

// criar serviço
app.post('/eventos', async (req, res) => {
    const { nome, descricao, requisitos, faixa_etaria, data} = req.body;
    await Evento.create({ nome, descricao, requisitos, faixa_etaria, data});
    res.redirect('/eventos');
});

// ver detalhes
app.get('/eventos/ver/:id', async (req, res) => {
    const evento = await Evento.findByPk(req.params.id, { raw: true });
    if (!evento) return res.status(404).send('Evento não encontrado');
    res.render('detalharEvento', { evento });
});

// editar form
app.get('/eventos/:id/editar', async (req, res) => {
    const evento = await Evento.findByPk(req.params.id, { raw: true });
    if (!evento) return res.status(404).send('Evento não encontrado');
    res.render('editarEvento', { evento });
});

// salvar edição
app.post('/eventos/:id/editar', async (req, res) => {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) return res.status(404).send('Evento não encontrado');

    evento.nome = req.body.nome;
    evento.descricao = req.body.descricao;
    evento.requisitos = req.body.requisitos;
    evento.faixa_etaria = req.body.faixa_etaria;
    evento.data = req.body.data;

    await evento.save();
    res.redirect('/eventos');
});

// excluir
app.post('/eventos/excluir/:id', async (req, res) => {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) return res.status(404).send('Evento não encontrado');

    await evento.destroy();
    res.redirect('/eventos');
});

/* ----------------------
   Inicializar DB e servidor
   ---------------------- */

(async () => {
  try {
    await sequelize.authenticate();
    // sincroniza modelos com o DB (cria tabelas se não existirem)
    await sequelize.sync(); 
    console.log('Banco sincronizado');

    app.listen(port, () => {
      console.log(`Servidor em execução: http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o banco/servidor', err);
  }
})();
