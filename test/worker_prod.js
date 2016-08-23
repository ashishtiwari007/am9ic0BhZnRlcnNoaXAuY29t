var fivebeans = require('fivebeans');
var client = new fivebeans.client('challenge.aftership.net', 11300);

var job1 = {
    type: 'j_type',
    payload: {
        from: 'USD',
        to: 'BBB'
    }
};

client
    .on('connect', function(){
        client.use('work_tube10', function(err, name){
            client.put(0,0,60, JSON.stringify(['work_tube10', job1]), function(err, jobid){
                console.log(jobid);
            })
        })
    }).on('error', function(err){
    console.log(err);
})
    .on('close', function(){
        console.log('...Closing the tube...');
    })
    .connect();