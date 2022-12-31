import express from 'express';
// import { Pool } from "pg";
import pkg from 'pg';
const {Pool} = pkg;
const router = express.Router();
// queries
const queries = {
    getTours:`SELECT * FROM "Tours"`,
    getToursId:`SELECT * FROM "Tours" where "TourId" = $1`,
    deleteToursId:`DELETE FROM "Tours" where "TourId" = $1`,
    postTour:'INSERT INTO public."Tours"("TourId", "TourName", "Price") VALUES ($1, $2, $3);'
    
}
// const router = require('express).Router();
const returnSuccess = {"success": true};
// pool.query ашиглах тохиргоо database-тайгаа холбох
const pool = new Pool({
    host: "localhost",
    port: 3001,
    database: "webbnt",
    user: "postgres",
    password: "admin"
})
router.get('/', (req, res)=>{
    pool.query(queries.getTours, (err, data)=>{
        res.status(200).json(data.rows);
    })
})
router.get('/:TourId', (req, res)=>{
    // req-ээс params-аас TourId-г авах
    let TourId = req.params.TourId;
    pool.query(queries.getToursId,[TourId] ,(err, data)=>{
        if(data.rowCount){
            res.status(200).json(data.rows);
        }
        else {
            res.status(404).send("Not found");   
        }
        // console.log(data);
        
    })
})
router.delete('/:TourId', (req, res)=>{
    // req-ээс params-аас TourId-г авах
    let TourId = req.params.TourId;
    pool.query(queries.getToursId,[TourId] ,(err, data)=>{
        if(data.rowCount){
            pool.query(queries.deleteToursId,[TourId],(err,data)=>{
                res.status(200).send("DELETED");
            })
        }
        else {
            res.status(200).send("NOT REGISTERED TOUR ID");   
        }
        // console.log(data);
        
    })
})

router.post('/', (req, res)=>{
    const {
        TourId,
        TourName,
        Price
    } = req.body;
    // INSERT INTO public."Tours"(
    //     "TourId", "TourName", "Price")
    //     VALUES (?, ?, ?);
    pool.query(queries.getToursId,[TourId], (err, data)=>{
        // эхлээд оруулсан tourId -г бүртгэгдсэн эсэхийг шалгана
        if(data.rowCount){
            res.send("registered");
        }
        else{
            pool.query(queries.postTour, [TourId,TourName,Price],(err,data)=>{
                res.status(201).send("created");
            })
        }
    })
    
})

export default router;