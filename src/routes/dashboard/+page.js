
export const load = async (serverLoadEvent) => {
    console.log('Load function called in page.server.js');
    const { fetch } = serverLoadEvent;
    const title = 'Lista de tareas pendientes';
    const response = await fetch('http://localhost:3001/tareas');
    const tareas = await response.json();
    return { title, tareas };
};
