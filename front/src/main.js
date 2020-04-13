import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMask from 'v-mask'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import App from './App.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Cliente from './views/Cliente.vue'
import Roupa from './views/Roupa.vue'
import Pedido from './views/Pedido.vue'
import Caixa from './views/Caixa.vue'
import About from './views/About.vue'
import Termo from './views/Termos.vue'

const http = axios.create({
	baseURL: 'http://localhost:4000',
})

Vue.prototype.$http = http

Vue.use(VueMask);
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

library.add(fas)
library.add(far)

Vue.component('v-awt', FontAwesomeIcon)

const router = new VueRouter({
	mode: 'history',
	routes:[
		{
			path: '/dashboard',
			component:Dashboard,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/',
			component:Login
		},
		{
			path: '/cliente',
			component:Cliente,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/roupa',
			component:Roupa,
			meta: {
				requiresAuth: true
			}
		},
		{
      		path: '/pedido',
			component:Pedido,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/caixa',
			component:Caixa,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/about',
			component: About,
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/termos',
			component: Termo,
			meta: {
				requiresAuth: true
			}
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
	  	if (localStorage.getItem("jwt") == null) {
			next({
		  		path: "/"
			});
	  	} else {
			next();
	  	}
	} else {
	  	next();
	}
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
