<script>
	export let data;
</script>

<h1>blog</h1>

<!--data.summaries viene de +page.server.js-->
<ul>
	{#each data.summaries as { slug, title }}
		<li><a href="/blog/{slug}">{title}</a></li>
	{/each}
</ul>
