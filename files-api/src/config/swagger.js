const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Files API",
      version: "1.0.0",
      description: "API para procesar archivos CSV desde fuente externa",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Rutas donde están los comentarios de Swagger
};

const specs = swaggerJsdoc(options);

module.exports = specs;
