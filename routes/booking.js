import express from 'express';
// import { Pool } from "pg";
const router = express.Router();
// const router = require('express).Router();
const returnSuccess = {"success": true};

router.get('/', (req, res)=>{
    res.send('Hello booking!');
    // res.send()
    // гэх байгаад query бичиж байгаад илгээнэ
})
router.post('/', (req, res)=>{
    res.send('Hello booking post!');
    // req.body/catogary_name 
    // req-ээс орж ирснийг query бичиж оруулна
    // res.status(201).send(returnSuccess);
})

export default router;