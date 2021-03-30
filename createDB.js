
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
   
    if (err) throw err;
    var dbo = db.db("nodemongo");
  dbo.collection('Student', function (err, collection) {
    if (err) throw err;
    collection.insertMany([{ id: 1, firstName: 'Rommel', lastName: 'Galisanao' },
    { id: 2, firstName: 'LiFu', lastName: 'Chen' },
    { id: 3, firstName: 'Yong', lastName: 'Heng' },
    { id: 3, firstName: 'Jan', lastName: 'Park' }]);
    db.close();
    });
});