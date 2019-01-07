<template>
  <div>
    <h5>Ingredients Editor

       <b-btn  v-on:click="listen" slot="prepend">listen</b-btn>
    </h5>
    <b-row>
      <b-col >
        <div v-for="(item) in store.state.ingredients" :key="item.id" class="item">
            <!-- {{item.id}}|{{index}} -->
          <b-input-group>
            <b-btn v-on:click="remove(item)" slot="prepend">-</b-btn>
            <b-form-input v-model="item.name"/>
            <b-form-input v-model="item.unit"></b-form-input>
          </b-input-group>
        </div>
        <b-input-group class="add-section">
          <b-btn v-on:click="add()" slot="prepend">+</b-btn>
          <b-form-input v-model="state.temp.name"/>
          <b-form-input v-model="state.temp.unit"></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Speech from "./../Speech.js";
const speech = new Speech();

export default {
  name: "IngredientsEditor",
  props: {
    store: Object
  },
  data: function() {
    return {
        state: {
            temp: {}
        }
    };
  },
  computed: {},
  methods: {
    listen: function () {
      console.log('listen')
      speech.listen();
    },
    remove: function(item) {
        this.store.removeIngredient(item)
    },
    add: function () {        
      let ingr = Object.assign({}, this.state.temp)      
      this.store.addIngredient(ingr);
    }
  },
  components: {}
};
</script>

<style scoped>
.add-section {
    margin-top: 20px;
}
.item {
  margin: 10px 0;
}
</style>
