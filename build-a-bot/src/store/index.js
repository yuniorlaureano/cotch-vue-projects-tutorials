import Vue from 'vue';
import Vuex from 'vuex';
import robotsModule from './modules/robots';
import userModule from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		foo: 'some configurations in the root',
	},
	modules:{
		robots: robotsModule,
		users: userModule
	},
	getters:{
		foo: function(state){
			return state.foo;
		}
	}
});