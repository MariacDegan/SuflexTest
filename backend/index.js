const express = require("express");
const app = express();
const cors = require("cors");

//Middleware
app.use(express.json())
app.use(cors())

//ROUTES
//Register and Login

app.use("/auth", require("./routes/suflexAuth"));

//dashboard
app.use("/dashboard", require("./routes/dashboard"));

//CRUD
app.get('/crud', (req, res) => main.getTableData(req, res, db))
app.post('/crud', (req, res) => main.postTableData(req, res, db))
app.put('/crud', (req, res) => main.putTableData(req, res, db))
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db))

app.listen(3005, () => {
    console.log("server is running on port 3005");
});