const moment = require('moment');
const connection = require('../infra/connection')

class Atendimento {

  lista(res) {
    const sql = 'SELECT * From Atendimento';

    connection.query(sql, (erro, result) => {
      if(erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json(result);
      }
    })
  }

  buscaPorId(id, res) {
    const sql = `SELECT * From Atendimento where id=${id}`;

    connection.query(sql, (erro, result) => {
      if(erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json(result[0]);
      }
    })
  }

  adicionar(atendimento, res) {
    const data = {
      ...atendimento,
      dataCriacao: moment().format('YYYY-MM-DD HH:MM:SS'),
      data: moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    };

    if(!moment(data.data).isSameOrAfter(data.dataCriacao)) {
      res.status(400).json({ nome: 'data', mensagem: 'Data deve ser maior a data atual' });
      return;
    }s
    
    if(data.cliente.length <= 5) {
      res.status(400).json({ nome: 'cliente', mensagem: 'Cliente deve ser maior ou igual a 5 letras' });
      return;    
    }

    const sql = `INSERT INTO Atendimento SET ?`;
    connection.query(sql, data, (erro, result) => {
      if(erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json({...data, id});
      }
    })
  }

  editar(id, data, res) {
    
    if(data.data) {
      data.data= moment(data.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    }

    const sql = `UPDATE Atendimento set ? WHERE id=?`;
    connection.query(sql, [data, id], (erro, result) => {
      if(erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json({...data, id});
      }
    })
  }

  deletar(id, res) {
    const sql = `DELETE FROM Atendimento WHERE id=?`;

    connection.query(sql, id, (erro, result) => {
      if(erro) {
        res.status(400).json(erro);
      } else {
        res.status(201).json({id});
      }
    })
  }
}


module.exports = new Atendimento;