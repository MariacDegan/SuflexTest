const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//Register

router.post("/register", validInfo, async(req,res) => {
    try {
        
        //1. 

        const { nome, sobrenome, username, senha } = req.body;

        //2.

        const user = await pool.query("SELECT * FROM usuarios WHERE username = $1", [
            username
        ]);
        
        if (user.rows.length !== 0) {
            return res.status(401).send("Usuário já existe");
        }

        //3.

        const saltRound = 10;
        const Salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(senha, salt);

        //4. 

        const newUser = await pool.query("INSERT INTO usuarios (id, nome, sobrenome, username, senha, salt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nome, sobrenome, username, bcryptPassword, Salt]
        );

        res.json(newUser.rows[0]);

        //5.

        const token = jwtGenerator(newUser.rows[0].id);

        res.json({token});

    } catch (error) {
        console.error(err.message);
        res.status(500).send("Erro Server");
        }        
    });

//Login

router.post("/login", validInfo, async(req,res) =>{
    try {

        //1.

        const { username, senha} = req.body;

        //2.

        const user = await pool.query("SELECT * FROM usuarios WHERE username = $1", [
            username
        ]);

        if(user.rows.length === 0) {
            return res.status(401).json("Username ou senha incorretos")
        }

        //3.

        const validPassword = await bcrypt.compare(senha, user.rows[0].senha);

        if(!validPassword){
            return res.status(401).json("Username ou senha incorretos");
        }

        //4.

        const token = jwtGenerator(user.rows[0].id);

        res.json({token});
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Erro Server");
    }
});

router.get("/is-verify", authorization, async(req,res) => {
    try {

        res.json(true);
        
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Erro Server");
    }
})

module.exports = router;