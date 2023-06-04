/* import { Router } from "express";

const router = Router()

router.get('/', (req, res) => {
    res.render('register')
})

export default router;
 */
/* ================ */

import { Router } from 'express';

const router = Router();

const users = []
router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.send({ status: "success" })
})

router.get('/', (req, res) => {
    console.log(users);
    res.send({ users })
})

export default router;