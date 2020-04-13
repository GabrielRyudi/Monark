<template>
	<div class='menu'>
        <div class='menu-top'>
            <p> Monark </p>
        </div>
        <p class='label-menu'> Menu </p>
        <router-link tag='button' to='/dashboard'> Home </router-link>
        <router-link tag='button' to='/cliente'> Cliente </router-link>
        <router-link tag='button' to='/roupa'> Roupa </router-link>
        <router-link tag='button' to='/caixa'> Caixa </router-link>
        <router-link tag='button' to='/pedido'> Pedido </router-link>
        <p class='label-menu'> Monark </p>
        <router-link tag='button' to='/termos'> Termos </router-link>
        <router-link tag='button' to='/about'> Sobre </router-link>
	</div>
</template>

<script>
export default {
    name: 'cpMenu',
    data() {
        return{

        }
    }
}
</script>

<style>

    .menu{
        border-right: 2px solid #f0932b;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background: #222f3e;
        position: block;
    }

    .menu button{
        background: transparent;
        padding: 0.4rem 0.6rem;
        border: none;
        color: white; 
        font-size: 1rem;
    }

    .menu button:active{
        outline: none;
        box-shadow: none;
    }

    .menu-top{
        background: #ff9f43;
        width: 100%;
        height: 7vh;
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .menu-top p{
        color: white;
        margin: 0;
        font-size: 1.2rem;
        text-align: center;
    }

    .label-menu{
        margin: 0;
        margin-left: 5px;
        color: #f0932b;
        font-size: 0.9rem;
    }

</style>

