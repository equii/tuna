/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */
exports.errors = function (errors) {
    if(errors.errors){ // if there is an array of errors, then make them into 1 string to show to the user
        var keys = Object.keys(errors.errors)
        var errs = '';

        // if there is no validation error, just display a generic error
        if (!keys) {
            return 'An unknown error occurred and we are looking into it. In any case, please try again';
        }

        keys.forEach(function (key) {
            errs += errors.errors[key].message + ". ";
        })

        return errs;
    }
    else{   // if this is just a simple error, just show the user the message directly
        return errors.message;
    }
}