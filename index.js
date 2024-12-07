const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

const tareaRouter = require('./tareas');
app.use('/tareas', tareaRouter);

app.get('/', (req, res) => {
    res.send("Microservicio de tareas activo");
});

app.listen(PORT, () => {
    console.log('Escuchando por el puerto', PORT);
});
