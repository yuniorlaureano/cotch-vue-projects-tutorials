<template>
	<div>
		<div class="results">
			<input type="text" class="input" v-model="current">
		</div>
		<button class="button" v-on:click="press">7</button>
	<button class="button" v-on:click="press">8</button>
	<button class="button" v-on:click="press">9</button>
	<button class="button" v-on:click="press">4</button>
	<button class="button" v-on:click="press">5</button>
	<button class="button" v-on:click="press">6</button>
	<button class="button" v-on:click="press">1</button>
	<button class="button" v-on:click="press">2</button>
	<button class="button" v-on:click="press">3</button>
	<button class="button equal-sign" v-on:click="press">=</button>
	<button class="button" v-on:click="press">C</button>
	<button class="button" v-on:click="press">*</button>
	<button class="button" v-on:click="press">/</button>
	<button class="button" v-on:click="press">√</button>
	<button class="button" v-on:click="press">x ²</button>
	</div>
</template>
<script>
	export default {
		name: "Calculator",
		data: function(){
			return {
				current: ''
			};
		},
		methods:{
			press: function(event){
				var key = event.target.innerText;
				var sign = ['=','C','*','/','√','x ²'];				
				if (sign.indexOf(key) < 0) {
					this.current += key;
				}else{
					this.execute()[key]();
				}
			},
			execute: function(){
				return	{
					'=': this.equals,
					'C': this.clear,
					'*': this.multiply,
					'/': this.divide,
					'√': this.squareRoot,
					'x ²': this.square
				};
			},
			equals: function(){
				var indexOf = (this.current).indexOf("^");

				if (indexOf > -1) {
					var base = (this.current).slice(0, indexOf);
					var exponent = (this.current).slice(indexOf + 1);
					this.current = eval("Math.pow(" + base + "," + exponent + ")");
				}else{
					this.current = eval(this.current);
				}
			},
			clear: function(){
				this.current = "";
			},
			backspace: function(){
				this.current = this.current.substring(0, this.current.lenth - 1);
			},
			divide: function() {
			  this.current +=  "/";
			},

			//our ' + ' button
			plus: function() {
			  this.current +=  "+";
			},

			//our ' - ' button
			minus: function() {
			  this.current +=  "-";
			},

			//our ' sin ' button
			sin: function() {
			  this.current = Math.sin(this.current);
			},

			//our ' cos ' button
			cos: function() {
			  this.current = Math.cos(this.current);
			},

			//our ' tan ' button
			tan: function() {
			  this.current = Math.tan(this.current);
			},

			//our ' log ' button
			log: function() {
			  this.current = Math.log10(this.current);
			}
		}
	}
</script>