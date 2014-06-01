exports.randomEmail = function(){
    var result = '';
    result += this.randomText(this.getRandomInt(3,10));
    result += '@';
    result += this.randomText(this.getRandomInt(3,10));
    result += '.';
    result += this.randomText(this.getRandomInt(2,5));
    return result;
}

exports.randomText = function(length){
    var result = '';
    for(var i=0; i<length; i++){
        result += String.fromCharCode(Math.floor((Math.random() * 25) + 97));
    }
    return result;
}

exports.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}