var Hapi = require('hapi');
var mysql = require('mysql');
var internals = {};

internals.get = function (request, reply) {

  var db_config =
  {
    host     : '50.87.150.200',
    port     :  3306,
    user     : 'mfpla359',
    password : 'rupetch87',
    database : 'mfpla359_unilever',
    debug    :  false,
    insecureAuth: true
  };
    
    var connection;

    function handleDisconnect() {
      connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                      // the old one cannot be reused.

      connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }else{
          
          connection.query("SELECT * FROM wp2_posts",function(err,rows){ // Query
                if(!err) {
                    console.log(rows);
                    //callback(rows);
                }           
            })
        }                                     // to avoid a hot loop, and to allow our node script to
      });                                     // process asynchronous requests in the meantime.
                                              // If you're also serving http, display a 503 error.
      connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
      });
    }

    handleDisconnect();

    reply('Success!\n');
};

var server = new Hapi.Server(~~process.env.PORT || 8000, '0.0.0.0',  { cors: true });

server.route([
	{ method: 'GET', path: '/', config: { handler: internals.get } }
]);

server.start(function () {
    console.log('Server started at [' + server.info.uri + ']');
});