var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/:hostName/:serviceName', function(req, res) {
  var query ='select perfdata, output from icinga_hosts join icinga_services on icinga_hosts.host_object_id = icinga_services.host_object_id join icinga_servicestatus on icinga_services.service_object_id = icinga_servicestatus.service_object_id where icinga_hosts.display_name = ? and icinga_services.display_name = ?';
  var connection = mysql.createConnection({
      host:     "10.134.15.42",
      user:     "root",
      password: "isen",
      database: "icinga2idomysql"
  });
  connection.connect();
  connection.query(query, [req.param('hostName'), req.param('serviceName')], function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      if(req.param('serviceName') == 'Windows-updates') {
        res.json(rows[0].output);
      } else if(req.param('serviceName') == 'CPU-load') {
        parseLoad(rows[0].perfdata, function(data) {
          res.json(data);
        });
      } else if(req.param('serviceName') == 'Hard-disk') {
        parseDisk(rows[0].perfdata, function(data) {
          res.json(data);
        });
      } else if(req.param('serviceName') == 'RAM') {
        parseRam(rows[0].perfdata, function(data) {
          res.json(data);
        });
      }
    }
  });
});
module.exports = router;

function parseLoad(str, callback) {
  var data = {};
  var splited = str.split(" ");
  splited.forEach(function (item) {
    var title = item.match("(.*)=")[1];
    var value = item.match("=(.*)%")[1];
    data[title] = value;
  });
  callback(data);
};

function parseDisk(str, callback) {
  var data = {};
  var splited = str.split(" ");
  splited.splice(2, 1);
  splited.splice(4, 1);
  splited[1] = splited[1].match("=(.*)%")[1];
  splited[3] = splited[3].match("=(.*)%")[1];
  data[splited[0]] = splited[1];
  data[splited[2]] = splited[3];
  callback(data);
}

function parseRam(str, callback) {
  var data = {};
  var value = str.match("=(.*?)%")[1];
  data["RAM"] = value;
  callback(data);
}
