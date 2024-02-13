<script>

//39:20 / 1:20:46
//https://www.youtube.com/watch?v=TIbL0VOE900

import { addTask, deleteTask, patchTask, putTask } from './api.js';

export let data;



let nuevoTitulo = '';
let editingTaskId = null;

async function idEditar(taskId) {
    editingTaskId = taskId;
}

/**
 let tasks = [];// Aquí almacenaremos las tareas obtenidas
async function obtenerTareas() {
    try {
        tasks = await getTasks();
        console.log('Tareas obtenidas:', tasks);
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
    }
}

// Llama a obtenerTareas al cargar la página
obtenerTareas();
 */


async function addSubmit(event) {
    event.preventDefault();
    try {
        const nuevaTarea = await addTask(nuevoTitulo);
        console.log('Nueva tarea agregada:', nuevaTarea);
        // Recargar la página después de agregar la tarea
        location.reload();
    } catch (error) {
        console.error('Error al agregar nueva tarea:', error);
    }
}

// Define la función eliminarTarea
async function eliminarTarea(taskId) {
    try {
      const deleted = await deleteTask(taskId);
      if (deleted) {
        // Si la tarea se eliminó correctamente, actualiza los datos de las tareas
        // Aquí puedes recargar los datos de las tareas o actualizar el estado de tu componente según sea necesario
        console.log('Tarea eliminada correctamente');
        // Recargar la página después de eliminar la tarea
        location.reload();
      } else {
        console.error('Error al eliminar la tarea');
      }
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
}

async function actualizarPatch(taskId, updatedTask) {
    try {
        const updated = await patchTask(taskId, updatedTask); // Utilizar patchTask para actualizar parcialmente la tarea
        console.log('Tarea actualizada:', updated);
        // Aquí puedes realizar otras acciones después de la actualización, como recargar los datos o actualizar el estado
        console.log('Tarea actualizada:', updated);
        editingTaskId = null;
        location.reload();
    } catch (error) {
        console.error('Error al editar la tarea:', error);
    }
}

async function actualizarPut(event, taskId, updatedTask) {
    event.preventDefault();
    try {
        // Verificar si el campo completada existe en updatedTask
        if (!updatedTask.hasOwnProperty('completada')) {
            // Si no existe, agregarlo con el valor false
            updatedTask.completada = false;
        }
        
        // Enviar la solicitud al servidor para actualizar la tarea
        const updated = await putTask(taskId, updatedTask);
        
        console.log('Tarea actualizada:', updated);
        editingTaskId = null;
        location.reload();
    } catch (error) {
        console.error('Error al guardar la edición de la tarea:', error);
    }
}






</script>


<div class="mainContainer">
    <div class="headerContainer">
        <h1>{data.title}</h1>
        <div class="headerBotones">
            <button><i class="fa fa-save"></i><p>Guardar</p></button>
            <button><i class="fa fa-sign-out"></i><p>Logout</p></button>

        </div>
    </div>
    <main>
        {#if  data.tareas.length==0}
            <p> Nada por hacer</p>
        {/if}
        {#each data.tareas as todo, index}
            <div class="todo">
                {#if editingTaskId === todo.id}
                    <form on:submit={(e) => e.preventDefault()} class="enterTodo">
                        <input type="text" bind:value={todo.titulo}>
                        <!--
                            <button type="button" on:click={() => actualizarPut(event, todo.id, { titulo: todo.titulo })}>Guardar</button>
                        -->
                        <button type="button" on:click={() => actualizarPatch(todo.id, { titulo: todo.titulo })}>Guardar</button>

                    </form>
                {:else}
                    <p id="todoItem-{todo.id}" onclick={() => editingTaskId = todo.id}>{index + 1}.{todo.titulo}</p>
                {/if}

                <div class="acciones">
                    <i class="far fa-edit"on:click={() => idEditar(todo.id)}></i>
                    <i class="far fa-trash-alt" on:click={() => eliminarTarea(todo.id)}></i>
                </div>
            </div>
        {/each}

    </main>

    <!-- Formulario para agregar una nueva tarea -->
<form on:submit={addSubmit}  class="enterTodo " >
    <input type="text" bind:value={nuevoTitulo} placeholder="Ingrese el título de la nueva tarea" required />
    <button type="submit">ADD</button>
</form>

    
</div>


<!--

    <div class="mainContainer">
    <div class="headerContainer">
        <h1>Tareas</h1>
    </div>
    <main>
        {#if tasks.length === 0}
            <p>No hay tareas.</p>
        {:else}
            {#each tasks as task (task.id)}
                <div class="todo">
                    {#if editingTaskId === task.id}
                        <form on:submit={(e) => e.preventDefault()} class="enterTodo">
                            <input type="text" bind:value={task.titulo}>
                            <button type="button" on:click={() => actualizarPatch(task.id, { titulo: task.titulo })}>Guardar</button>
                        </form>
                    {:else}
                        <p id="todoItem-{task.id}" onclick={() => editingTaskId = task.id}>{index + 1}.{task.titulo}</p>
                    {/if}

                    <div class="acciones">
                        <i class="far fa-edit" on:click={() => idEditar(task.id)}></i>
                        <i class="far fa-trash-alt" on:click={() => eliminarTarea(task.id)}></i>
                    </div>
                </div>
            {/each}
        {/if}
    </main>
</div>
-->



<style>

.mainContainer{
    display: flex;
    flex-direction: column;
    min-height: 90vh;
    gap: 2rem;
    padding: 2rem;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
}

.headerContainer{
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.headerBotones{
    display: flex;
    align-items: center;
    gap:1rem;
}

.headerContainer button{
    padding: .5rem 1rem;
    background-color: purple;
    border: none;
    font-weight: 700;
    border-radius: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    gap: .6rem;
    justify-content: s;
    border: 1px solid purple;

}

.headerContainer button:hover{
    background: transparent;
    color: purple;
    border: 1px solid purple;

}

.headerContainer button i{
    font-size: 1.2rem;
    transform: translatey(50%);
}

.headerContainer button p{
    font-size: 1.2rem;
    transform: translatey(-30%);
}

main{
    display: flex;
    flex-direction: column;
    gap: .5rem;
    flex: 1;
}

.todo{
    border-left: 1px solid purple;
    padding: .5rem  .8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.acciones{
    display: flex;
    align-items: center;
    gap: .5rem;
    font-size: 1.3rem;
}

.acciones i:hover{
    color:rgb(255, 0, 136);
}

.acciones i{
    cursor: pointer;
}



.enterTodo{
    display: flex;
    align-items: stretch;
    flex-direction: row;
    min-width: 40%;
    border: 1px solid purple;
    overflow: hidden;
}

.enterTodo input{
    background: transparent;
    border: none;
    padding: 1rem;
    color:white;
    flex: 1;
}

.enterTodo input:focus{
    outline: none;
}

.enterTodo button{
    padding: 0 1rem;
    background-color: purple;
    border: none;
    font-weight: 600;
    border-radius: 0;
    cursor: pointer;
}

.enterTodo button:hover{
    background: transparent;
    border-left: 1px solid purple;
    color: purple;
    font-weight: 1000;

}

.errorBorder input{
    background:rgb(255, 0, 136) !important;
    border-radius: 0;
}




</style>
