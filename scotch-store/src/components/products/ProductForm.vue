<template>
	<form @submit.prevent="saveProduct">
		<div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
			<div class="form-group">
				<label>Name</label>
				<input type="text" name="name" placeholder="Name" v-model="model.name" class="from-control" v-validate="'required'">
				<span class="small text-danger" v-show="errors.has('name')">Name is required</span>
			</div>
			<div class="form-group">
				<label>Price</label>
				<input type="number" name="price" placeholder="Price" v-model="model.price" class="from-control" v-validate="'required'">
				<span class="small text-danger" v-show="errors.has('price')">Price is required</span>
			</div>
			<div class="form-group">
				<label>Nanufacturer</label>
				<select type="text" name="manufacturer" placeholder="Manufacturer" v-model="model.manufacturer" class="from-control" v-validate="'required'">
					<template v-for="manufacturer in manufacturers">
						<option :value="manufacturer._id" :selected="manufacturer._id == (model.manufacturer && model.manufacturer._id)">{{manufacturer.name}}</option>
					</template>
				</select>
				<span class="small text-danger" v-show="errors.has('manufacturer')">Manufacturer is required</span>
			</div>
		</div>

		<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
			<div class="form-group">
		        <label>Image</label>
		        <input
		          type="text"
		          placeholder="Image"
		          v-model="model.image"
		          name="image"
		          class="form-control" v-validate="'required|url'"/>
		          <span class="small text-danger" v-show="errors.has('image')">Image is required and must be a valid URL</span>
	        </div>
	        <div class="form-group">
		        <label>Description</label>
		        <textarea 
		          placeholder="Description"
		          rows="5"
		          v-model="model.description"
		          name="description"
		          class="form-control" v-validate="'required'"></textarea>
		           <span class="small text-danger" v-show="errors.has('description')">Description is required</span>
		    </div>
		    <div class="form-group new-button">
		    	<button class="button">
		    		<i class="fa fa-pencil"></i>
		    		<span v-if="isEditing">Update Product</span>
		    		<span v-else>Add Product</span>
		    	</button>
		    </div>
		</div>
	</form>
</template>
<script>
	export default{
		props:['model', 'isEditing','manufacturers'],
		methods:{
			saveProduct(){
				this.$emit('save-product', this.model)
			}
		}
	}
</script>