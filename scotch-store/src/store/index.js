import Vue from 'vue'
import Vuex from 'vuex'
import { productGetters, manufacturerGetters } from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: true,
	state: {
		cart: [],
		showLoader: false,
		product: {},
		products: [],
		manufacturers: []
	},
	mutations: Object.assign({}, productMutations, cartMutations, manufacturerMutations)
})