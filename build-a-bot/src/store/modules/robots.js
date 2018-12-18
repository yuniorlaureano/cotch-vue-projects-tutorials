import axios from 'axios';

export default {
	namespaced: true,
	state:{
		cart: [],
		parts: null,
		foo: 'local configuration'
	},
	mutations: {
		addRobotToCart: function(state, robot){
			state.cart.push(robot);
		},
		updateParts: function(state, parts){
			state.parts = parts;
		}
	},
	actions:{
		getParts: function({commit}){
			axios.get('/api/parts')
				 .then(result => commit('updateParts', result.data)).catch(console.error);
		},
		addRobotToCart:function({commit, state}, robot){
			const cart = [...state.cart, robot];
			return axios.post('/api/cart', cart).then(()=> commit("addRobotToCart", robot));
		}
	},
	getters: {
		cartSaleItems: function(state){
			return state.cart.filter(item => item.head.onSale);
		},
		foo: function(state, getters, rootStete){

			return rootStete.foo;//the global configuration from the root
		}
	}
};