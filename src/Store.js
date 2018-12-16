import _ from 'lodash';
import * as Pako from 'pako';

class Store {
    constructor() {
        const initState = {
            experiments: [{
                id: 0,
                parent: 1,
                name: "experiment Whole grain Rye bread",
                ingredients: [{
                    id: 0,
                    quant: 2001
                }, {
                    parent: 1,
                    id: 1,
                    quant: 3000
                }, {
                    id: 3,
                    quant: 500
                }, {
                    id: 4,
                    quant: 80
                }]
            }],
            ingredients: [{
                id: 0,
                name: "water",
                unit: "ml"
            }, {
                id: 1,
                name: "whole grain rye flour",
                unit: "gr"
            }, {
                id: 2,
                name: "whole grain wheat flour",
                unit: "gr"
            }, {
                id: 3,
                name: "Rye sour dough",
                unit: "gr"
            }, {
                id: 4,
                name: "Salt",
                unit: "gr"
            }, {
                id: 5,
                name: "Sugar",
                unit: "gr"
            }],
            stove: [],
            stock: [],

            recipes: [{
                id: 0,
                name: "Whole grain Rye bread",
                ingredients: [{
                    id: 0,
                    quant: 2000
                }, {
                    id: 1,
                    quant: 3000
                }, {
                    id: 3,
                    quant: 500
                }, {
                    id: 4,
                    quant: 80
                }]
            }, {
                id: 1,
                name: "Wheat bread",
                ingredients: [{
                    id: 0,
                    quant: 1500
                }, {
                    id: 2,
                    quant: 3000
                }, {
                    id: 4,
                    quant: 50
                }, {
                    id: 5,
                    quant: 150
                }]
            }]
        };
        let urlState = this.getBase64State();
        this.state = urlState ? urlState : initState;
    }

    stoveIt(recipe) {
        const stoveItem = this.state.stove.find(i => i.recipe == recipe);
        if (!stoveItem) {
            this.state.stove.push({
                count: 1,
                recipe: recipe
            });
        } else {
            stoveItem.count++;
        }
        this.updateBase64Url();
    }
    stoveOut(item) {
        const i = this.state.stove.indexOf(item);
        if (i > -1) {
            this.state.stove.splice(i, 1);
            this.updateBase64Url();
        }
    }
    removeIngredient(item) {
        let index = this.state.ingredients.indexOf(item);
        if (index > -1) {
            this.state.ingredients.splice(index,1); 
            this.updateBase64Url();
        }
    }
    addRecipe(recipe) {
        this.state.recipes.push(recipe || {
            name: 'empty',
            ingredients: []
        })
        this.updateBase64Url();
    }
    addRecipeIngr(recipe, ingr) {
        recipe.ingredients.push(Object.assign({}, ingr));
        this.updateBase64Url();
    }
    addIngredient(ingr)  {
        let id = parseInt(
            this.state.ingredients
              .map(item => item.id)
              .sort()
              .pop()
          );
          id++;
        let newIngr = ingr ? Object.assign({id: id}, ingr) : {
            id: id,
            name: 'empty',
            ingredients: []
        }
        this.state.ingredients.push(newIngr);
        this.updateBase64Url();
    }
    //hash router
    getBase64State() {
        const base64 = window.location.hash.slice(1);
    
        if (!base64) return;
        try {
          const zipped = window.atob(base64);
          const decoded = this.decode(zipped) || '';
          console.log('dec',decoded)
          this.state = decoded;
        } catch (err) {
          console.error('hash parse:', err);
        }
      }
 
      updateBase64Url() {
        const zip = this.encode(this.state);
        window.location.hash = window.btoa(zip);
        // this.test()
    
      }
      encode(dataObject) {
        return Pako.deflate(JSON.stringify(dataObject), {
          to: 'string'
        });
    
      }
      decode(binaryString) {
        
        return JSON.parse(Pako.inflate(binaryString, {
          to: 'string'
        }));
      }
}

export default Store;