var React = require('react');

var IngredientsSelected = React.createClass({
    render: function() {
        return (
            <div>
                <label>
                    Ingredients to Filter By:
                </label>
                { this.props.selectedIngredients.length < 1 ?  <div className="italic light-grey-font">No Ingredients Selected</div> : null }
            </div>
        );
    }
});

module.exports = IngredientsSelected;