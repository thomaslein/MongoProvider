var mongo_provider = require('../lib/mongoprovider').MongoProvider,
should = require('should'),
server_config = {
  host:'localhost',
  port:'27017',
  db:'testdb'
}

describe('MongoProvider', function(){

  describe('MongoProvider(config, connected)', function(){
    it('should connect to the database and return true if connected ', function(done){
      mongo_provider = new MongoProvider(server_config , function(error, connected){
        if(error) return done(error);
         connected.should.be.true;
         done();
      })
    })
  })
  describe('MongoProvider.prototype.getCollection(collection_name, callback)', function(){
    it('should return a collection from the database', function(done){
      mongo_provider.getCollection('test', function(collection){
        collection.should.be.type('object');
        done();
      })
    })
  })
  describe('MongoProvider.prototype.setIndex(collection_name, index, callback)', function(){
    it('should set a index on the collection', function(done){
      mongo_provider.setIndex('test', {_id:-1}, function(error, index){
        if(error) return done(error);
        index.should.be.exactly('_id_-1');
        done();
      })
    })
  })
  describe('MongoProvider.prototype.save(collection_name, data, callback)', function(){
    it('should save a document to the collection', function(done){
      mongo_provider.save('test', {_id:'1234', test1:'test data 1', test2: 'test data 2'}, function(error, num){
        if(error) return done(error);
        num.should.be.exactly(1);
        done();
      })
    })
  })
  describe('MongoProvider.prototype.findById(collection_name, id, callback)', function(){
    it('should find a document with given id on the collection', function(done){
      mongo_provider.findById('test', '1234', function(error, doc){
        if(error) return done(error);
        doc.should.be.type('object');
        doc.should.have.ownProperty('_id');
        done();
      })
    })
  })
  describe('MongoProvider.prototype.findAll(collection_name, callback)', function(){
    it('should find all documents in the collection', function(done){
      mongo_provider.findAll('test', function(error, docs){
        if(error) return done(error);
        docs.should.be.type('object');
        docs.should.have.properties('_id', 'test1', 'test2');
        done();
      })
    })
  })
  describe('MongoProvider.prototype.update(collection_name, query, data, callback, upsert, multi)', function(){
    it('should update a document matching the query in the collection', function(done){
      mongo_provider.update('test', {_id:'1234'}, {test: 'test data'}, function(error, num){
        if(error) return done(error);
        num.should.be.exactly(1);
        done();
      }, false, false);
    })
  })
  describe('MongoProvider.prototype.delete(collection_name, query, callback)', function(){
    it('should delete a document matching the query from the collection', function(done){
      mongo_provider.delete('test', {_id:'1234'}, function(error, num){
        if(error) return done(error);
        num.should.be.exactly(1);
        done();
      });
    })
  })
  describe('MongoProvider.prototype.terminate(force, callback)', function(){
    it('should close the database', function(done){
      mongo_provider.terminate(false, function(error, disconnected){
        if(error) return done(error);
        disconnected.should.be.ok;
        done();
      });
    })
  })
    describe('MongoProvider.prototype.open(callback)', function(){
    it('should open the database', function(done){
      mongo_provider.open(function(error, connected){
        if(error) return done(error);
        connected.should.be.ok;
        done();
      });
    })
  })

})
