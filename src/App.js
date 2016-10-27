var React = require('react');
var ReactDOM = require('react-dom');
var IngredientsList = require('./components/IngredientsList.react');
var FilterIngredients = require('./components/FilterIngredients.react');
var IngredientActionCreators = require('./actions/IngredientActionCreators');

IngredientActionCreators.loadAllIngredients();

var cocktails = [
    {id: 1, cocktailName: "Old Fashion", text: "Ymmmy Whiskey Drink"},
    {id: 2, cocktailName: "White Russian", text: "Bad Vodka Drink"},
    {id: 3, cocktailName: "Mojito", text: "Rum Mint Drink"},
    {id: 4, cocktailName: "Margarita", text: "Tequila Drink"}
];

var Cocktail = React.createClass({
    render: function() {
        return (
            <div className="cocktail">
                <h2 className="cocktailName">
                    {this.props.cocktailName}
                </h2>
                {this.props.children}
            </div>
        );
    }
});

var CocktailList = React.createClass({
    getInitialState: function() {
        return {cocktailData: []};
    },
    componentDidMount: function() {

    },
    render: function() {
        var cocktailNodes = this.state.cocktailData.map(function(cocktail) {
            return (
                <Cocktail cocktailName={cocktail.cocktailName} key={cocktail.id}>
                    {cocktail.text}
                </Cocktail>
            );
        });
        return (
            <div>
                <FilterIngredients></FilterIngredients>
                {cocktailNodes}
            </div>
        )
    },

});

var CocktailBox = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Ingredients</h1>
                <CocktailList cocktailData={cocktails} />
            </div>
        );
    }
});




ReactDOM.render(
    <CocktailBox />,
    document.getElementById('main')
);