<template>
  <div>
    <h5>Recipeslist</h5>
    <b-row>
      <b-col>
        <ul>
          <li v-for="item in store.state.recipes" :key="item.id">
            <span v-on:click="select(item)">{{item.name}}</span>
          </li>
        </ul>
        <b-button v-on:click="addRecipe">+</b-button>
      </b-col>
      <b-col>
        
          <b-form-input v-model="state.name"></b-form-input>
          <b-form-group
            label="Ингредиенты"
            breakpoint="lg"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <div v-for="(ingr, index) in state.ingredients" :key="ingr.id">
              <b-input-group>
                <b-btn v-on:click="removeIngradient(index)" slot="prepend">-</b-btn>
                <b-form-select v-model="ingr.id" :options="options"/>
                <b-form-input v-model="ingr.quant"></b-form-input>
                <b-dropdown text="$" variant="outline-secondary" slot="append">
                  <b-dropdown-item>gr</b-dropdown-item>
                  <b-dropdown-item>lt</b-dropdown-item>
                </b-dropdown>
              </b-input-group>
            </div>
          </b-form-group>
          <div class="new-ingradient">
            <b-input-group>
              <b-btn  v-on:click="addIngredient" slot="prepend">+</b-btn>
              <b-form-select v-model="temp.id" :options="options"/>
              <b-form-input v-model="temp.quant"></b-form-input>
              <b-dropdown text="$" variant="outline-secondary" slot="append">
                <b-dropdown-item>gr</b-dropdown-item>
                <b-dropdown-item>lt</b-dropdown-item>
              </b-dropdown>
            </b-input-group>
          </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "RecipesEditor",
  props: {
    store: Object
  },
  data: function() {
    return {
      state: {
        name: "",
        ingredients: []
      },
      selected: {},
      temp: {
        id: 0,
        quant: 1
      },
      ingredientsById: _.keyBy(this.store.state.ingredients, "id")
    };
  },
  computed: {
    recipes: function() {
      return this.temp.name
        ? this.store.state.recipes.concat(this.temp)
        : this.store.state.recipes;
    },
    options: function() {
      let result = this.store.state.ingredients.map(item => ({
        text: item.name,
        value: item.id
      }));
      return result;
    }
  },
  methods: {
    select: function(item) {
      this.state = item;
      this.state.ingredients.forEach(item => {
        return item;
      });
    },
    addIngredient: function() {
      this.store.addRecipeIngr(this.state,this.temp)      
    },
    removeIngradient: function(index) {
      this.state.ingredients.splice(index, 1);
    },
    addRecipe: function() {
      let id = parseInt(
        this.store.state.recipes
          .map(item => item.id)
          .sort()
          .pop()
      );
      let recipe = { id: ++id, name: "change me!", ingredients: [] };
      this.store.addRecipe(recipe);
      this.state = Object.assign({}, recipe);
    }
  },
  components: {}
};
</script>

<style scoped>
.ingradients-list {
}
.new-ingradient {
  margin-top: 10px;
}
</style>
