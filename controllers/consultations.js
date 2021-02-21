const Consultations = require("../models/consultations");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Consultations.list(res);
  });

  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Consultations.findId(id, res);
  });

  app.post("/atendimentos", (req, res) => {
    const consutation = req.body;

    Consultations.adding(consutation, res);
  });

  app.patch("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const values = req.body;

    Consultations.change(id, values, res);
  });

  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Consultations.delete(id, res);
  });
};
