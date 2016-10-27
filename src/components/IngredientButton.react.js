var React = require('react');

var IngredientButton = React.createClass({
    render: function() {
        return (
            <button type="button" className="btn btn-default btn-lg margin-left-10"
                    onClick={this.props.handleClick}
            >
                <span className="glyphicon glyphicon-star" aria-hidden="true"></span> {this.props.label}
            </button>
        );
    }
});

module.exports = IngredientButton;