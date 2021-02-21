const moment = require("moment");
const connection = require("../infra/connection");

class Consultations {
  adding(consultation, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
    const data = moment(consultation.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:MM:SS"
    );

    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteEhValido = consultation.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: clienteEhValido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const serviceDate = { ...consultation, dataCriacao, data };

      const sql = "INSERT INTO Atendimentos SET ?";

      connection.query(sql, serviceDate, (erro, results) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(consultation);
        }
      });
    }
  }

  list(res) {
    const sql = "SELECT * FROM Atendimentos";

    connection.query(sql, (erro, results) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(results);
      }
    });
  }

  findId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

    connection.query(sql, (erro, results) => {
      const consultation = results[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(consultation);
      }
    });
  }

  change(id, values, res) {
    if (values.data) {
      values.data = moment(values.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:MM:SS"
      );
    }

    const sql = "UPDATE Atendimentos SET ? WHERE id=?";

    connection.query(sql, [values, id], (erro, results) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ ...values, id });
      }
    });
  }

  delete(id, res) {
    const sql = "DELETE FROM Atendimentos WHERE id=?";

    connection.query(sql, id, (erro, results) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Consultations();
