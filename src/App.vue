<template>
  <div id="app">
    <b-container>
      <b-tabs>
        <b-tab title="Boilerplate" active>
          <b-row>
            <b-col cols="8">
              <StoveItem :store="store"/>
              <ResultList :store="store"/>
            </b-col>
            <b-col cols="4">
              <Recipeslist :store="store"/>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Рецептура">
          <RecipesEditor :store="store"/>
        </b-tab>
        <b-tab title="Склад" disabled></b-tab>
        <b-tab title="Ингредиенты" >
          <IngredientsEditor :store="store"/>
        </b-tab>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>
import StoveItem from "./components/StoveItem.vue";
import Recipeslist from "./components/Recipeslist.vue";
import ResultList from "./components/ResultList.vue";
import RecipesEditor from "./components/RecipesEditor.vue";
import IngredientsEditor from "./components/IngredientsEditor.vue";
import Store from "./Store.js";

const store = new Store();
export default {
  name: "app",
  components: {
    StoveItem,
    Recipeslist,
    RecipesEditor,
    IngredientsEditor,
    ResultList
  },
  data: function() {
    return {
      store: store
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
