
<script>
	
	import { error } from '@sveltejs/kit';

let email='';
let password='';
let comfirmPassword='';

let hasError=false;
let register=false;

function handleAutentificacion(){
    if(!email || !password || (register && !comfirmPassword) ){
        hasError=true;
        return hasError;
    }
}

function handleRegister(){
    register = !register;
}

</script>



<div class="autoContainer">

    <form>
        <h1>{register ? "Register" : "Login"}</h1>
        {#if hasError}
        <p class="error">Infomacion incorrecta</p>
        {/if}

        <label>
            <p class={email ? 'above' : 'center'}>Email</p>
            <input bind:value={email} type="email" placeholder="email"/>
        </label>
        <label>
            <p class={password ? 'above' : 'center'}>Password</p>
            <input bind:value={password} type="password" placeholder="password"/>
        </label>

        {#if register}
        <label>
            <p class={comfirmPassword ? 'above' : 'center'}>Comfirm Password</p>
            <input bind:value={comfirmPassword} type="password" placeholder="comfirm password"/>
        </label>
        {/if}
        
        <button type="submit">Submit</button>
    </form>

    <div class="optionss">
        <p>O</p>
        {#if register}
            <div>
                <p>Ya tienes cuenta?</p>
                <p on:click={handleRegister}
                on:keydown={()=>{}}>Login</p>
            </div>
        {:else}
            <div>
                <p>No tienes cuenta?</p>
                <p on:click={handleRegister}
                on:keydown={()=>{}}>Registrate</p>
            </div>
        {/if}

    </div>

</div>



<style>
.autoContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
}

h1{
    text-align: center;
    margin: 0 auto;
    font-size: 3rem;
}

form{
    display: flex;
    flex-direction: column;
    gap: .5rem;
    width: 20rem;
    max-width: 100%;
    margin: 0 auto;
    padding: 0;
    font-size: 1rem;
}

.optionss{
    width: 20rem;
    margin: 0 auto;
}

form label{
    position: relative;
    border: 2px solid;
    min-width: 100%;

}

form label:focus-within{
    border-color: purple;

}

form input{
    min-width: 100%;
    border: none;
    background:transparent;
    color: white;
    padding: 0.6rem 0.5rem ;
}

form input:focus{
    border: none;
    outline:none ;
}

form button{
    background-color: purple;
    color: white;
    width: 100%;
    border-radius: 0;
    cursor: pointer;
    font-size: 1.2rem;
}

form button:hover{
    background-color: rgba(128, 0, 128, 0.476);

}


.above,
.center{
    position: absolute;
    transform: translateY(-50%);
    pointer-events: none;
    color: white;
    border-radius: none;
    padding: 0 .4rem;
    font-size: .8rem;
}

.above{
    top:0;
    left: 2rem ;
    background-color: purple;
    border: 1px border white;
    font-size: .7rem;
}

.center{
    top: 50%;
    left: .5rem;
    border: 1px solid transparent;
    opacity: 0;
}


.error{
    color: coral;
    font-size: .9rem;
}


.optionss{
    padding: 1rem 0;
    overflow: hidden;
    font-size: .9rem;
}

.optionss>p{
    position: relative;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
}

.optionss > p::after,
.optionss > p::before{
    position: absolute;
    content: "";
    top: 50%;
    transform: translateY(-50%);
    width: 100vw;
    height: 1.5px;
    background-color: white;
}



.optionss > p::after{
    right: 100%;
}

.optionss > p::before{
    left: 100%;
}


.optionss div{
    display: flex;
    flex-direction: column;
    align-items: center;
}


.optionss div p:last-of-type{
    color: cyan;
    cursor: pointer;
    transform: translateY(-90%);
}


</style>