
/*!
 * cwValidate jquery library
 * Version: 0.0.1
 * Author: @clivewalkden
 * Licensed under the MIT license
 */


;(function ( $, window, document, undefined ) {

    $.fn.cwValidate = function ( options ) {

        options = $.extend( {}, $.fn.cwValidate.options, options );

        return this.each(function () {

            var elem = $(this);

			var inputs = elem.find('input,select,textarea');

			// Loop through each item and process the result
			inputs.each(function(){

				var errors;
				var input = $(this);

				input.on('blur',function(event){
					input.next('span.error_msg').remove();
					validate(input,event);
				});
			});

        });

		function validate(input,event) {
			var errors = [];
			var type = input.data('type');

			// Check required fields are not empty
			if (input.prop('required') && !input.val()) {
				errors[errors.length] = options.codes.required;
				display_error(input,errors);
				return false;
			}

			// Check the value meets the minimum length
			if (input.val().length < input.data('min')) {
				errors[errors.length] = options.codes.min+input.data('min')+options.codes.min2;
			}

			// Check the value meets the minimum length
			if (input.val().length > input.data('max')) {
				errors[errors.length] = options.codes.max+input.data('max')+options.codes.max2;
			}

			// Check email fields
			if (input.prop('type') == 'email' || type=='email') {
				var regexp = new RegExp("[a-zA-Z0-9+%-._]+@[a-zA-Z0-9.\\-_]+\\.[a-zA-Z]{2,4}","g");
				if (!regexp.exec(input.val())) {
					errors[errors.length] = options.codes.email;
				}
			}

			if (errors && errors.length > 0) {
				display_error(input,errors);
				return false;
			}else{
				return true;
			}
		}

		function display_error(input,errors) {
			input.addClass('error').after('<span class="button-tooltip floatright error_msg" title="'+errors.join("\n")+'">i</span>');
		}
    };

    $.fn.cwValidate.options = {

        codes: {
			password: 'Please enter a valid password',
			retypepassword: 'Passwords do not match',
			retypepassword2: 'Invalid password',
			firstname: 'Please provide a first name',
			lastname: 'Please provide a last name',
			postalcode: 'Please enter a valid postal code',
			userid: 'Sorry that user ID is not available',
			userid2: 'Sorry that user ID is too short',
			gender: 'Please select a gender',
			country: 'Please select a country',

			email		: 'Please enter a valid email address',
			required	: 'This field is a required field',
			min			: 'must be greater than ',
			min2		: ' characters',
			max			: 'must be a maximum of ',
			max2		: ' characters'
		},

        myMethod: function ( elem, param ) {
        }
    };

})( jQuery, window, document );