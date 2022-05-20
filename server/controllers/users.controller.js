const express = require("express");
const { createUser, login } = require("../services/users.service");

const router = new express.Router();

router.post("/signup", async (req, res) => {
    const user = req.body;
    const {token, newUser} = await createUser(user)
    res.status(201).send({token, user: newUser});
})

router.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    const {token, user} = await login(email, password)
    res.status(200).send({token, user});
})

module.exports = router;
