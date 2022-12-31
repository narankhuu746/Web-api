import express from 'express';
// import { Pool } from "pg";
import pkg from 'pg';
const {Pool} = pkg;
const router = express.Router();
// queries
const queries = {
    getTourId_Fname:`SELECT * FROM "Booking" where "TourId" = $1 AND "FName" = $2`,
    postBooking:`INSERT INTO "Booking"("TourId", "FName", "Lname", "Date") VALUES ($1, $2, $3, $4);`
}
const pool = new Pool({
    host: "localhost",
    port: 3001,
    database: "webbnt",
    user: "postgres",
    password: "admin"
})
// const router = require('express).Router();
// Booking-ээс toir захиалсан cosID-тай хэрэглэгч
router.get('/:TourId/:FName', (req, res)=>{
    const params = req.params;
    // console.log(params);
    pool.query(queries.getTourId_Fname,[params.TourId, params.FName],(err, data)=>{
        if(err) throw err;
        if(data.rowCount){
            res.status(200).json(data.rows);
        }
        else {
            res.status(404).send(`${params.TourId}-тай tour ${params.FName} хэрэглэгч олдсонгүй`);   
        }
    })
})
router.post('/', (req, res)=>{
    const {
        TourId,
        FName,
        Lname,
        Date
    } = req.body;
    // console.log(params);
    pool.query(queries.postBooking,[TourId, FName, Lname, Date],(err, data)=>{
        res.status(201).send(`${TourId} ${FName} ${Lname} ${Date} created`);
    })
})


export default router;