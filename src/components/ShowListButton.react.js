var React = require('react');

var Button = React.createClass({
    render: function() {
        return (
            <button type="button" className="btn btn-default btn-xs margin-left-10"
                    onClick={this.props.handleClick}
            >
                <i className="fa fa-times" aria-hidden="true"></i> {this.props.label}
            </button>
        );
    }
});

module.exports = Button;