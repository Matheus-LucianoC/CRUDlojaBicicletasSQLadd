const Turma = require('./Turma');
const Tutor = require('./Tutor');
const Pessoa = require('./pessoa');
const Produto = require('./Produto');
const Servico = require('./Servico');
const Evento = require('./Evento');
const Aula = require('./Aula');
const Plano = require('./Plano');

Tutor.hasMany(Turma,
    { foreignKey: 'tutorId',
    as: 'turmas'}
)

Turma.belongsTo(Tutor,
    { foreignKey: 'tutorId',
    as: 'tutor'}
)

Aula.hasMany(Turma,
    { foreignKey: 'aulaId',
    as: 'turmas'}
)

Turma.belongsTo(Aula,
    { foreignKey: 'aulaId',
    as: 'aula'}
)

Pessoa.belongsToMany(Turma,
    { through: 'PessoaTurmas',
    as: 'turmas',
    foreignKey: 'pessoaId',
    otherKey: 'turmaId'}
)

Turma.belongsToMany(Pessoa,
    { through: 'PessoaTurmas',
    as: 'pessoas',
    foreignKey: 'turmaId',
    otherKey: 'pessoaId'}
)

module.exports = {
  Turma,
  Tutor,
  Pessoa,
  Produto,
  Servico,
  Evento,
  Aula,
  Plano
};