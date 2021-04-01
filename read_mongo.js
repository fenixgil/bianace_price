
var MongoClient = require('mongodb').MongoClient
var moment = require('moment');


let url = "mongodb://localhost:27017/";
const client = new MongoClient(url, {useUnifiedTopology: true});

client.connect().then((client)=>{
    var db = client.db('cripto')
	
  	var ini=moment('2017-09-16', "YYYY-MM-DD HH:mm:ss").format();
    var start = new Date(ini);
	
	
	var fin=moment('2017-09-18 23:59:00', "YYYY-MM-DD HH:mm:ss").format();
    var end = new Date(fin);
	
	/////// indexar
	//ensureIndex({"fecha" : 1});

    var query ={"Date": {"$gte": start, "$lt": end}};
  
  //var query ={"Open": {"$gte":"4260", "$lt": "4265.9"}};
  //var query ={"Date": {"$gte": new Date("2017-08-01T00:00:00.000Z"),"$lt": new Date("2017-08-20T00:00:00.000Z")}};
  
  //BTCUSDT12h
  var col='BTCUSDT12h'
  
    db.collection(col).find(query).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
    })
});
