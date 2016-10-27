/**
 * Created by Brian on 10/4/2016.
 */

function removeFromArray (array, item) {
    var returnArray = array;
    var index = returnArray.indexOf(item);
    returnArray.splice(index, 1);
    return returnArray;
}

module.exports = {
    removeFromArray: removeFromArray
}