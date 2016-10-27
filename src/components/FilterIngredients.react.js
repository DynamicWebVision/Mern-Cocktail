/**
 * Created by Brian on 9/25/2016.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var IngredientButton = require('./IngredientButton.react');
var Button = require('./Button.react');
var CocktailSearchResult = require('./CocktailSearchResult.react');

var IngredientStore = require('../stores/IngredientStore');
var CocktailStore = require('../stores/CocktailStore');

var IngredientActionCreators = require('../actions/IngredientActionCreators');
var CocktailActionCreators = require('../actions/CocktailActionCreators');
var ShowListButton = require('./ShowListButton.react');
var IngredientsSelected = require('./IngredientsSelectedLabel.react');

var FilterIngredientList = React.createClass({
    getInitialState: function() {
        return {
            unselectedFilterIngredients: IngredientStore.getFilteredUnselectedIngredients(),
            selectedIngredients: IngredientStore.getSelectedIngredients(),
            filteredIngredients: [],
            cocktailSearchIngredients: [],
            cocktailSearchResults: []
        }
    },

    componentDidMount: function() {
        IngredientStore.addChangeListener(this.onDataChange);
        CocktailStore.addChangeListener(this.onDataChange);
    },
    componentWillUnMount: function() {
        IngredientStore.removeChangeListener(this.onDataChange);
        CocktailStore.removeChangeListener(this.onDataChange);
    },
    onDataChange: function() {
        this.setState({
            unselectedFilterIngredients: IngredientStore.getFilteredUnselectedIngredients(),
            selectedIngredients: IngredientStore.getSelectedIngredients(),
            cocktailSearchResults: CocktailStore.getSearchResultCocktails()
        });
    },
    componentWillMount: function() {

    },
    filterData: function(event) {
        event.preventDefault();
        IngredientActionCreators.filterSearchStringChange(event.target.value);
    },
    addIngredientToSelected: function(label) {
        IngredientActionCreators.addIngredientToSelected(label);
    },
    unselectIngredient: function(label) {
        IngredientActionCreators.unselectIngredient(label);
    },

    searchCocktails: function() {
        CocktailActionCreators.searchCocktails(this.state.selectedIngredients);
    },

    render: function() {
        var addIngredientToSelected = this.addIngredientToSelected;
        var unselectIngredient = this.unselectIngredient;
        var ingredientButtons = this.state.unselectedFilterIngredients.map(function(ingredient) {
            return (
                <IngredientButton label={ingredient.ingredient} handleClick={() => addIngredientToSelected(ingredient)}></IngredientButton>
            );
        });

        //Cocktail Search Results
        var cocktailResults = this.state.cocktailSearchResults.map(function(cocktail) {
            return (
                <CocktailSearchResult name={cocktail.cocktail_name} id={cocktail._id} has_image={cocktail.has_image} ingredients={cocktail.ingredients}></CocktailSearchResult>
            );
        });

        var filteredIngredients = this.state.selectedIngredients.map(function(ingredient) {
            return (
                <ShowListButton label={ingredient.ingredient} handleClick={() => unselectIngredient(ingredient)} ></ShowListButton>
            );
        });

        return(
            <div className="Table container">
                <input
                    type="text"
                    className="form-control"
                    onChange={ this.filterData }
                    placeholder="Search" />
                { ingredientButtons }
                <div className="selected-ingredient-contain">
                    <IngredientsSelected selectedIngredients={this.state.selectedIngredients} />
                    {filteredIngredients}
                </div>
                <Button label="Search" handleClick={this.searchCocktails}></Button>
                <section>
                    <div className="container">
                        <div className="row">
                            {cocktailResults}
                        </div>
                    </div>
                </section>
            </div>);
    }
    });

module.exports = FilterIngredientList;