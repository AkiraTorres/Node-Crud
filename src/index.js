import Express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import user from "./routes/userRoutes.js";

dotenv.config();

const app = Express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/user", user);

// Testes realizados durante a aula de ISI na última quarta 21/11
/*
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.DB}`)
var classes = [];

app.get("/", async (req, res) => {
    // try {
    //     await sequelize.authenticate();
    //     console.log('Connection has been established successfully.');
    //   } catch (error) {
    //     console.error('Unable to connect to the database:', error);
    //   }
    res.send("Hello World");
});

app.get("/crud", (req, res) => {
    res.send(classes);
});

app.get("/crud/:id", (req, res) => {
    const id = req.params.id;
    res.json(classes[id]);
});

app.post("/crud", (req, res) => {
    const data = req.body;
    console.log(data);
    classes.push(data);
    res.status(201).json(data);
});

app.delete("/crud/:id", (req, res) => {
    const id = req.params.id;
    delete classes[id];
    res.send("Deleted class");
});*/

app.all("*", (req, res) => {
    res.status(404).send("Not Found");
});

app.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${process.env.PORT}`);
})