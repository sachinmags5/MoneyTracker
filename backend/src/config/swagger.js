import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Finance Tracker API",
      version: "1.0.0",
      description: "API documentation for Finance Tracker MERN app",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
    tags: [
      {
        name: "Category",
        description: "Category management",
      },
      {
        name: "Stats",
        description: "stats management",
      },
      {
        name: "Users",
        description: "User management",
      },
      {
        name: "Transaction",
        description: "Transaction management",
      },
    ],
  },
  //   apis: ["./src/routes/*.js"], // path to route files
  apis: ["./src/modules/**/*.routes.js"], // path to route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
