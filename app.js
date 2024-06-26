const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const sequelize = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.json());

// Configuración de las rutas
app.use("/api", userRoutes);

// Inicializar Sequelize y luego levantar el servidor
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync({ force: true }); // Solo usar { force: true } en desarrollo
    console.log("Database synchronized.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
