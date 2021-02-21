const customExpress = require("./config/customExpress");
const connection = require("./infra/connection");
const Tables = require("./infra/tables");

connection.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("conectado com sucesso");

    Tables.init(connection);

    const app = customExpress();

    app.listen(3000, () => console.log("servidor rodando na porta 3000"));
  }
});
