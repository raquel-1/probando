// api.js

const baseURL = 'http://localhost:3001'; // URL base del servidor backend simulado

// Función para obtener todas las tareas desde el servidor
export async function getAllTasks() {
    const response = await fetch(`http://localhost:3001/tareas`);
    return response.json();
}

// Función para agregar una nueva tarea en el servidor
export async function addTask(title) {
    try {
        // Obtener todas las tareas existentes
        const tasks = await getAllTasks();

        // Obtener el último ID
        const lastId = tasks[tasks.length - 1].id;

        // Calcular el nuevo ID sumándole 1 al último ID
        const newId = parseInt(lastId) + 1;

        // Enviar la solicitud POST con el nuevo ID
        const response = await fetch(`${baseURL}/tareas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: newId.toString(), titulo: title })
        });

        if (!response.ok) {
            throw new Error('Error al agregar nueva tarea');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error al procesar la solicitud: ' + error.message);
    }
}


// Otras funciones para manejar otras operaciones CRUD, como actualizar y eliminar tareas, según sea necesario




