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
    postTour:'INSERT INTO "Tours"("TourId", "TourName", "Price") VALUES ($1, $2, $3);',
    putTour:`UPDATE "Tours" SET "TourName"=$2, "Price"=$3 WHERE "TourId" = $1;`
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

// tours table бүхэлд(get)
router.get('/', (req, res)=>{
    pool.query(queries.getTours, (err, data)=>{
        res.status(200).json(data.rows);
    })
})
// tour id-гаар table-ээс(get)
router.get('/:TourId', (req, res)=>{
    // req-ээс params-аас TourId-г авах
    let TourId = req.params.TourId;
    pool.query(queries.getToursId,[TourId] ,(err, data)=>{
        if(data.rowCount){
            res.status(200).json(data.rows);
        }
        else {
            res.status(404).send(`${TourId} Not found`);   
        }
        // console.log(data);
        
    })
})
// tour id-гаар table-ээс(delete) хийх
router.delete('/:TourId', (req, res)=>{
    // req-ээс params-аас TourId-г авах
    let TourId = req.params.TourId;
    pool.query(queries.getToursId,[TourId] ,(err, data)=>{
        if(data.rowCount){
            pool.query(queries.deleteToursId,[TourId],(err,data)=>{
                res.status(200).send(`${TourId} DELETED`);
            })
        }
        else {
            res.status(200).send(`${TourId} NOT REGISTERED TOUR ID`);   
        }
        // console.log(data);
        
    })
})
// tour id-гаар table-ээс(put||update)
router.put('/', (req, res)=>{
    // req-ээс params-аас TourId-г авах
    const {
        TourId,
        TourName,
        Price
    } = req.body;
    pool.query(queries.getToursId,[TourId], (err, data)=>{
        // эхлээд оруулсан tourId -г бүртгэгдсэн эсэхийг шалгана
        if(data.rowCount){
            pool.query(queries.putTour, [TourId,TourName, Price], (err, data)=>{
                res.status(200).send(`${TourId} uptaded`);
            })
        }
        else{
            res.send(`${TourId} NOT REGISTERED TOUR ID`);
        }
    })
})
// database -руугаа оруулах(post)
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
            res.send(`${TourId} registered`);
        }
        else{
            pool.query(queries.postTour, [TourId,TourName,Price],(err,data)=>{
                res.status(201).send(`${TourId} created`);
            })
        }
    })
    
})
export default router;