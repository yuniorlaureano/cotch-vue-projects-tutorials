/*export default {
	bind:function(element){
		element.style.position = 'absolute';
		element.style.bottom = '5px';
		element.style.right = '5px';
	}
}*/
/*export default {
	bind:function(element, binding){
		if (binding.arg !== 'position') 
			return;

		Object.keys(binding.modifiers).forEach((key)=>{
			element.style[key] = '5px';
		});
		element.style.position = 'absolute';
	}
}*/

function applyStyle(element, binding){
	Object.keys(binding.value).forEach((position)=>{
			element.style[position] = binding.value[position];
		});
		element.style.position = 'absolute';
}
export default {
	bind:function(element, binding){
		applyStyle(element, binding);
	},
	update: function(element, binding){
		applyStyle(element, binding);
	}
}