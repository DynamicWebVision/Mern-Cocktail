var React = require('react');

var Button = React.createClass({
    render: function() {
        return (
            <button type="button" className="btn btn-primary margin-top block"
                    onClick={this.props.handleClick}
            >
                {this.props.label}
            </button>
        );
    }
});

module.exports = Button;