const customExpress = require('./config/customExpress');
const connection = require('./infra/connection');
const Tables = require('./infra/tables');

connection.connect((err) => {
  if(err) {
    console.log('erro ao conectar a base de dados');
  } else {
    console.log('conectado com sucesso');

    Tables.init(connection);

    const app = customExpress();
    app.listen(3000, () => console.log('servidor rodando na porta 3000'));
  }
});
