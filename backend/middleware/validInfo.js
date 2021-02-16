module.exports = function(req,res,next) {
    const {nome, sobrenome, username, senha} = req.body;
}

if (req.path === "/register") {
    if (![nome, sobrenome, username, senha].every(Boolean)) {
        return res.status(401).json("Credencial incompleta");
    }
    
    else if (req.path === "/login") {
        if (![username, senha].every(Boolean)) {
            return res.status(401).json("Credencial incompleta");
        }
    }
    next();
}