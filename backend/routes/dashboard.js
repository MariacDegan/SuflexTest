const router = require ("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async(req,res) => {
    try {

        const user = await pool.query("SELECT * FROM usuarios");

        res.json(user.rows);
        
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Erro Server");
    }
});

module.exports = router;
