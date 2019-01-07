<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">рецепты</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#" v-for="item in store.state.recipes" :key="item.id">
            <span v-on:click="handler(item)">{{item.name}}</span>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: "Recipeslist",
  props: {
    store: Object,
    handler: Function
  },
  components: {
  },
  data: function() {
    return {};
  }
};
</script>
