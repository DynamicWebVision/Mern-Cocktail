/**
 * Created by Brian on 9/23/2016.
 */
var React = require('react');
var ReactDOMServer = require('react-dom/server');


var CocktailSearchResult = React.createClass({
    render: function() {
        var csrIngredients = this.props.ingredients;

        var cocktailIngredients = csrIngredients.map(function(cocktailIngredient) {
            return (cocktailIngredient+" - ");
        });

        if (this.props.has_image) {
            var imgUrl = 'https://s3-us-west-2.amazonaws.com/thumb.dreamycocktails.com/'+this.props.id+'.jpg';
        }
        else {
            var imgUrl = 'https://s3-us-west-2.amazonaws.com/thumb.dreamycocktails.com/default.jpg';
        }

        var cocktailLink = "/cocktail/"+this.props.id;
        console.log(this.props.id);
        
        return (<a href={cocktailLink}> <div className="col-sm-6 col-md-3 cocktail-result-result">
                    <div className="thumbnail">
                        <img src={imgUrl} alt = "Generic placeholder thumbnail" />
                    </div>

                    <div className="caption">
                        <h3>{this.props.name}</h3>
                        <p className="search-cocktail-ingredients">{cocktailIngredients}</p>
                    </div>
                </div></a>);
        // var cocktailEntries = cocktails.map(function(cocktail) {
        //     return (
        //         <div>{cocktail.cocktail_name}</div>
        //     );
        // });
        // return (
        // {cocktailEntries}
        // );
    }

});

module.exports = CocktailSearchResult;