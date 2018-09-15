require('./bootstrap');
require('./selectize.min');

$.get( "/api/users/all", function( data ) {
	$('#usersInput').selectize({
	    persist: false,
	    maxItems: null,
	    valueField: 'email',
	    labelField: 'name',
	    searchField: ['name', 'email'],
	    options: data,
	    render: {
	        item: function(item, escape) {
	            return '<div>' +
	                (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
	            '</div>';
	        }
	    },
	    createFilter: function(input) {
	        var match, regex;

	        // email@address.com
	        regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
	        match = input.match(regex);
	        if (match) return !this.options.hasOwnProperty(match[0]);

	        // name <email@address.com>
	        regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
	        match = input.match(regex);
	        if (match) return !this.options.hasOwnProperty(match[2]);

	        return false;
	    },
	    create: function(input) {
	        if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
	            return {email: input};
	        }
	        var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
	        if (match) {
	            return {
	                email : match[2],
	                name  : $.trim(match[1])
	            };
	        }
	        alert('Invalid email address.');
	        return false;
	    }
	});
});

var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
                  '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

