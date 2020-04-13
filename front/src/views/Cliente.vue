<template>
	<div class='divisor'>
        <div class='menu-container'>
            <cpMenu></cpMenu>
        </div>
        <div class='header-cont'>
            <b-row class='head'>
                <b-col cols='7' class='n-header'>
                    <b-form-input v-model='filter' placeholder="Pesquisa" class='header-cont-input'></b-form-input>
                    <button class='btn-pesquisa'><v-awt icon='search'></v-awt></button>
                </b-col>
                <b-col cols='5' class='n-header-v2'>
                    <router-link tag='button' class='btn-sair' to='/about'><v-awt icon='user-circle'></v-awt></router-link>
                    <button class='btn-sair' @click='logout'><v-awt icon='sign-out-alt'></v-awt></button>
                </b-col>
            </b-row>
            <div class='main-wrap'>
                <b-row class='intro'>
                    <b-col class='write-part'>
                        <div class='icon-cont'>
                            <v-awt icon='user' class='wp-icon'></v-awt>
                        </div>
                        <div class='location'>
                            <p class='location-main'> Clientes </p>
                            <p class='location-sub'> Central de cadastro e listagem de clientes da loja </p>
                        </div>
                    </b-col>
                    <b-col class='btn-part'>
                        <button 
                            :class="visible ? null : 'collapsed'"
                            :aria-expanded="visible ? 'true' : 'false'"
                            aria-controls="collapse-1"
                            @click="visible = !visible" class='btn-toggle'>
                            Adicionar <v-awt icon='plus'></v-awt>    
                        </button>
                    </b-col>
                </b-row>
                <b-row class='form'>
                    <b-collapse id="collapse-1" v-model="visible" class="form-card">
                        <p> Novo Cliente </p>
                        <hr class='base'/>
                        <b-row>
                            <b-col cols='7' class='n-cols'>
                                <b-input-group class="mt-3 n-input">
                                    <template v-slot:prepend>
                                        <b-input-group-text class='s-class'>Nome</b-input-group-text>
                                    </template>
                                    <b-form-input v-model='cliente.nome' placeholder="Nome completo"></b-form-input>
                                </b-input-group>
                            </b-col>
                            <b-col cols='5' class='n-cols'>
                                <b-input-group class="mt-3 n-input">
                                    <template v-slot:prepend>
                                        <b-input-group-text class='s-class'>Nascimento</b-input-group-text>
                                    </template>
                                    <b-form-input v-model='cliente.datanasc' type='date'></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols='4' class='n-cols'>
                                <b-input-group class="mt-3 n-input">
                                    <template v-slot:prepend>
                                        <b-input-group-text class='s-class'>Celular</b-input-group-text>
                                    </template>
                                    <b-form-input v-mask='"(##)#####-####"' v-model='cliente.celular' placeholder="Celular"></b-form-input>
                                </b-input-group>
                            </b-col>
                            <b-col cols='8' class='n-cols'>
                                <b-input-group class="mt-3 n-input">
                                    <template v-slot:prepend>
                                        <b-input-group-text class='s-class'>Rua</b-input-group-text>
                                    </template>
                                    <b-form-input v-model='cliente.rua' placeholder="Rua completo"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols='4' class='n-cols'>
                                <b-input-group class="mt-3 n-input">
                                    <template v-slot:prepend>
                                        <b-input-group-text class='s-class'>Bairro</b-input-group-text>
                                    </template>
                                    <b-form-input v-model='cliente.bairro' placeholder="Bairro"></b-form-input>
                                </b-input-group>
                            </b-col>
                            <b-col cols='5' class='n-cols'>
                                <b-input-group class="mt-3 n-input">
                                    <template v-slot:prepend>
                                        <b-input-group-text class='s-class'>Cidade</b-input-group-text>
                                    </template>
                                    <b-form-input v-model='cliente.cidade' placeholder="Cidade"></b-form-input>
                                </b-input-group>
                            </b-col>
                            <b-col cols='3' class='n-cols'>
                                <b-input-group class="mt-3 n-input">
                                    <template v-slot:prepend>
                                        <b-input-group-text class='s-class'>Número</b-input-group-text>
                                    </template>
                                    <b-form-input v-model='cliente.numero' placeholder="Número"></b-form-input>
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class='n-cols'>
                                <b-input-group class="mt-3 n-input">
                                    <b-form-textarea 
                                        placeholder="Observações"
                                        rows="3"
                                        no-resize
                                        class='n-textarea'
                                        v-model='cliente.obs'
                                    ></b-form-textarea>   
                                </b-input-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class='n-cols' style='margin-top:0.8rem;'>
                                <b-button variant="success" @click='submitForm()'>Salvar</b-button>
                            </b-col>
                        </b-row>
                    </b-collapse>
                </b-row>
                <b-row class='n-table'>
                    <div class='table-cont'>
                        <p> Clientes </p>
                        <hr class='base-table'/>
                        <b-table fixed borderless :items="items" :fields="fields" :filter="filter" :filterIncludedFields="filterOn" @filtered="onFiltered" :current-page="currentPage" :per-page="perPage"  id="my-table">
                            <template v-slot:cell(actions)="row">
                                <button 
                                    @click="info(row.item, row.index, $event.target)" 
                                    class="btn-ficha"
                                    >
                                    Ficha completa
                                </button>
                            </template>
                        </b-table>
                        <b-modal :id="infoModal.id" :title="infoModal.title" ok-only centered @hide="resetInfoModal" button-size="sm">
                            <template v-slot:modal-header="">
                                <h5>{{infoModal.title}}</h5>
                            </template>
                            <div class='n-modal'>
                                <b-row class='n-modal-row'>
                                    <b-col>
                                        <p class='modal-label'> Nascimento </p>
                                        {{infoModal.content.datanasc | formataData(infoModal.content.datanasc)}}
                                    </b-col>
                                    <b-col>
                                        <p class='modal-label'> Celular </p>
                                        {{infoModal.content.celular}}
                                    </b-col>
                                </b-row>
                                <b-row class='n-modal-row'>
                                    <b-col>
                                        <p class='modal-label'> Rua </p>
                                        {{infoModal.content.rua}}
                                    </b-col>
                                </b-row>
                                <b-row class='n-modal-row'>
                                    <b-col>
                                        <p class='modal-label'> Bairro </p>
                                        {{infoModal.content.bairro}}
                                    </b-col>
                                </b-row>
                                <b-row class='n-modal-row'>
                                    <b-col>
                                        <p class='modal-label'> Cidade </p>
                                        {{infoModal.content.cidade}}
                                    </b-col>
                                    <b-col>
                                        <p class='modal-label'> Número </p>
                                        {{infoModal.content.numero}}
                                    </b-col>
                                </b-row>
                                <b-row class='n-modal-row'>
                                    <b-col>
                                        <p class='modal-label'> Observações </p>
                                        {{infoModal.content.obs}}
                                    </b-col>
                                </b-row>
                            </div>
                            <template v-slot:modal-footer="{ ok }">
                                <b-button size="sm" variant="danger" @click='excluirMd(infoModal.content)'>
                                    Deletar
                                </b-button>
                                <b-button size="sm" variant="info" @click="up(infoModal.content)">
                                    Modificar
                                </b-button>
                                <b-button size="sm" variant="success" @click="ok()">
                                    Fechar
                                </b-button>
                            </template>
                        </b-modal>
                        <b-modal :id="excModal.id" title="Aviso!" centered @hide="resetExcModal" button-size="sm">
                            <p class="my-4">Tem certeza que quer deletar o cliente {{clienteExc.cliente}}?</p>
                            <template v-slot:modal-footer="{ ok }">
                                <b-button size="sm" variant="danger" @click='excluir(clienteExc.id)'>
                                    Deletar
                                </b-button>
                                <b-button size="sm" variant="success" @click="ok()">
                                    Cancelar
                                </b-button>
                            </template>
                        </b-modal>
                        <b-modal class='modalUp' :id="updateModal.id" ok-only centered @hide="resetInfoModalUp" button-size="sm">
                            <template v-slot:modal-header="">
                                <h5>Modificar cliente</h5>
                            </template>
                            <div class='n-modal'>
                                <input type='hidden' v-model='clienteUp.id'> 
                                <b-row class='u-row'>
                                    <p> Nome </p>
                                    <b-input-group class="mt-3 u-input">
                                        <b-form-input v-model='clienteUp.nome' placeholder="Nome completo"></b-form-input>
                                    </b-input-group>
                                </b-row>
                                <b-row class='u-row'>
                                    <p> Data de nascimento </p>
                                    <b-input-group class="mt-3 u-input">
                                        <b-form-input v-model='clienteUp.datanasc' type='date'></b-form-input>
                                    </b-input-group>
                                </b-row>
                                <b-row class='u-row'>
                                    <p> Celular </p>
                                    <b-input-group class="mt-3 u-input">                                
                                        <b-form-input v-mask='"(##)#####-####"' v-model='clienteUp.celular' placeholder="Celular"></b-form-input>
                                    </b-input-group>
                                </b-row>
                                <b-row class='u-row'>
                                    <p> Rua </p>
                                    <b-input-group class="mt-3 u-input">                                       
                                        <b-form-input v-model='clienteUp.rua' placeholder="Rua completo"></b-form-input>
                                    </b-input-group>
                                </b-row>
                                <b-row class='u-row'>
                                    <p> Bairro </p>
                                    <b-input-group class="mt-3 u-input">
                                        <b-form-input v-model='clienteUp.bairro' placeholder="Bairro"></b-form-input>
                                    </b-input-group>
                                </b-row>
                                <b-row class='u-row'>
                                    <p> Cidade </p>
                                    <b-input-group class="mt-3 u-input">
                                        <b-form-input v-model='clienteUp.cidade' placeholder="Cidade"></b-form-input>
                                    </b-input-group>
                                </b-row>
                                <b-row class='u-row'>
                                    <p> Número </p>
                                    <b-input-group class="mt-3 u-input">
                                        <b-form-input v-model='clienteUp.numero' placeholder="Número"></b-form-input>
                                    </b-input-group>
                                </b-row>
                                <b-row class='u-row'>
                                    <p> Observações </p>
                                    <b-input-group class="mt-3 u-input">
                                        <b-form-textarea 
                                            placeholder="Observações"
                                            rows="3"
                                            no-resize
                                            class='u-textarea'
                                            v-model='clienteUp.obs'
                                        ></b-form-textarea>   
                                    </b-input-group>
                                </b-row>
                            </div>
                            <template v-slot:modal-footer="{ ok }">
                                <b-button size="sm" variant="danger" @click="ok()">
                                    Cancelar
                                </b-button>
                                <b-button size="sm" variant="success" @click="update()">
                                    Salvar
                                </b-button>
                            </template>
                        </b-modal>
                        <hr class='base-table'/>
                        <div class='n-pagination'>
                            <b-pagination 
                                v-model="currentPage" 
                                align="center" 
                                :total-rows="rows" 
                                first-number 
                                last-number 
                                :per-page="perPage" 
                                aria-controls="my-table" 
                                size="sm">
                            </b-pagination>
                        </div>           
                    </div>
                </b-row>
                <b-row>
                    <b-col class='rodape'>
                        <p> Ottersystem @ todos os direitos reservados, 2020. </p>
                    </b-col>
                </b-row>
            </div>
        </div>
	</div>
</template>

<script>
    import cpMenu from '../components/menu'

    export default {
        name: 'Cliente',
        components: {cpMenu},
        data() {
            return{
                fields:[
                    {
                        key:'nome',
                        label:'Nome',
                        sortable: true
                    },
                    {
                        key:'celular',
                        label: 'Celular',
                        sortable: false
                    },
                    {
                        key:'rua',
                        label:'Endereço',
                        sortable: false
                    },
                    {
                        key:'cidade',
                        label: 'Cidade',
                        sortable: false
                    },
                    {
                        key: 'actions',
                        label:'Ações'
                    }
                ],
                filter: '',
                currentPage: 1,
                perPage: 15,
                filterOn: [],
                items:[],
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: ''
                },
                updateModal:{
                    id: 'info-modal-update',
                    content: ''
                },
                excModal:{
                    id: 'excModal',
                    content: ''
                },
                cliente:{
                    nome: '',
                    celular: '',
                    rua: '',
                    bairro: '',
                    cidade: '',
                    numero: '',
                    datanasc: '',
                    obs: ''
                },
                clienteUp:{
                    id: '',
                    nome: '',
                    celular: '',
                    rua: '',
                    bairro: '',
                    cidade: '',
                    numero: '',
                    datanasc: '',
                    obs: ''
                },
                clienteExc:{
                    id: '',
                    cliente: ''
                },
                append: true,
                visible: false
            }
        },
        methods:{
            onFiltered(filteredItems) {
                this.totalRows = filteredItems.length
                this.currentPage = 1
            },
            info(item, index, button) {
                this.infoModal.title = item.nome;
                this.infoModal.content = item;
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },
            up(item, button) {
                this.clienteUp.id = item._id;
                this.clienteUp.nome = item.nome;
                this.clienteUp.celular = item.celular;
                this.clienteUp.rua = item.rua;
                this.clienteUp.bairro = item.bairro;
                this.clienteUp.cidade = item.cidade;
                this.clienteUp.numero = item.numero;
                var datan = this.modifyDate(item.datanasc);
                this.clienteUp.datanasc= datan;
                this.clienteUp.obs = item.obs;
                this.$root.$emit('bv::show::modal', this.updateModal.id, button)
            },
            excluirMd(item, button){
                this.clienteExc.cliente = item.nome;
                this.clienteExc.id = item._id;
                this.$root.$emit('bv::show::modal', this.excModal.id, button)
            },
            resetInfoModal() {
                this.infoModal.title = ''
                this.infoModal.content = ''
            },
            resetInfoModalUp() {
                this.updateModal.content = ''
            },
            resetExcModal() {
                this.excModal.content = ''
            },
            submitForm(){
                let cliente = this.cliente;
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.post('/cliente/', cliente, config)
                    .then(response => {
                        const mensagem = response.data.msg;
                        this.visible = false;
                        this.makeToast(mensagem);
                        this.clean();
                        this.getInfo();
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            getInfo(){
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.get('/cliente/', config)
                    .then(response => {
                        this.items = response.data; 
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            update(){
                let cliente = this.clienteUp;
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                this.$http.put('/cliente/', cliente, config)
                    .then(response => {
                        var mensagem = response.data.msg;
                        this.$bvModal.hide(this.infoModal.id);
                        this.$bvModal.hide(this.updateModal.id);
                        this.makeToast(mensagem);
                        this.getInfo();
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            excluir(id){
                let token = localStorage.getItem('jwt');
                let config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                var _id = id;
                var url = '/cliente/'+_id;
                this.$http.delete(url, config)
                    .then(response => {
                        var mensagem = response.data.msg;
                        this.$bvModal.hide(this.excModal.id);
                        this.$bvModal.hide(this.infoModal.id);
                        this.makeToast(mensagem);
                        this.getInfo();
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
            },
            makeToast(msg) {
                this.$bvToast.toast(msg, {
                    title: 'Aviso',
                    variant: 'info',
                    appendToast: this.append
                })
            },
            clean(){
                this.cliente.nome = '',
                this.cliente.celular = '',
                this.cliente.rua = '',
                this.cliente.bairro = '',
                this.cliente.cidade = '',
                this.cliente.numero = '',
                this.cliente.datanasc = '',
                this.cliente.obs = ''
            },
            modifyDate(data) {
                var nData = new Date(data).toLocaleDateString('en-US', {timeZone: 'UTC'});
                var full = new Date(nData);
                var dia = full.getDate();
                if(dia < 10){
                    dia = '0'+dia
                }
                var mes = full.getMonth() + 1;
                if(mes < 10){
                    mes = '0'+mes
                }
                var ano = full.getFullYear();
                var resultado = ano+'-'+mes+'-'+dia;
                return resultado;
            },
            logout(){
                localStorage.removeItem('jwt');
                this.$router.push("/");
            }
        },
        filters:{
            formataData(data){
                var nDate = new Date(data).toLocaleDateString('en-US', {timeZone: 'UTC'});
                var full = new Date(nDate);
                var dia = full.getDate();
                if(dia < 10){
                    dia = '0'+dia
                }
                var mes = full.getMonth() + 1;
                if(mes < 10){
                    mes = '0'+mes
                }
                var ano = full.getFullYear();
                var resultado = dia+'/'+mes+'/'+ano;
                return resultado
            }
        },
        computed: {
            rows() {
                return this.items.length
            }
        },
        created() {
            this.getInfo();
        }
    }

</script>

<style>

    .divisor{
        display: flex;
        flex-direction: row;
        overflow: hidden;
    }

    .header-cont{
        padding: 0;
        width: 88%;
        height: 100vh;
        background: #ced6e041;
        overflow: hidden;
    }

    .main-wrap{
        height: 94%;
        overflow: auto;
    }

    .menu-container{
        padding: 0;
        width: 12%;
        height: 100vh;
    }

    .header-cont-title{
        font-size: 1.6rem;
        margin: 0;
        margin-left: 1rem;
    }

    .header-cont-input{
        margin: 0!important;
        padding: 3px 0.6rem;
        background: #ffbe76;
        color: black!important;
        border: none;
        font-size: 1rem;
        border-radius: 0;
        height: 70%;
        width: 50%;
    }

    .header-cont-input::-webkit-input-placeholder{
        color: black;
    }

    .header-cont-input::-ms-input-placeholder{
        color: black;
    }

    .header-cont-input::-moz-placeholder{
        color: black;
    }

    .header-cont-input:focus{
        box-shadow: none;
        outline: none;
        background: #ffbe76;
    }

    .btn-pesquisa{
        background: #e67e22;
        border: none;
        width: 8%;
        padding: 3px 0;
        margin-left: 0.5rem;
        color: white;
    }

    .btn-pesquisa:focus{
        box-shadow: none;
        outline: none;
    }

    .head{
        background: #ff9f43;
        height: 7vh;
        width: 100%;
    }

    .n-header{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .n-header-v2{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .btn-sair{
        background: transparent;
        color: #ee5253;
        border:none;
        font-size: 1.5rem;
        height: 100%;
        padding: 0;
        padding-right:0.8rem;
    }

    .btn-sair:focus{
        box-shadow: none;
        outline: none;
    }

    .row{
        margin-left: 0px!important;
    }

    .user-name{
        margin: 0;
        color: white;
        font-size: 1.2rem;
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        margin-left: 0.4rem;
    }

    .intro{
        height: 12vh;
        width: 100%;
        margin-top: 0.5rem;
    }
    
    .write-part{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .icon-cont{
        border-radius: 5px;
        background: #ff9f43;
        color: white;
        width: 10%;
        height: 70%;
        font-size: 2.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .location{
        margin-left: 10px;
    }

    .location p{
        margin: 0;
    }

    .location-main{
        font-size: 1.2rem;
    }

    .location-sub{
        font-size: 0.8rem;
    }

    .btn-part{
        display:flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 0.7rem;
    }

    .btn-toggle{
        color: white;
        background: #ff9f43;
        border: 0;
        padding: 0.3rem 0.6rem;
        font-size: 0.9rem;
        border-radius: 5px;
    }

    .btn-toggle:focus{
        background: #ff9f43;
        box-shadow: none;
        outline: none;
    }  

    .btn-toggle:hover{
        background: #ff9f43;
        box-shadow: none;
        outline: none;
    }

    .form{
        background: #dcdde1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .form-card{
        width: 75%;
        margin: 1.5rem 0;
        padding: 0.7rem;
        background: white;
        border-radius: 5px;
    }

    .form-card p{
        font-size: 1.3rem;
        margin: 0;
    }

    .base{
        margin: 0;
        border-color: #e67e22;
        width: 40%;
        margin-bottom: 1rem;
    }

    .n-cols{
        padding: 0;
        padding-right: 0.7rem;
    }
    
    .n-input input{
        border: 0;
        border-bottom: 1px solid #ff9f43;
        border-radius: 0;
        font-size: 1.3rem;
    }

    .n-input input:focus{
        border: 0;
        border-bottom: 1px solid #ff9f43;
        box-shadow: none;
        outline:none;
    }

    .s-class{
        background: transparent;
        border: 0;
        border-bottom: 1px solid #ff9f43;
        color: #e67e23;
    }

    .n-textarea{
        border-color:#ff9f43;
        font-size: 1.3rem;
    }

    .n-textarea:focus{
        border-color:#ff9f43;
        box-shadow: none;
        outline:none;
    }

    .n-table{
        width: 100%;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .table-cont{
        width: 100%;
        background: white;
        border-radius: 8px;
        border: 1px solid #dcdde1;
    }

    .table-cont p{
        font-size: 1.1rem;
        margin: 0.6rem 0 0 1rem;
    }

    .base-table{
        width: 100%;
        margin:0;
        border-color: #e67e23;
    }

    .table{
        margin: 0;
    }

    .table tr td{
        padding:0.3rem 0.7rem!important;
        font-size: 0.9rem;
        text-align: center;
    }

    .table tr th{
        padding:0.3rem 0.7rem!important;
        font-size: 0.9em;
        text-align: center;
        color: #e67e23;
        font-weight: bold;
    }

    .btn-ficha{
        background: none;
        color:black;
        border: none;
        padding: 0;
        font-size: 0.9rem;
        padding-bottom: 2px;
    }

    .btn-ficha:hover{
        background: none;
        color:black;
        border: none;
        outline: none;
    }

    .btn-ficha:focus{
        background: none;
        color:black;
        border: none;
        outline: none;
    }

    .n-modal{
        width: 100%;
    }

    .n-modal-row{
        margin:1rem 0;
        font-size: 1.2rem;
        width: 100%;
    }

    .modal-label{
        margin:0;
        font-size: 0.8rem!important;
        font-weight: bold;
        color:#e67e22;
    }

    .modal-header{
        padding: 0.5rem!important;
        border: none;
        background: rgba(0, 0, 0, 0.678);
    }
    
    .modal-header h5{
        color:white;
        font-size: 1.4rem!important;
    }

    .modal-body{
         background: rgba(0, 0, 0, 0.678);
         color: white;
         padding: 0.2rem;
    }

    .modal-footer{
        padding: 0.2rem!important;
        border: none;
        background: rgba(0, 0, 0, 0.678);
    }

    .modal-content{
        background: url('../assets/profileBg.jpg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border: none;
        width: 80%;
    }

    .n-pagination{
        width: 100%;
        margin: 1rem 0;
    }

    .page-item.active .page-link{
        color: white;
        background: #e67e23;
        border-color: #e67e23;
    }

    .more-info{
        width: 100%;
    }

    .more-info-ccl{
        background: white;
        border-radius: 8px;
        border: 1px solid #dcdde1;
    }

    .more-info-ccl p{
        font-size: 1.1rem;
        margin: 0.6rem 0 0 1rem;
    }

    .rodape p{
        color:#e67e23;
        margin: 0;
        text-align: center;
        margin-top: 1.5rem;
        font-size: 0.8rem;
    }

    .u-row{
        width: 100%;
        padding: 0.5rem;
    }

    .u-row p{
        margin: 0;
        font-size: 0.7rem;
        font-weight: bold;
    }

    .u-input{
        padding:0!important;
        margin:0!important;
    }

    .u-input input{
        margin: 0;
        background: transparent;
        border: none;
        border-radius: 0;
        color: white;
        border-bottom: 1px solid white;
        font-size: 0.9rem;
    }

    .u-input input:focus{
        background: transparent;
        outline: none;
        box-shadow: none;
        color: white;
        border-bottom: 1px solid white;
    }

    .u-textarea{
        background: transparent;
        border: 1px solid white;
        color: white;
        font-size: 0.9rem;
    }

    .u-textarea:focus{
        background: transparent;
        outline: none;
        box-shadow: none;
        color: white;
        border: 1px solid white;
    }

</style>