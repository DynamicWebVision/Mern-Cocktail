/**
 * Created by Brian on 9/28/2016.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ArrayHelpers = require('../utils/ArrayHelpers');

var ingredients = [];
var unSelectedFilterIngredientsPool = [];
var unSelectedFilterIngredients = [];
var selectedIngredients = [];

var filterSearchString = "";

function setAllIngredients(allIngredients) {
    ingredients = allIngredients;
    unSelectedFilterIngredientsPool = allIngredients;
}

function addIngredientToSelected(ingredient) {
    selectedIngredients.push(ingredient);
    unSelectedFilterIngredientsPool = ArrayHelpers.removeFromArray(unSelectedFilterIngredientsPool, ingredient);

    //Find Index of Ingredient To Be Removed
    index = unSelectedFilterIngredientsPool.map(function(obj, index) {
        if(obj.ingredient == ingredient) {
            return index;
        }
    }).filter(isFinite);

    unSelectedFilterIngredientsPool.splice(index[0], 1);

    setFilteredUnselectedIngredients();
}

function removeIngredientFromSelected(ingredient) {
    unSelectedFilterIngredientsPool.push(ingredient);

    index = selectedIngredients.map(function(obj, index) {
        if(obj.ingredient == ingredient.ingredient) {
            return index;
        }
    }).filter(isFinite);

    selectedIngredients.splice(index[0], 1);
    setFilteredUnselectedIngredients();
}

function setFilterSearchString(newString) {
    filterSearchString = newString;
}

function setFilteredUnselectedIngredients() {
    if (filterSearchString == '') {
        unSelectedFilterIngredients = [];
    }
    else {
        var regex = new RegExp(filterSearchString, 'i');
        unSelectedFilterIngredients = unSelectedFilterIngredientsPool.filter(function(ingredient) {
            return (ingredient.ingredient.search(regex) > -1);
        });
    }
}

function emitChange() {
    IngredientStore.emit('change');
}

var IngredientStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on('change', callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },
    getAllIngredients: function() {
        return ingredients;
    },
    getUnSelectedFilterIngredients: function() {
        return unSelectedFilterIngredients;
    },
    getSelectedIngredients: function() {
        return selectedIngredients;
    },
    getFilteredUnselectedIngredients: function() {
        return unSelectedFilterIngredients;
    }
});

function handleAction(action) {
    if (action.type === 'load_all_ingredients') {
        setAllIngredients(action.allIngredients);
        emitChange();
    }
    else if (action.type === 'add_ingredient_selected') {
        addIngredientToSelected(action.ingredient);
        emitChange();
    }
    else if (action.type === 'remove_ingredient_selected') {
        removeIngredientFromSelected(action.ingredient);
        emitChange();
    }
    else if (action.type === 'filter_search_string_change') {
        setFilterSearchString(action.searchText);
        setFilteredUnselectedIngredients();
        emitChange();
    }
}


IngredientStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = IngredientStore;