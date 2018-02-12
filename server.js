var express = require('express'),
	app = express(),
	child;
const port = process.env.PORT || 8080;

app.use(express.static('dist'))
// If all goes well when you open the browser, load the index.html file
app.get('/', function (req, res) {
	res.sendFile(__dirname + 'index.html');
});
 
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Aop listening at http://%s:%s', host, port);
});
