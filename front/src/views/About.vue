<template>
    <div class='about-cont'>
        <div class='about'>
            <img src='../assets/logoOt.png' class='about-logo'/>
            <div class='div-bt-hold'>
                <h3>Sobre</h3>
                <p> 
                    A Ottersystem é uma empresa de aplicações web, aplicativos e aplicações para desktop sob 
                    encomenda, ou genéricos para usos variados, tais como sistemas de gerenciamento, portifólios, 
                    plataformas de e-commerce entre outros. A empresa existe desde 2020, fundada em Curitiba, e 
                    procura atender clientes exigentes e necessitados de um sistema por preços acessíveis e negociáveis.
                </p>
                <ul>
                    <li>
                        <div class='info-contato'>
                            <div class='iconrin'>
                                <img class='icoron' src='../assets/wpLogo.png'/>
                            </div>
                            <div class='textorin'>
                                <p>(41)99150-5315</p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class='info-contato'>
                            <div class='iconrin' style='margin-right: 5px;'>
                                <img class='icoron' src='../assets/gmail.png'/>
                            </div>
                            <div class='textorin'>
                                <p>ottersystem@gmail.com</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <router-link to='/dashboard' class='btn-sair-about'> <v-awt icon='arrow-left'></v-awt> Sair </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    data() {
        return{

        }
    }
}
</script>

<style>

    .about-cont{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .about{
        width: 45%;
    }

    .about-logo{
        margin: auto;
    }

    .div-bt-hold{
        border: 1px solid #bdc3c7;
        padding: 1rem;
        margin-bottom: 10px;
    }

    .div-bt-hold p{
        text-align: justify;
    }

    .div-bt-hold ul li{
        margin: 0;
        list-style: none;
        display: inline-block;
        margin-right: 10px;
    }

    .div-bt-hold ul{
        margin: 0;
        padding: 0;
    }

    .iconrin{
        width: 30px;
        height: 25px;
    }

    .icoron{
        width: 100%;
        height: 100%;
    }

    .textorin p{
        margin: 0;
        text-align: justify;
        font-size: 0.9rem;
    }

    .info-contato{
        margin-top: 0.7rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .btn-sair-about{
        color: #e67e22;
    }

</style>

