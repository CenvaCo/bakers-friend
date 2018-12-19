<template>
  <div>
    <h5>Печь</h5>
    <b-row>
      <b-col
        v-for="item in store.state.stove"
        :key="item.id"
        class=" list-item"
      >
        <span class="text">{{item.recipe.name}}</span>
        <div class="controls">
          <span v-on:click="dec(item)" class="dec">-</span>
          <b-badge class="counter" variant="primary" pill>{{item.count}}</b-badge>
          <span v-on:click="inc(item)" class="inc">+</span>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "StoveItem",
  props: {
    store: Object
  },
  created: function() {
    console.log(this.store);
  },
  computed: {
  
  },
  methods: {
    dec: function(item) {
      item.count--;
      if (item.count == 0) this.store.stoveOut(item);
    },
    inc: function(item) {
      console.log(item);
      item.count++;
      // this.store.stoveIt(item.item)
    }
  }
};
</script>

<style scoped>
.list-item {
  border: 1px solid black;
  border-radius: 3px;
  padding: 10px;
  margin-right: 10px;
}
.list-item * {
  margin: 0 5px;
}
.controls {
  position: relative;
}
.counter {
  margin: 0 20px;
}
.inc,
.dec {
  position: absolute;
  top: 0;
  bottom: 50%;
  font-size: 1.5rem;
  cursor: pointer;
}
.inc {
  right: 0;
}
.dec {
  /* left: 0; */
}
</style>
