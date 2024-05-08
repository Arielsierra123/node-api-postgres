const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "saledb",
  password: "123456789",
  port: 5432,
});

//Get All providers
const getProviders = (request, response) => {
  pool.query("SELECT * FROM Providers ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

//Get providers by id
const getProviderById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM Providers WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

//POST to Create provider
const createProvider = (request, response) => {
  const { name, email, phone, nit } = request.body;

  pool.query(
    "INSERT INTO Providers (NameProvider, Email,Phone,Nit ) VALUES ($1, $2,$3,$4) RETURNING *",
    [name, email, phone, nit],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`El proveedor fue agregado con ID: ${results.rows[0].id}`);
    }
  );
};

//Update provider by id
const updateProvider = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email, phone, nit } = request.body;

  pool.query(
    "UPDATE Providers SET NameProvider = $1, Email = $2, Phone=$3, Nit = $4  WHERE id = $5",
    [name, email, phone, nit, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Proveedor modificado con ID: ${id}`);
    }
  );
};

//delete users by ID
const deleteProvider = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM Providers WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Se elimino el proveedor con ID: ${id}`);
  });
};

module.exports = {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider,
};
