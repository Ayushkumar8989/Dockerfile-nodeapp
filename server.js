const express = require("express");
const app = express();

const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const PORT = 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});

const MONGO_URL = "mongodb://delta_admin:delta_password@localhost:27017";
const client = new MongoClient(MONGO_URL);

app.get("/getUsers", async (req, res) => {
    await client.connect(URL);
    console.log('Connect successfully to server');

    const db = client.db("my-sample-db");
    const data = await db.collection('users').find({}).toArray();

    client.close();
    res.send(data);
});

//POST new user
app.post("/addUser", async (req, res) => {
    const userObj = req.body;
    console.log(userObj);
    await client.connect(URL);
    console.log("Connected successfully to server");

    const db = client.db("my-sample-db");
    const data = await db.collection('users').insertOne(userObj);
    console.log(data);
    console.log("Data inserted in DB");
    client.close();
});



app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
});