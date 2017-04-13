var mocks = {
    download: require('../lib/mocks/download'),
    stream: require('../lib/mocks/stream'),
    imageViewer: require('../lib/mocks/imageViewer'),
    batch: require('../lib/mocks/batch'),
    task: require('../lib/mocks/task'),
    irConnect: require('../lib/mocks/irConnect'),
    dashboard: require('../src/apimocks/mocks/Dashboard'),
    dashboardTaskList: require('../src/apimocks/mocks/DashboardTasks'),
    dashboardSlas: require('../src/apimocks/mocks/DashboardSlas'),
    nodeInt: require('../lib/mocks/nodeInt')
};

// custom server routes

exports.index = function(req, res){
    res.render('index', { title: 'Vertafore ImageRight' });
};

exports.imageviewerloader = function(req, res){
    res.render('imageviewerloader');
};

exports.imageviewer = function(req, res){
    res.render('imageviewer');
};

exports.pageAsSandboxedHtml = function(req, res) {
    var iframeContent = "<h2>Hello Vertafore<\h2>";
    res.render('PageAsSandboxedHtml', { pageSrc: '"' + iframeContent + '"'});
};

exports.help = function(req, res){
    res.redirect('/help/index.htm');
};

exports.download = function(req, res){
    mocks.download.content(req, res);
};

exports.stream = function(req, res) {
    mocks.stream.content(req, res);
};

exports.getFrameImage = function(req, res){
    mocks.imageViewer.getFrameImage(req, res);
};

exports.batch = function(req, res){
    mocks.batch.getBatch(req, res);
};

exports.findTask = function(req, res){
    mocks.task.find(req, res);
};

exports.handshake = function(req, res){
    mocks.irConnect.handshake(req, res);
};

exports.uploads = function(req, res){
    mocks.irConnect.uploads(req, res);
};

// Node internal
exports.nodeConfig = function(req, res){
    mocks.nodeInt.setConfig(req, res);
};

exports.dashboard = function (req, res) {
    mocks.dashboard.getTaskCount(req, res);
};

exports.dashboardTasksList = function (req, res) {
    mocks.dashboardTaskList.getTasksForDashboardTasksList(req, res);
};

exports.dashboardSlas = function (req, res) {
    mocks.dashboardSlas.slasForDashboard(req, res);
};