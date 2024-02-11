const http = require('http');
const url = require('url');
const fs = require('fs');

// Ruta al archivo de la base de datos simulada
const dbPath = '../db.json';

// Cargar la base de datos simulada
let db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// Función para guardar la base de datos en el archivo
function saveDB() {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf-8');
}

// Función para manejar solicitudes POST a /tareas
function handlePostTareas(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const { titulo } = JSON.parse(body);
        const nuevaTarea = {
            id: db.tareas.length > 0 ? db.tareas[db.tareas.length - 1].id + 1 : 1,
            titulo,
            completada: false
        };
        db.tareas.push(nuevaTarea);
        saveDB();
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(nuevaTarea));
    });
}

// Crear servidor HTTP y definir rutas
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (req.method === 'POST' && parsedUrl.pathname === '/tareas') {
        handlePostTareas(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
});

// Iniciar servidor en un puerto específico
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
