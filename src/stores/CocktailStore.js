/**
 * Created by Brian on 9/28/2016.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var searchResultCocktails = [];

function setSearchResultCocktails(cocktails) {
    searchResultCocktails = cocktails;
    console.log(cocktails);
}

function emitChange() {
    CocktailStore.emit('change');
} 

var CocktailStore = assign({}, EventEmitter.prototype, {
   addChangeListener: function(callback) {
       this.on('change', callback);
   },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    getSearchResultCocktails: function() {
      return searchResultCocktails;
    }
});

function handleAction(action) {
    if (action.type === 'search_cocktails') {
        setSearchResultCocktails(action.cocktails);
        emitChange();
    }
}

CocktailStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = CocktailStore;