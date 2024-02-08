<script>


let todoList=['haz tus cosas vago'];
let currTodo='';
let error=false;

function addTodo() {
    error = false;
    if (!currTodo.trim()) {
        error = true;
    }else{
        todoList = [...todoList, currTodo];
    }
    currTodo = "";
}

</script>



<div class="mainContainer">
    <div class="headerContainer">
        <h1>Todo List</h1>
        <button><i class="fa fa-save"></i><p>Guardar</p></button>
    </div>
    <main>
        {#each todoList as todo, index}
            <div class="todo">
                {index +1}.{todo}
            </div>
        {/each}
    </main>
    <div class={"enterTodo " + (error ? "errorBorder" : "")}>
        <input bind:value={currTodo} type="text" placeholder="Enter"/>
        <button on:click={addTodo}>ADD</button>
    </div>
</div>






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
    padding: .4rem  .7rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.enterTodo{
    display: flex;
    align-items: stretch;
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
