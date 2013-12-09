var mongo_provider = require('./lib/mongoprovider').MongoProvider,
server_config = {
  host:'localhost',
  port:'27017',
  db:'db'
}

mongo_provider = new MongoProvider(server_config , function(error, connected){
  if(error) throw error
  console.log('CONNECTED: ', connected);
}); 

