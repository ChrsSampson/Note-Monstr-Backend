import express from "express";

import User from "../db/User";

const router = express.Router();

router.get("/user/email", async (req, res) => {
    try {
        const email = req.body.email;

        const r = await User.findByEmail(email);

        res.json(r);
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.post("/user", async (req, res) => {
    try {
        const r = await User.create(req.body);

        res.json(r);
    } catch (err) {
        res.json({ error: err.message });
    }
});

export default router;
