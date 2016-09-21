(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var cocktails = [{ id: 1, cocktailName: "Old Fashion", text: "Ymmmy Whiskey Drink" }, { id: 2, cocktailName: "White Russian", text: "Bad Vodka Drink" }, { id: 3, cocktailName: "Mojito", text: "Rum Mint Drink" }, { id: 4, cocktailName: "Margarita", text: "Tequila Drink" }];

var CocktailAdd = React.createClass({
    displayName: "CocktailAdd",

    render: function () {
        return React.createElement(
            "div",
            null,
            "This is where creating a new cocktail will go."
        );
    }
});

var Cocktail = React.createClass({
    displayName: "Cocktail",

    render: function () {
        return React.createElement(
            "div",
            { className: "cocktail" },
            React.createElement(
                "h2",
                { className: "cocktailName" },
                this.props.cocktailName
            ),
            this.props.children
        );
    }
});

var CocktailList = React.createClass({
    displayName: "CocktailList",

    getInitialState: function () {
        return { cocktailData: [] };
    },
    componentDidMount: function () {
        $.ajax('/api/cocktails').done(function (data) {
            console.log(data);
            this.setState({
                cocktailData: jQuery.parseJSON(data)
            });
        }.bind(this));
    },
    render: function () {
        var cocktailNodes = this.state.cocktailData.map(function (cocktail) {
            return React.createElement(
                Cocktail,
                { cocktailName: cocktail.cocktailName, key: cocktail.id },
                cocktail.text
            );
        });
        return React.createElement(
            "div",
            null,
            cocktailNodes,
            React.createElement(
                "button",
                { onClick: this.testAddCocktail },
                "Add Another Cocktail"
            )
        );
    },
    testAddCocktail: function () {
        var nextId = this.state.cocktailData.length + 1;

        this.addCocktail({ id: nextId, cocktailName: "Fuck ME MOFO", text: "This is a long description" });
    },
    addCocktail: function (cock) {
        console.log("adding Cocktail");
        var cocks = this.state.cocktailData;
        cocks.push(cock);
        this.setState({ cocktailData: cocks });
    }

});

var CocktailBox = React.createClass({
    displayName: "CocktailBox",

    render: function () {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "Cocktail List"
            ),
            React.createElement(CocktailList, { cocktailData: cocktails }),
            React.createElement(CocktailAdd, null)
        );
    }
});

ReactDOM.render(React.createElement(CocktailBox, null), document.getElementById('main'));

},{}]},{},[1]);
