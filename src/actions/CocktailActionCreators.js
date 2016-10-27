/**
 * Created by Brian on 9/28/2016.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');

function searchCocktails(ingredients) {
    var postIngredients = ingredients.map(function(a) {return a.ingredient;});

    var post = {
        "ingredients": postIngredients
    };

    $.ajax({
        url : "/api/cocktail_search",
        type: "POST",
        data : post,
        success: function(data, textStatus, jqXHR)
        {
            var action = {
                type: 'search_cocktails',
                cocktails: data
            };
            AppDispatcher.dispatch(action);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {

        }
    });
}

module.exports = {
    searchCocktails: searchCocktails
};

