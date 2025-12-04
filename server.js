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
const Aula = require('./models/Aula');
const Plano = require('./models/Plano');

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


app.get('/homeBicicletas', (req, res) => {
    res.render('homeBike');
});


app.get('/bicicletas', async (req, res) => {
    const produtos = await Produto.findAll({
        order: [['id', 'ASC']],
        raw: true
    });
    res.render('listarBike', { produtos });
});


app.get('/bicicletas/nova', (req, res) => res.render('cadastrarBike'));


app.post('/bicicletas', async (req, res) => {
    const { nome, descricao, preco, cor,  } = req.body;
    await Produto.create({ nome, preco, cor, descricao });
    res.redirect('/bicicletas');
});


app.get('/bicicletas/ver/:id', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id, { raw: true });
    if (!produto) return res.status(404).send('Bicicleta não encontrada');
    res.render('detalharBike', { produto });
});


app.get('/bicicletas/:id/editar', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id, { raw: true });
    if (!produto) return res.status(404).send('Bicicleta não encontrada');
    res.render('editarBike', { produto });
});


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


app.post('/bicicletas/excluir/:id', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).send('Bicicleta não encontrada');

    await produto.destroy();
    res.redirect('/bicicletas');
});


/* ----------------------
   Rotas SERVIÇOS
   ---------------------- */


app.get('/homeServicos', (req, res) => {
    res.render('homeServicos');
});


app.get('/servicos', async (req, res) => {
    const servicos = await Servico.findAll({
        order: [['id', 'ASC']],
        raw: true
    });
    res.render('listarServicos', { servicos });
});


app.get('/servicos/novo', (req, res) => res.render('cadastrarServico'));


app.post('/servicos', async (req, res) => {
    const { nome, descricao, preco } = req.body;
    await Servico.create({ nome, descricao, preco });
    res.redirect('/servicos');
});


app.get('/servicos/ver/:id', async (req, res) => {
    const servico = await Servico.findByPk(req.params.id, { raw: true });
    if (!servico) return res.status(404).send('Serviço não encontrado');
    res.render('detalharServico', { servico });
});


app.get('/servicos/:id/editar', async (req, res) => {
    const servico = await Servico.findByPk(req.params.id, { raw: true });
    if (!servico) return res.status(404).send('Serviço não encontrado');
    res.render('editarServico', { servico });
});


app.post('/servicos/:id/editar', async (req, res) => {
    const servico = await Servico.findByPk(req.params.id);
    if (!servico) return res.status(404).send('Serviço não encontrado');

    servico.nome = req.body.nome;
    servico.descricao = req.body.descricao;
    servico.preco = req.body.preco;

    await servico.save();
    res.redirect('/servicos');
});


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


app.get('/eventos', async (req, res) => {
    const eventos = await Evento.findAll({
        order: [['id', 'ASC']],
        raw: true
    });
    res.render('listarEventos', { eventos });
});


app.get('/eventos/novo', (req, res) => res.render('cadastrarEvento'));


app.post('/eventos', async (req, res) => {
    const { nome, descricao, requisitos, faixa_etaria, data} = req.body;
    await Evento.create({ nome, descricao, requisitos, faixa_etaria, data});
    res.redirect('/eventos');
});


app.get('/eventos/ver/:id', async (req, res) => {
    const evento = await Evento.findByPk(req.params.id, { raw: true });
    if (!evento) return res.status(404).send('Evento não encontrado');
    res.render('detalharEvento', { evento });
});


app.get('/eventos/:id/editar', async (req, res) => {
    const evento = await Evento.findByPk(req.params.id, { raw: true });
    if (!evento) return res.status(404).send('Evento não encontrado');
    res.render('editarEvento', { evento });
});


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


app.post('/eventos/excluir/:id', async (req, res) => {
    const evento = await Evento.findByPk(req.params.id);
    if (!evento) return res.status(404).send('Evento não encontrado');

    await evento.destroy();
    res.redirect('/eventos');
});

/* ----------------------
   Rotas Aulas
   ---------------------- */


app.get('/homeAula', (req, res) => {
    res.render('homeAula');
});


app.get('/aulas', async (req, res) => {
    const aulas = await Aula.findAll({
        order: [['id', 'ASC']],
        raw: true
    });
    res.render('listarAulas', { aulas });
});


app.get('/aulas/novo', (req, res) => res.render('cadastrarAula'));


app.post('/aulas', async (req, res) => {
    const { nome, descricao, preco, faixa_etaria, horas_semanais} = req.body;
    await Aula.create({ nome, descricao, preco, faixa_etaria, horas_semanais});
    res.redirect('/aulas');
});


app.get('/aulas/ver/:id', async (req, res) => {
    const aula = await Aula.findByPk(req.params.id, { raw: true });
    if (!aula) return res.status(404).send('Aula não encontrada');
    res.render('detalharAula', { aula });
});


app.get('/aulas/:id/editar', async (req, res) => {
    const aula = await Aula.findByPk(req.params.id, { raw: true });
    if (!aula) return res.status(404).send('Aula não encontrada');
    res.render('editarAula', { aula });
});


app.post('/aulas/:id/editar', async (req, res) => {
    const aula = await Aula.findByPk(req.params.id);
    if (!aula) return res.status(404).send('Aula não encontrada');

    aula.nome = req.body.nome;
    aula.descricao = req.body.descricao;
    aula.preco = req.body.preco;
    aula.faixa_etaria = req.body.faixa_etaria;
    aula.horas_semanais = req.body.horas_semanais;

    await aula.save();
    res.redirect('/aulas');
});


app.post('/aulas/excluir/:id', async (req, res) => {
    const aula = await Aula.findByPk(req.params.id);
    if (!aula) return res.status(404).send('Aula não encontrada');

    await aula.destroy();
    res.redirect('/aulas');
});

/* ----------------------
   Rotas Planos
   ---------------------- */


app.get('/homePlano', (req, res) => {
    res.render('homePlano');
});


app.get('/planos', async (req, res) => {
    const planos = await Plano.findAll({
        order: [['id', 'ASC']],
        raw: true
    });
    res.render('listarPlanos', { planos });
});


app.get('/planos/novo', (req, res) => res.render('cadastrarPlano'));


app.post('/planos', async (req, res) => {
    const { nome, beneficios, preco, horas_limite} = req.body;
    await Plano.create({ nome, beneficios, preco, horas_limite});
    res.redirect('/planos');
});


app.get('/planos/ver/:id', async (req, res) => {
    const plano = await Plano.findByPk(req.params.id, { raw: true });
    if (!plano) return res.status(404).send('Plano não encontrado');
    res.render('detalharPlano', { plano });
});


app.get('/planos/:id/editar', async (req, res) => {
    const plano = await Plano.findByPk(req.params.id, { raw: true });
    if (!plano) return res.status(404).send('Plano não encontrado');
    res.render('editarPlano', { plano });
});


app.post('/planos/:id/editar', async (req, res) => {
    const plano = await Plano.findByPk(req.params.id);
    if (!plano) return res.status(404).send('Plano não encontrado');

    plano.nome = req.body.nome;
    plano.beneficios = req.body.beneficios;
    plano.preco = req.body.preco;
    plano.horas_limite = req.body.horas_limite;

    await plano.save();
    res.redirect('/planos');
});


app.post('/planos/excluir/:id', async (req, res) => {
    const plano = await Plano.findByPk(req.params.id);
    if (!plano) return res.status(404).send('Plano não encontrado');

    await plano.destroy();
    res.redirect('/planos');
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
