<template>
	<div id="app">
		<div class='full-container'>
			<router-view></router-view>
		</div>		
	</div>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
			
			}
		}
	}
</script>

<style>
	/* 
		Imagem de <a href="https://pixabay.com/photos/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1031469">Free-Photos</a> por <a href="https://pixabay.com/pt/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1031469">Pixabay</a>
	*/
	body{
		font-family: Verdana, Geneva, sans-serif;
	}
	.full-container{
		padding: 0;
		margin: 0px;
		height: 100vh;
		overflow: hidden;
		width: 100%;
	}
	::-webkit-scrollbar {
		width: 0px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: transparent; 
	}
	
	/* Handle */
	::-webkit-scrollbar-thumb {
		background: transparent; 
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: transparent; 
	}
</style>
