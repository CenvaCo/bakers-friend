<template>
  <div>
    <h5>ResultList</h5>

    <b-table striped hover responsive :items="list" :fields="fields"></b-table>
  </div>
</template>

<script>
export default {
  name: "ResultList",
  props: {
    store: Object
  },
  data: function() {
    return {
      ingredientsById: _.keyBy(this.store.state.ingredients, "id")
    };
  },

  computed: {
    fields: function() {
      return {
        id: {
          key: "id",
          label: "№"
        },
        name: {
          label: "Наименование"
        },
        count: {
          key: "count",
          label: "Количество"
        },
        quant: {
          label: "quant"
        },
        value: {
          label: "Всего"
        },
        unit: {
            label: ''
        },
        store: {
          label: "Склад"
        }
      };
    },
    list: function() {
      let result = [];
      this.store.state.stove.forEach(stoveItem => {
        stoveItem.recipe.ingredients.forEach(ingr => {
          const item = result.find(x => x.id === ingr.id);
          if (!item) {
            let staticIngr = this.store.state.ingredients.find(item=>(item.id == ingr.id)) || {}
            result.push({
              name: staticIngr.name,
              quant: ingr.quant,
              id: ingr.id,
              count: stoveItem.count,
              value: stoveItem.count * ingr.quant,
              unit: staticIngr.unit
            });
          } else {
            item.count += stoveItem.count;
          }
        });
      });
      return result;
    }
  }
};
</script>
