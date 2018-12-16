<template>
  <div>
    <h5>Recipeslist</h5>
    <ul>
      <li v-for="item in store.state.recipes" :key="item.id">
        <span v-on:click="stoveIt(item)">{{item.name}}</span>
      </li>
    </ul>
    <!-- <TreeView :model="tree" /> -->
  </div>
</template>

<script>
import TreeView from "./TreeView.vue";

export default {
  name: "Recipeslist",
  props: {
    store: Object
  },
  components: {
    TreeView
  },
  data: function() {
    return {
     
    };
  },
  methods: {
    stoveIt: function(item) {
      this.store.stoveIt(item);
    }
  }
};
</script>
