const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./queries");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.get("/providers", db.getProviders);
app.get("/provider/:id", db.getProviderById);
app.post("/providers", db.createProvider);
app.put("/provider/:id", db.updateProvider);
app.delete("/provider/:id", db.deleteProvider);
