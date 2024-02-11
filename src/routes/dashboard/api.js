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

        // Obtener el último ID o establecerlo en 0 si no hay tareas
        const lastId = tasks.length > 0 ? parseInt(tasks[tasks.length - 1].id) : 0;

        // Calcular el nuevo ID sumándole 1 al último ID
        const newId = lastId + 1;

        // Enviar la solicitud POST con el nuevo ID
        const response = await fetch(`${baseURL}/tareas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: newId.toString(), titulo: title, completada: false})
        });

        if (!response.ok) {
            throw new Error('Error al agregar nueva tarea');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error al procesar la solicitud: ' + error.message);
    }
}


// Función para eliminar una tarea en el servidor
export async function deleteTask(taskId) {
    try {
        const response = await fetch(`${baseURL}/tareas/${taskId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
        }

        return true; // Indica que la tarea se eliminó correctamente
    } catch (error) {
        throw new Error('Error al procesar la solicitud: ' + error.message);
    }
}

// Función para actualizar una tarea en el servidor utilizando el método PATCH
export async function patchTask(taskId, updates) {
    try {
        const response = await fetch(`${baseURL}/tareas/${taskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la tarea');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error al procesar la solicitud: ' + error.message);
    }
}

// Función para actualizar una tarea en el servidor utilizando el método PUT
export async function putTask(taskId, updatedTask) {
    try {
        const response = await fetch(`${baseURL}/tareas/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la tarea');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error al procesar la solicitud: ' + error.message);
    }
}

