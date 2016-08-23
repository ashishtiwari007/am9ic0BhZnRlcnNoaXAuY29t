var Beanworker = require('fivebeans').worker;
var client = require('beanstalk_client').Client;



/*


 // Create a class to handle the work load
 class IndexHandler {
 constructor(){
 this.type = "j_type"; // Specify the type of job for this class to work on
 }
 // Define the work to perform and pass back a success
 work(payload, callback){
 console.log(payload);
 callback('success');
 }
 }
 // Instantiate the class
 var handler = new IndexHandler();

 */


// Set options
var options = {
    id: 'worker_1', // The ID of the worker for debugging and tacking
    host: 'challenge.aftership.net', // The host to listen on
    port: 11300, // the port to listen on
    handlers: {
        'j_type': require('./handler')()// setting handlers for types
    },
    ignoreDefault: true
};

var worker = new Beanworker(options); // Instantiate a worker

worker.start(['work_tube']);


/*

 client.connect('challenge.aftership.net:11300', function(err, conn) {
 var reserve = function() {
 conn.use('work_tube', function(err, tubename) {
 console.log('got job: ' + tubename);
 //console.log('got job data: ' + job_id);
 workdata(conn);
 console.log('module name is ' + JSON.parse(json).data.name);
 conn.destroy(tubename, function(err) {
 console.log('destroyed job');
 //reserve();
 });
 });
 }

 reserve();
 });




 var workdata = function(conn) {
 conn.reserve(function (err, id) {
 if (err) {
 console.log('Error reserving job.');
 } else {
 console.log('Consumed Job ' + id);
 console.log('Job Data: ' + json);
 console.log('Name: ' + JSON.parse().data.name);

 }
 });
 };


 */
