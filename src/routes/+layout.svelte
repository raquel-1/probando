<nav>
	<a href="/">home</a>
	<a href="/blog">blog</a>
	<a href="/dashboard">dashboard</a>
</nav>

<div class="mainContainer">
	<slot />
</div>

<style>
.mainContainer{
	min-height: 100vh;
	background-color: plum;
	color: purple;
	position: relative;
	display: flex;
	flex-direction: column;
}

</style>