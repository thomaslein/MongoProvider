var MongoClient = require('mongodb').MongoClient;
var _db;

MongoProvider = function(config, callback){
  if(config.username && config.password){
    MongoClient.connect('mongodb://' + config.username + ':' + config.password + '@' + config.host + ':' + config.port + '/' + config.db, function(error, db) {
      if(error){
        throw error;
        callback(error, false);
      }else{
         _db = db;
         callback(null, true);
      }
    });
  }else{
    MongoClient.connect('mongodb://' + config.host + ':' + config.port + '/' + config.db, function(error, db) {
      if(error){
        throw error;
        callback(error, false);
      }else{
         _db = db;
         callback(null, true);
      }
    });
  }
};

MongoProvider.prototype.terminate = function(force, callback){
  var force = force || false;
  _db.close(force, function(error, disconnected){
    if(error){
      callback(error, false);
    }else{
      callback(null, true);
    }
  });
}


MongoProvider.prototype.open = function(callback){
  var force = force || false;
  _db.open(function(error, connected){
    if(error){
      callback(error, false);
    }else{
      callback(null, true);
    }
  });
}
 
MongoProvider.prototype.getCollection = function(collection_name, callback) {
  var collection = _db.collection(collection_name);
  callback(collection);
};

MongoProvider.prototype.setIndex = function(collection_name, index, callback){
  this.getCollection(collection_name, function(collection){
    collection.ensureIndex(index, function(error, index){
      if(error){
        callback(error)
      }else{
        callback(null, index);
      }
    });
  });
};

MongoProvider.prototype.findAll = function(collection_name, callback){
  this.getCollection(collection_name, function(collection){
    collection.find().each(function(error, docs) {
      if(error){
        callback(error);
      }else{
        if(docs != null){
          callback(null, docs);
        }
      } 
    });
  });
};

MongoProvider.prototype.findById = function(collection_name, id, callback) {
  this.getCollection(collection_name, function(collection) {
    collection.findOne({_id:id}, function(error, result) {
      if(error){
        callback(error);
      }else{ 
        callback(null, result);
      }
    });
  });
};

MongoProvider.prototype.save = function(collection_name, data, callback){
  this.getCollection(collection_name, function(collection){
    data.timestamp = new Date();
    collection.save(data, function(error, num){
      if(error){
        callback(error)
      }else{
        callback(null, num)
      } 
    });
  });
};

MongoProvider.prototype.update = function(collection_name, query, data, callback, upsert, multi) {
  var upsert = upsert || false;
  var multi = multi || false;
  this.getCollection(collection_name, function(collection) {
    collection.update(query, data, {upsert:upsert, multi:multi}, function(error, result) {
      if(error){
        callback(error);
      }else{
        callback(null, result);
      } 
    });
  });
};

MongoProvider.prototype.delete = function(collection_name, query, callback) {
  this.getCollection(collection_name, function(collection) {
    collection.remove(query, function(error, result){
      if(error){
        callback(error);
      }else{ 
        callback(null, result);
      }
    });
  });
};

exports.MongoProvider = MongoProvider;
