import express from "express";
import tours from './routes/tours.js';
import booking from './routes/booking.js';
import pkg from 'pg';
const {Pool} = pkg;

// const express = require("express");
// import express from "express"; Үүнийг ашиглахын тулд package.json дээрээ type-ийн module болгох хэрэгтэй
const app = express();
const port = 5000;

// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'WebAPI demo api',
//             version: '1.0.0',
//         },

//     },
//     apis: ['./index.js', './routes/*.js'],
// };

// connection Хийх шаардалагатай мэдээллүүд
// const pool = new Pool({
//     host: "localhost",
//     port: 5432,
//     user: "postgres",
//     password: "admin"
// })

// const openapiSpec = await swaggerJsdoc(options);
// const UIoptions = {
//     explorer: true
// };
app.use(express.json());
app.use("/tours", tours);
app.use("/booking", booking);
// app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(openapiSpec, UIoptions));
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
// app.get('/', (req, res) => {
// res.send('Hello World!')
// })

// app.get('/products', (req, res) => {
//     res.send('Hello products!')
// })

app.listen(port, () => {
console.log(`Server is listening at http: //localhost:port`);
})
