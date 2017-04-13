/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    https = require('https'),
    routes = require('./routes'),
    path = require('path'),
    mock = require('mock-json-api'),
    io = require('socket.io'),
    fs = require('fs'),
    bodyParser = require('body-parser');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);// jshint ignore:line
app.set('sslport', process.env.PORT || 3443);// jshint ignore:line
app.set('views', path.join(__dirname, 'src/views'));// jshint ignore:line
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));// jshint ignore:line
app.use(express.static(path.join(__dirname, 'public')));// jshint ignore:line

// live reload
app.use(require('connect-livereload')({
    port: 35729,
    excludeList: ['.woff', '.flv']
}));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//mock json api
var apiMocks = require('./src/apimocks/mockRoutes.js');

var mockapi = mock({
    jsonStore: __dirname + '/mock-json-api/store.json',
    mockRoutes: apiMocks.mockRoutes
});

app.use(mockapi.registerRoutes);

var bodyStringParser = bodyParser.text({type: '*/*'});

// custom routes
app.get('/', routes.index);
app.get('/ImageViewerLoader.html', routes.imageviewerloader);
app.get('/LeadToolsViewer/ImageViewer.html', routes.imageviewer);
app.get('/Help', routes.help);
app.post('/Content/Download?*',  routes.download);
app.get('/Content/Download?*',  routes.download);
app.get('/ImageViewer/GetFrameImage*', routes.getFrameImage);
app.get('/ImageViewer/PageAsSandboxedHtml*', routes.pageAsSandboxedHtml);
app.post('/api/dashboard/taskcount', bodyStringParser, routes.dashboard);
app.post('/api/tasks/batch/find/', bodyStringParser, routes.dashboardTasksList);
app.get('/api/slas', bodyStringParser, routes.dashboardSlas);
app.post('/api/slas', bodyStringParser, routes.dashboardSlas);
app.post('/api/batch', bodyStringParser, routes.batch);
app.post('/api/tasks/find*', bodyStringParser, routes.findTask);
app.post('/api/handshake/issue', bodyStringParser, routes.handshake);
app.post('/api/uploads', bodyStringParser, routes.uploads);
app.get('/api/images/streammedia/*', routes.stream);

// node internal only
app.post('/node/setconfig', routes.nodeConfig);
app.get('/node/setconfig', routes.nodeConfig);


//SSL Certificate
var privateKey = fs.readFileSync('certs/privatekey.pem').toString();
var certificate = fs.readFileSync('certs/certificate.pem').toString();
var sslOptions = {key: privateKey, cert: certificate};

///HTTP Server
var server = http.createServer(app);

///HTTPS Server
var secureServer = https.createServer(sslOptions, app);

//Listen via http
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

//Listen via https
secureServer.listen(app.get('sslport'), function(){
    console.log('Express server listening on secure port ' + app.get('sslport'));
});

//Sock.io - Real-time Annotations
var socketServer = io.listen(server);
var secureSocketServer = io.listen(secureServer);

function sendAnnotationXml(annotationXml) {
    socketServer.sockets.emit('onAnnotationsUpdated', annotationXml);
    secureSocketServer.sockets.emit('onAnnotationsUpdated', annotationXml);
}

function notifyDocumentModified(fileName) {
    socketServer.sockets.emit('onDocumentModified', fileName);
    secureSocketServer.sockets.emit('onDocumentModified', fileName);
}

//http connection
socketServer.sockets.on('connection', function(socket){
    socket.on('updateAnnotations', function(annotationXml){
        console.log(annotationXml);
        sendAnnotationXml(annotationXml);
    });
});

//https connection
secureSocketServer.sockets.on('connection', function(socket){
    socket.on('updateAnnotations', function(annotationXml){
        console.log(annotationXml);
        sendAnnotationXml(annotationXml);
    });
});

//File system watcher...
//var webDavDirectory = 'C:\\Users\\Jeff\\Documents\\IT Hit\\WebDAV Server Engine\\v3.9.2075\\Samples\\NtfsStorage\\App_Data\\WebDav\\Storage\\Batch_1';
//
//fs.watch(webDavDirectory, function(event, targetFile){
//    if (targetFile != null) {
//        console.log('Found Target File!');
//        var fileName = targetFile.toString();
//        notifyDocumentModified(fileName);
//    }
//});