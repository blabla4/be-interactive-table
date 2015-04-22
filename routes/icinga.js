var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/:hostName/:serviceName', function(req, res) {
  var query ='select perfdata, output from icinga_hosts join icinga_services on icinga_hosts.host_object_id = icinga_services.host_object_id join icinga_servicestatus on icinga_services.service_object_id = icinga_servicestatus.service_object_id where icinga_hosts.display_name = ? and icinga_services.display_name = ?';
  var connection = mysql.createConnection({
      host:     /*"10.134.15.31"*/"192.168.17.135",
      user:     "root",
      password: "isen",
      database: "icinga2idomysql"
  });
  connection.connect();
  connection.query(query, [req.param('hostName'), req.param('serviceName')], function(err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      console.log(rows[0].perfdata);
      var data = {};
      var str = rows[0].perfdata;
      var splited = str.split(" ");
      splited.forEach(function(item) {
        data[item.match("(.*)=")[1]] = item.match("=(.*);")[1].split(";")[0];
      });
      res.json(data);
    }
  });
});
module.exports = router;
