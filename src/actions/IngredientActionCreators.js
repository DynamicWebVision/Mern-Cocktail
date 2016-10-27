/**
 * Created by Brian on 9/28/2016.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');

function loadAllIngredients() {
    $.ajax('/api/ingredients').done(function(data) {
        var action = {
            type: 'load_all_ingredients',
            allIngredients: data
        };
        AppDispatcher.dispatch(action);
    });
}

function addIngredientToSelected(ingredient) {
    var action = {
        type: 'add_ingredient_selected',
        ingredient: ingredient
    };
    AppDispatcher.dispatch(action);
}

function unselectIngredient(ingredient) {
    var action = {
        type: 'remove_ingredient_selected',
        ingredient: ingredient
    };
    AppDispatcher.dispatch(action);
}

function filterSearchStringChange(string) {
    var action = {
        type: 'filter_search_string_change',
        searchText: string
    };
    AppDispatcher.dispatch(action);
}


module.exports = {
    loadAllIngredients: loadAllIngredients,
    addIngredientToSelected: addIngredientToSelected,
    filterSearchStringChange: filterSearchStringChange,
    unselectIngredient: unselectIngredient
};

