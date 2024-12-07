const express = require('express');
const router = express.Router();
const tareasJson = require('./tareas.json');

router.get('/', (req, res) => {
    res.json(tareasJson);
});

router.post('/', (req, res) => {
    const max = tareasJson.reduce((max, tarea) => tarea.id > max.id ? tarea : max, tareasJson[0]);
    req.body.id = max.id + 1;
    tareasJson.push(req.body);
    res.json(req.body);
});

router.put('/', (req, res) => {
    const tarea = tareasJson.find(t => t.id == req.body.id);
    if (!tarea) {
        return res.status(404).json({mensaje: 'Tarea no encontrada'});
    }
    tarea.nombre = req.body.nombre;
    tarea.estadoTarea = req.body.estadoTarea;
    console.log(tarea);
    res.json(tarea);
});

router.delete('/', (req, res) => {
    const id = req.query?.id;
    const index = tareasJson.findIndex(t => t.id == id);
    if (index === -1) {
        return res.status(404).json({mensaje: 'Tarea no encontrada'});
    }
    tareasJson.splice(index, 1);
    res.json({mensaje: 'Tarea eliminada'});
});

module.exports = router;
