var cocktails = [
    {id: 1, cocktailName: "Old Fashion", text: "Ymmmy Whiskey Drink"},
    {id: 2, cocktailName: "White Russian", text: "Bad Vodka Drink"},
    {id: 3, cocktailName: "Mojito", text: "Rum Mint Drink"},
    {id: 4, cocktailName: "Margarita", text: "Tequila Drink"}
];

var CocktailAdd = React.createClass({
    render: function() {
        return (
            <div>This is where creating a new cocktail will go.</div>
        )
    }
});

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
        $.ajax('/api/cocktails').done(function(data) {
            console.log(data);
            this.setState({
                cocktailData: jQuery.parseJSON(data)
            });
        }.bind(this));
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
                {cocktailNodes}
                <button onClick={this.testAddCocktail}>Add Another Cocktail</button>
            </div>
        )
    },
    testAddCocktail: function() {
        var nextId = this.state.cocktailData.length + 1;

        this.addCocktail({id: nextId, cocktailName: "Manhattan", text: "This is a long description"});
    },
    addCocktail: function(cock) {
        console.log("adding Cocktail");
        var cocks = this.state.cocktailData;
        cocks.push(cock);
        this.setState({cocktailData: cocks});
    }

});

var CocktailBox = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Cocktail List</h1>
                <CocktailList cocktailData={cocktails} />
                <CocktailAdd />
            </div>
        );
    }
});




ReactDOM.render(
    <CocktailBox />,
    document.getElementById('main')
);