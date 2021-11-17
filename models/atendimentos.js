const connection = require('../infra/connection')

class Atendimento {
  adicionar(atendimento) {
    const sql = `INSERT INTO Atendimento SET ?`;

    connection.query(sql, atendimento, (erro, result) => {
      if(erro) {
        console.log(erro);
      } else {
        console.log(result);
      }
    })
  }
}


module.exports = new Atendimento;