// 1. Crear un servidor web utilizando Express.
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, ()=> {
    console.log("Server is running on port",port);
});

// 2. Definir rutas para las siguientes operaciones CRUD sobre las tareas:
const tareas = [];

// A. Crear una nueva tarea
app.post('/tareas', (req, res) => {
    const nuevaTarea = {
        id: tareas.length + 1,
        titulo: req.body.titulo,
        completada: false,
        fechaCreacion: new Date()
    };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// B. Leer todas las tareas
app.get('/tareas', (req, res) => {
    res.json(tareas);
});

// C. Leer una tarea específica por su ID
app.get('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).send('Tarea no encontrada');
    res.json(tarea);
});

// D. Actualizar una tarea existente
app.put('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).send('Tarea no encontrada');

    tarea.titulo = req.body.titulo;
    tarea.completada = req.body.completada;
    res.json(tarea);
});

// E. Eliminar una tarea por su ID
app.delete('/tareas/:id', (req, res) => {
    const tareaIndex = tareas.findIndex(t => t.id === parseInt(req.params.id));
    if (tareaIndex === -1) return res.status(404).send('Tarea no encontrada');

    const tareaEliminada = tareas.splice(tareaIndex, 1);
    res.json(tareaEliminada);
});

// 3. Implementar una funcionalidad adicional para calcular estadísticas sobre las tareas, como:
app.get('/tareas/estadisticas', (req, res) => {
    // A. Cantidad total de tareas.
    const totalTareas = tareas.length;
    // B. Tarea más reciente (fecha de creación más reciente).
    const tareaMasReciente = tareas.reduce((a, b) => a.fechaCreacion > b.fechaCreacion ? a : b, {});
    // C. Tarea más antigua (fecha de creación más antigua).
    const tareaMasAntigua = tareas.reduce((a, b) => a.fechaCreacion < b.fechaCreacion ? a : b, {});
    // D. Cantidad de tareas completadas.
    const tareasCompletadas = tareas.filter(t => t.completada).length;
    // D. Cantidad de tareas pendientes.
    const tareasPendientes = totalTareas - tareasCompletadas;
        
    res.json({
        totalTareas,
        tareasCompletadas,
        tareasPendientes,
        tareaMasReciente,
        tareaMasAntigua
    });
});
