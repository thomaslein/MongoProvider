var mongo_provider = require('./lib/mongoprovider').MongoProvider,
ObjectID = require('mongodb').ObjectID,
server_config = {
	host:'localhost',
	port:'27017',
	db:'pushnotdb'
}

mongo_provider = new MongoProvider(server_config , function(error, connected){
	if(error) throw error
	console.log('CONNECTED: ', connected);
	mongo_provider.terminate(true, function(error, disconnected){
		if(error) throw error;
		console.log('DISCONNECTED: ', disconnected);
	});
	setTimeout(function(){
		mongo_provider.open(function(error, connected){
			if(error) throw error;
			console.log('CONNECTED: ', connected);
		});
	}, 2000)
});

