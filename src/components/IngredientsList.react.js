/**
 * Created by Brian on 9/23/2016.
 */
var React = require('react');
var ReactDOMServer = require('react-dom/server');


var IngredientsList = React.createClass({
    getInitialState: function() {
        return {ingredientData: []};
    },
    componentDidMount: function() {
        $.ajax('/api/ingredients').done(function(data) {
            this.setState({
                ingredientData: data
            });
        }.bind(this));
    },
    render: function() {
        var ingredientNodes = this.state.ingredientData.map(function(ingredient) {
            return (
                <div>
                    {ingredient.ingredient}
                </div>
            );
        });
        return (
            <div>
                {ingredientNodes}
            </div>
        )
    }

});

module.exports = IngredientsList;