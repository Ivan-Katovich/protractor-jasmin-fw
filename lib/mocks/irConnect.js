/**
 * Created by davissc on 3/21/2016.
 */

exports.handshake = function (req, res) {

        res.set('Cache-Control', 'no-cache');
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.set('Expires', '-1');
        res.set('Pragma', 'no-cache');

        var response = req.body;

        res.send(response);
        res.end();

};
//api/uploads

exports.uploads = function (req, res) {

        res.set('Cache-Control', 'no-cache');
        res.set('Content-Type', 'text/plain; charset=utf-8');
        res.set('Expires', '-1');
        res.set('Pragma', 'no-cache');

        var response = '780f0063-9681-449e-96c3-4103fec9884b';

        res.send(response);
        res.end();

};